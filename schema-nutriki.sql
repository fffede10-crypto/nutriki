CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS usuarios_nutriki (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  nombre TEXT NOT NULL,
  nombre_hijo TEXT,
  edad_hijo INTEGER,
  edad_hijo_2 INTEGER,
  restricciones_alimentarias JSONB DEFAULT '[]',
  preferencias JSONB DEFAULT '[]',
  vio_bienvenida BOOLEAN DEFAULT FALSE,
  acceso_activo BOOLEAN DEFAULT FALSE,
  shopify_order_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- sin password_hash — auth la maneja Supabase Auth nativo.
-- El id de esta tabla debe coincidir con auth.users.id de Supabase.

CREATE TABLE IF NOT EXISTS recetas_nutriki (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  categoria TEXT CHECK (categoria IN ('desayuno','almuerzo','cena','merienda','postre','jugo')),
  tiempo_preparacion INTEGER,
  porciones INTEGER,
  nivel_dificultad TEXT CHECK (nivel_dificultad IN ('facil','medio','avanzado')),
  edad_minima INTEGER DEFAULT 1,
  lista_en_minutos INTEGER,
  apta_vianda BOOLEAN DEFAULT FALSE,
  sin_gluten BOOLEAN DEFAULT FALSE,
  sin_lacteos BOOLEAN DEFAULT FALSE,
  sin_huevo BOOLEAN DEFAULT FALSE,
  sin_frutos_secos BOOLEAN DEFAULT TRUE,
  vegetariana BOOLEAN DEFAULT FALSE,
  vegana BOOLEAN DEFAULT FALSE,
  indice_popularidad INTEGER DEFAULT 3,
  ingredientes JSONB DEFAULT '[]',
  pasos JSONB DEFAULT '[]',
  tip_nutricional TEXT,
  tip_para_mama TEXT,
  imagen_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS favoritos_nutriki (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios_nutriki(id) ON DELETE CASCADE,
  receta_id INTEGER REFERENCES recetas_nutriki(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(usuario_id, receta_id)
);

CREATE TABLE IF NOT EXISTS cocinadas_nutriki (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios_nutriki(id) ON DELETE CASCADE,
  receta_id INTEGER REFERENCES recetas_nutriki(id) ON DELETE CASCADE,
  cocinada_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lista_compras_nutriki (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios_nutriki(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  cantidad TEXT,
  unidad TEXT,
  receta_id INTEGER REFERENCES recetas_nutriki(id) ON DELETE SET NULL,
  receta_nombre TEXT,
  tildado BOOLEAN DEFAULT FALSE,
  agregado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS planes_semanales_nutriki (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios_nutriki(id) ON DELETE CASCADE,
  semana_inicio DATE NOT NULL,
  plan JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE usuarios_nutriki ENABLE ROW LEVEL SECURITY;
ALTER TABLE favoritos_nutriki ENABLE ROW LEVEL SECURITY;
ALTER TABLE cocinadas_nutriki ENABLE ROW LEVEL SECURITY;
ALTER TABLE lista_compras_nutriki ENABLE ROW LEVEL SECURITY;
ALTER TABLE planes_semanales_nutriki ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_usuarios" ON usuarios_nutriki FOR ALL USING (true);
CREATE POLICY "allow_all_favoritos" ON favoritos_nutriki FOR ALL USING (true);
CREATE POLICY "allow_all_cocinadas" ON cocinadas_nutriki FOR ALL USING (true);
CREATE POLICY "allow_all_lista" ON lista_compras_nutriki FOR ALL USING (true);
CREATE POLICY "allow_all_planes" ON planes_semanales_nutriki FOR ALL USING (true);
