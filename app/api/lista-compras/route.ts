import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function GET(request: NextRequest) {
  const supabase = getClient()
  const { searchParams } = new URL(request.url)
  const usuarioId = searchParams.get('usuario_id')
  if (!usuarioId) return NextResponse.json({ error: 'usuario_id requerido' }, { status: 400 })

  const { data, error } = await supabase
    .from('lista_compras_nutriki')
    .select('*')
    .eq('usuario_id', usuarioId)
    .order('receta_nombre')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const supabase = getClient()
  const body = await request.json()
  const { usuario_id, items } = body
  if (!usuario_id || !items) return NextResponse.json({ error: 'Datos requeridos' }, { status: 400 })

  const { data, error } = await supabase
    .from('lista_compras_nutriki')
    .insert(items.map((i: Record<string, unknown>) => ({ ...i, usuario_id })))
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function PATCH(request: NextRequest) {
  const supabase = getClient()
  const body = await request.json()
  const { id, tildado } = body
  if (!id) return NextResponse.json({ error: 'id requerido' }, { status: 400 })

  const { data, error } = await supabase
    .from('lista_compras_nutriki')
    .update({ tildado })
    .eq('id', id)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function DELETE(request: NextRequest) {
  const supabase = getClient()
  const { searchParams } = new URL(request.url)
  const usuarioId = searchParams.get('usuario_id')
  const id = searchParams.get('id')

  let query = supabase.from('lista_compras_nutriki').delete()
  if (id) query = query.eq('id', id)
  else if (usuarioId) query = query.eq('usuario_id', usuarioId).eq('tildado', true)
  else return NextResponse.json({ error: 'id o usuario_id requerido' }, { status: 400 })

  const { error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
