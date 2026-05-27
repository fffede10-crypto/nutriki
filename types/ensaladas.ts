export interface IngredienteEnsalada {
  nombre: string
  cantidad: string
  unidad: string
}

export interface RecetaEnsalada {
  id: number
  nombre: string
  descripcion?: string
  categoria: 'express' | 'plato_completo' | 'juntada' | 'sin_lechuga' | 'frutal'
  ocasion: string[]
  tiempo_preparacion?: number
  porciones?: number
  nivel_dificultad?: 'facil' | 'medio' | 'avanzado'
  apta_vianda?: boolean
  sin_gluten?: boolean
  sin_lacteos?: boolean
  vegetariana?: boolean
  vegana?: boolean
  ingrediente_principal?: string
  aderezo_recomendado_id?: number
  ingredientes: IngredienteEnsalada[]
  pasos: string[]
  tip_chef?: string
  conservacion?: string
  imagen_url?: string
  created_at?: string
}

export interface AderezoEnsalada {
  id: number
  nombre: string
  descripcion?: string
  tiempo_preparacion?: number
  rinde?: string
  ingredientes: IngredienteEnsalada[]
  pasos: string[]
  tip_chef?: string
  ensaladas_que_combina: number[]
  imagen_url?: string
  created_at?: string
}

export interface FavoritoEnsalada {
  id: string
  usuario_id: string
  receta_id: number
  created_at: string
}

export interface UsuarioProducto {
  id: string
  usuario_id: string
  producto: string
  activo: boolean
  fecha_compra: string
  shopify_order_id?: string
}

export type CategoriaEnsalada = 'express' | 'plato_completo' | 'juntada' | 'sin_lechuga' | 'frutal'
