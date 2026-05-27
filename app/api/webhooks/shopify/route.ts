import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

const PRODUCTOS_SHOPIFY: Record<string, string> = {
  '53159708557591': 'tiroides_activa',
  'PRODUCT_ID_ENSALADAS': 'ensaladas_gourmet',
  'PRODUCT_ID_NUTRIKI': 'nutriki_completo',
}

const EMAIL_CONFIG: Record<string, { titulo: string; link: string; descripcion: string }> = {
  ensaladas_gourmet: {
    titulo: '¡Tu acceso a Ensaladas Gourmet está listo! 🥗',
    link: '/ensaladas-gourmet',
    descripcion: '50 ensaladas gourmet + 10 aderezos que te van a cambiar la cocina',
  },
  tiroides_activa: {
    titulo: '¡Tu acceso a Tiroides Activa está listo! 🌿',
    link: '/dashboard',
    descripcion: '65 recetas organizadas para tu tiroides',
  },
}

function detectarProducto(order: Record<string, unknown>): string | null {
  const lineItems = (order.line_items as Array<{ product_id?: string | number; title?: string }>) || []
  for (const item of lineItems) {
    const productId = String(item.product_id || '')
    if (PRODUCTOS_SHOPIFY[productId]) return PRODUCTOS_SHOPIFY[productId]
    const titulo = (item.title || '').toLowerCase()
    if (titulo.includes('ensalada')) return 'ensaladas_gourmet'
    if (titulo.includes('tiroides')) return 'tiroides_activa'
    if (titulo.includes('completo') || titulo.includes('nutriki')) return 'nutriki_completo'
  }
  return null
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const hmac = request.headers.get('x-shopify-hmac-sha256')
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET

  if (!secret || !hmac) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const digest = crypto.createHmac('sha256', secret).update(body).digest('base64')

  if (!crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmac))) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const order = JSON.parse(body)
  const email = order?.customer?.email?.toLowerCase()?.trim()
  const orderId = String(order?.id || '')

  if (!email) {
    return NextResponse.json({ error: 'Email not found in order' }, { status: 400 })
  }

  const producto = detectarProducto(order)

  if (!producto) {
    return NextResponse.json({ received: true, email, nota: 'Producto no identificado' })
  }

  try {
    const supabase = getSupabaseAdmin()

    // Buscar o crear usuario en usuarios_nutriki
    const { data: usuarioExistente } = await supabase
      .from('usuarios_nutriki')
      .select('id')
      .eq('email', email)
      .single()

    let usuarioId: string | null = usuarioExistente?.id || null

    if (!usuarioId) {
      // Si hay un usuario en auth, lo conectamos
      const { data: authUsers } = await supabase.auth.admin.listUsers()
      const authUser = authUsers?.users?.find((u) => u.email === email)

      if (authUser) {
        const { data: nuevo } = await supabase
          .from('usuarios_nutriki')
          .insert({ id: authUser.id, email, acceso_activo: true, shopify_order_id: orderId })
          .select('id')
          .single()
        usuarioId = nuevo?.id || null
      }
    }

    if (usuarioId) {
      // Activar usuario base
      await supabase
        .from('usuarios_nutriki')
        .update({ acceso_activo: true, shopify_order_id: orderId })
        .eq('id', usuarioId)

      // Registrar acceso al producto específico
      await supabase.from('usuario_productos').upsert(
        { usuario_id: usuarioId, producto, activo: true, shopify_order_id: orderId },
        { onConflict: 'usuario_id,producto' }
      )
    }

    const config = EMAIL_CONFIG[producto]
    return NextResponse.json({
      received: true,
      email,
      producto,
      activado: !!usuarioId,
      mensaje: config?.titulo,
    })
  } catch (err) {
    console.error('[webhook/shopify]', err)
    return NextResponse.json({ received: true, email, producto, activado: false })
  }
}
