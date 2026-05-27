-- RECETAS ENSALADAS
CREATE TABLE IF NOT EXISTS recetas_ensaladas (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  categoria TEXT CHECK (categoria IN (
    'express','plato_completo','juntada','sin_lechuga','frutal'
  )),
  ocasion JSONB DEFAULT '[]',
  tiempo_preparacion INTEGER,
  porciones INTEGER,
  nivel_dificultad TEXT CHECK (nivel_dificultad IN ('facil','medio','avanzado')),
  apta_vianda BOOLEAN DEFAULT FALSE,
  sin_gluten BOOLEAN DEFAULT FALSE,
  sin_lacteos BOOLEAN DEFAULT FALSE,
  vegetariana BOOLEAN DEFAULT FALSE,
  vegana BOOLEAN DEFAULT FALSE,
  ingrediente_principal TEXT,
  aderezo_recomendado_id INTEGER,
  ingredientes JSONB DEFAULT '[]',
  pasos JSONB DEFAULT '[]',
  tip_chef TEXT,
  conservacion TEXT,
  imagen_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ADEREZOS
CREATE TABLE IF NOT EXISTS aderezos_ensaladas (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  tiempo_preparacion INTEGER,
  rinde TEXT,
  ingredientes JSONB DEFAULT '[]',
  pasos JSONB DEFAULT '[]',
  tip_chef TEXT,
  ensaladas_que_combina JSONB DEFAULT '[]',
  imagen_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAVORITOS ENSALADAS
CREATE TABLE IF NOT EXISTS favoritos_ensaladas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios_nutriki(id) ON DELETE CASCADE,
  receta_id INTEGER REFERENCES recetas_ensaladas(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(usuario_id, receta_id)
);

-- ACCESOS DE USUARIOS POR PRODUCTO
CREATE TABLE IF NOT EXISTS usuario_productos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios_nutriki(id) ON DELETE CASCADE,
  producto TEXT NOT NULL,
  activo BOOLEAN DEFAULT TRUE,
  fecha_compra TIMESTAMPTZ DEFAULT NOW(),
  shopify_order_id TEXT,
  UNIQUE(usuario_id, producto)
);

-- RLS
ALTER TABLE recetas_ensaladas ENABLE ROW LEVEL SECURITY;
ALTER TABLE aderezos_ensaladas ENABLE ROW LEVEL SECURITY;
ALTER TABLE favoritos_ensaladas ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuario_productos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_ensaladas" ON recetas_ensaladas FOR ALL USING (true);
CREATE POLICY "allow_all_aderezos" ON aderezos_ensaladas FOR ALL USING (true);
CREATE POLICY "allow_all_fav_ensaladas" ON favoritos_ensaladas FOR ALL USING (true);
CREATE POLICY "allow_all_productos" ON usuario_productos FOR ALL USING (true);
