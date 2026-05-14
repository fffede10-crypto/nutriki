export interface Usuario {
  id: string
  email: string
  nombre: string
  nombre_hijo?: string
  edad_hijo?: number
  edad_hijo_2?: number
  restricciones_alimentarias: string[]
  preferencias: string[]
  vio_bienvenida: boolean
  acceso_activo: boolean
  shopify_order_id?: string
  created_at: string
}

export interface Ingrediente {
  nombre: string
  cantidad: string
  unidad: string
}

export interface Receta {
  id: number
  nombre: string
  descripcion?: string
  categoria: 'desayuno' | 'almuerzo' | 'cena' | 'merienda' | 'postre' | 'jugo'
  tiempo_preparacion?: number
  porciones?: number
  nivel_dificultad?: 'facil' | 'medio' | 'avanzado'
  edad_minima?: number
  lista_en_minutos?: number
  apta_vianda?: boolean
  sin_gluten?: boolean
  sin_lacteos?: boolean
  sin_huevo?: boolean
  sin_frutos_secos?: boolean
  vegetariana?: boolean
  vegana?: boolean
  indice_popularidad?: number
  ingredientes: Ingrediente[]
  pasos: string[]
  tip_nutricional?: string
  tip_para_mama?: string
  imagen_url?: string
  created_at?: string
}

export interface ItemListaCompras {
  id: string
  usuario_id: string
  nombre: string
  cantidad?: string
  unidad?: string
  receta_id?: number
  receta_nombre?: string
  tildado: boolean
  agregado_en: string
}

export interface PlanSemanal {
  id: string
  usuario_id: string
  semana_inicio: string
  plan: Record<string, Record<string, number | null>>
  created_at: string
}

export type Categoria = 'desayuno' | 'almuerzo' | 'cena' | 'merienda' | 'postre' | 'jugo'
export type Restriccion = 'sin_gluten' | 'sin_lacteos' | 'sin_huevo' | 'vegetariana' | 'vegana' | 'apta_vianda'
