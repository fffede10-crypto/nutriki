import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Skeleton para fase 2 — activación automática vía Shopify webhook

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

  if (!email) {
    return NextResponse.json({ error: 'Email not found in order' }, { status: 400 })
  }

  // Fase 2: activar usuario automáticamente
  // const { error } = await supabase.from('usuarios_nutriki').update({ acceso_activo: true, shopify_order_id: order.id }).eq('email', email)
  // if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ received: true, email })
}
