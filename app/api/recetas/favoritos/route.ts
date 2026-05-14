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
    .from('favoritos_nutriki')
    .select('receta_id, recetas_nutriki(*)')
    .eq('usuario_id', usuarioId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const supabase = getClient()
  const body = await request.json()
  const { usuario_id, receta_id } = body
  if (!usuario_id || !receta_id) return NextResponse.json({ error: 'Datos requeridos' }, { status: 400 })

  const { data, error } = await supabase
    .from('favoritos_nutriki')
    .upsert({ usuario_id, receta_id })
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function DELETE(request: NextRequest) {
  const supabase = getClient()
  const { searchParams } = new URL(request.url)
  const usuarioId = searchParams.get('usuario_id')
  const recetaId = searchParams.get('receta_id')
  if (!usuarioId || !recetaId) return NextResponse.json({ error: 'Datos requeridos' }, { status: 400 })

  const { error } = await supabase
    .from('favoritos_nutriki')
    .delete()
    .eq('usuario_id', usuarioId)
    .eq('receta_id', recetaId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
