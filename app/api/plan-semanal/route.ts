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
  const semanaInicio = searchParams.get('semana_inicio')
  if (!usuarioId) return NextResponse.json({ error: 'usuario_id requerido' }, { status: 400 })

  let query = supabase.from('planes_semanales_nutriki').select('*').eq('usuario_id', usuarioId)
  if (semanaInicio) query = query.eq('semana_inicio', semanaInicio)

  const { data, error } = await query.order('semana_inicio', { ascending: false }).limit(1)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const supabase = getClient()
  const body = await request.json()
  const { usuario_id, semana_inicio, plan } = body
  if (!usuario_id || !semana_inicio) return NextResponse.json({ error: 'Datos requeridos' }, { status: 400 })

  const { data, error } = await supabase
    .from('planes_semanales_nutriki')
    .upsert({ usuario_id, semana_inicio, plan }, { onConflict: 'usuario_id,semana_inicio' })
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
