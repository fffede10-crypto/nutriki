'use client'

import { useState } from 'react'
import Link from 'next/link'
import EnsaladasGuard from '@/components/EnsaladasGuard'
import EnsaladasNav from '@/components/EnsaladasNav'

type Tab = 'conservacion' | 'estacion' | 'anti'

const BASES_VERDES = [
  { nombre: 'Lechuga romana', dias: 5, truco: 'Guardala entera, sin cortar. Envolvela en papel de cocina húmedo.' },
  { nombre: 'Rúcula', dias: 3, truco: 'Muy delicada. En bolsa con papel absorbente, alejada del frío extremo.' },
  { nombre: 'Espinaca', dias: 5, truco: 'Sin lavar hasta el momento de usar. Guardala seca.' },
  { nombre: 'Repollo', dias: 10, truco: 'El más resistente. En el cajón de la heladera sin problema.' },
  { nombre: 'Kale / col rizada', dias: 7, truco: 'Masajealo con aceite antes de guardar — se vuelve más tierno.' },
]

const PROTEINAS = [
  { nombre: 'Pollo cocido', dias: 4, truco: 'En recipiente hermético con un poco de caldo para que no se seque.' },
  { nombre: 'Atún en lata', dias: '—', truco: 'Una vez abierta, transferí a un recipiente de vidrio. Dura 2 días.' },
  { nombre: 'Legumbres cocidas', dias: 5, truco: 'Con un poco de líquido de cocción. Se pueden congelar 3 meses.' },
  { nombre: 'Huevo duro', dias: 5, truco: 'Sin pelar en la heladera. Una vez pelado, consumir en el día.' },
]

const ADEREZOS_CONSERVACION = [
  { nombre: 'Base aceite+limón', dias: 7, truco: 'En frasco de vidrio. Sacudilo bien antes de usar.' },
  { nombre: 'Con yogur o crema', dias: 4, truco: 'Siempre en frío. No congelar.' },
  { nombre: 'Con tahini', dias: 10, truco: 'El tahini actúa como conservante. En frasco hermético.' },
  { nombre: 'Con mayo', dias: 5, truco: 'Evitá la exposición al calor.' },
]

const MESES: Record<string, { verduras: string[]; frutas: string[] }> = {
  'Enero-Febrero': {
    verduras: ['Tomate', 'Pepino', 'Morrón', 'Choclo', 'Zucchini', 'Berenjena'],
    frutas: ['Sandía', 'Melón', 'Durazno', 'Ciruela', 'Higo', 'Uva'],
  },
  'Marzo-Abril': {
    verduras: ['Rúcula', 'Espinaca', 'Zanahoria', 'Remolacha', 'Apio'],
    frutas: ['Manzana', 'Pera', 'Membrillo', 'Kiwi'],
  },
  'Mayo-Junio': {
    verduras: ['Repollo', 'Brócoli', 'Coliflor', 'Puerro', 'Hinojo'],
    frutas: ['Mandarina', 'Naranja', 'Limón', 'Pomelo'],
  },
  'Julio-Agosto': {
    verduras: ['Repollo morado', 'Zanahoria', 'Remolacha', 'Acelga', 'Espinaca'],
    frutas: ['Naranja', 'Mandarina', 'Kiwi', 'Limón'],
  },
  'Septiembre-Octubre': {
    verduras: ['Rúcula', 'Lechuga', 'Espárrago', 'Arvejas', 'Chauchas'],
    frutas: ['Frutilla', 'Cereza', 'Durazno temprano'],
  },
  'Noviembre-Diciembre': {
    verduras: ['Tomate', 'Morrón', 'Choclo', 'Chaucha', 'Pepino'],
    frutas: ['Frutilla', 'Sandía temprana', 'Durazno', 'Ciruela'],
  },
}

const COMBOS = [
  { base: 'Rúcula', proteina: 'Queso de cabra', extra: 'Pera + nueces', aderezo: 'Balsámico' },
  { base: 'Espinaca', proteina: 'Pollo', extra: 'Mango + morrón', aderezo: 'Ajonjolí-jengibre' },
  { base: 'Repollo', proteina: 'Atún', extra: 'Zanahoria + cilantro', aderezo: 'Tahini-limón' },
  { base: 'Lechuga romana', proteina: 'Anchoas', extra: 'Pan tostado + parmesano', aderezo: 'César' },
  { base: 'Quinoa', proteina: 'Garbanzos', extra: 'Pepino + aceitunas', aderezo: 'Limón-comino' },
  { base: 'Tomate', proteina: 'Mozzarella', extra: 'Albahaca + palta', aderezo: 'AOVE + sal' },
  { base: 'Zanahoria rallada', proteina: 'Huevo duro', extra: 'Naranja + sésamo', aderezo: 'Miel-mostaza' },
  { base: 'Hinojo', proteina: 'Salmón ahumado', extra: 'Alcaparras + limón', aderezo: 'Yogur-eneldo' },
  { base: 'Remolacha asada', proteina: 'Queso feta', extra: 'Naranja + nueces', aderezo: 'Balsámico' },
  { base: 'Pasta fría', proteina: 'Atún en aceite', extra: 'Aceitunas + albahaca', aderezo: 'Vinagreta clásica' },
]

const TECNICAS = [
  {
    titulo: 'El corte importa',
    desc: 'Un mismo vegetal cortado diferente cambia la experiencia. El pepino en rodajas es agua; en medias lunas, crujiente. El tomate en cubos absorbe el aderezo; en gajos, mantiene el jugo.',
  },
  {
    titulo: 'La temperatura hace magia',
    desc: 'Mezclar ingredientes tibios (pollo recién hecho, papa cocida) con frescos (rúcula, tomate cherry) crea contraste. El calor marchita levemente la base verde — y eso es lindo.',
  },
  {
    titulo: 'Aderezá al final, siempre',
    desc: 'El ácido del aderezo "cocina" la base verde. Si vas a llevarla como vianda, guardá el aderezo aparte. Si la servís en el momento, aderezá 1 minuto antes.',
  },
]

const SECRETOS = [
  { ingrediente: 'Anchoas en pasta', uso: 'Una cucharada al aderezo. No sabe a anchoa — sabe a umami profundo. Nadie sabe qué es pero todos piden la receta.' },
  { ingrediente: 'Pasta de miso blanco', uso: 'Mezclada con limón y aceite de sésamo. Añade cremosidad y sabor complejo sin lácteos.' },
  { ingrediente: 'Ralladura de limón', uso: 'Sobre la ensalada terminada, antes de servir. Despierta todos los sabores sin agregar ácido extra.' },
  { ingrediente: 'Nueces tostadas', uso: 'Tostadas en seco en sartén. Aportan textura y un sabor a manteca que equilibra la frescura.' },
  { ingrediente: 'Parmesano rallado grueso', uso: 'No fino como polvo — grueso, con textura. Un puñado sobre cualquier ensalada la eleva automáticamente.' },
]

function TabConservacion() {
  return (
    <div className="px-4">
      <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: '#E8F5E9' }}>
        <p className="font-bold text-sm mb-1" style={{ color: '#2D6A4F' }}>💡 El truco del papel de cocina</p>
        <p className="text-sm text-gray-700">
          Ponés un papel absorbente dentro de la bolsa o recipiente con la lechuga. El papel absorbe la humedad y la lechuga dura el doble. Cambialo cada 2 días.
        </p>
      </div>

      <h3 className="font-bold text-sm mb-3" style={{ color: '#1C1917' }}>Bases verdes</h3>
      <div className="flex flex-col gap-2 mb-5">
        {BASES_VERDES.map((b) => (
          <div key={b.nombre} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <p className="font-bold text-sm" style={{ color: '#1C1917' }}>{b.nombre}</p>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#52B788', color: 'white' }}>
                {b.dias} días
              </span>
            </div>
            <p className="text-xs text-gray-500">{b.truco}</p>
          </div>
        ))}
      </div>

      <h3 className="font-bold text-sm mb-3" style={{ color: '#1C1917' }}>Proteínas</h3>
      <div className="flex flex-col gap-2 mb-5">
        {PROTEINAS.map((p) => (
          <div key={p.nombre} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <p className="font-bold text-sm" style={{ color: '#1C1917' }}>{p.nombre}</p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {p.dias} días
              </span>
            </div>
            <p className="text-xs text-gray-500">{p.truco}</p>
          </div>
        ))}
      </div>

      <h3 className="font-bold text-sm mb-3" style={{ color: '#1C1917' }}>Aderezos caseros</h3>
      <div className="flex flex-col gap-2 mb-5">
        {ADEREZOS_CONSERVACION.map((a) => (
          <div key={a.nombre} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <p className="font-bold text-sm" style={{ color: '#1C1917' }}>{a.nombre}</p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                {a.dias} días
              </span>
            </div>
            <p className="text-xs text-gray-500">{a.truco}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function TabEstacion() {
  return (
    <div className="px-4">
      <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: '#FFF3E0' }}>
        <p className="font-bold text-sm mb-1" style={{ color: '#E65100' }}>📅 Calendario argentino</p>
        <p className="text-sm text-gray-700">
          Comprá lo que está en temporada: es más rico, más barato y más nutritivo. La estación determina el sabor.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {Object.entries(MESES).map(([mes, items]) => (
          <div key={mes} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="font-bold text-sm mb-3" style={{ color: '#2D6A4F' }}>🗓️ {mes}</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">🥬 Verduras</p>
                {items.verduras.map((v) => (
                  <p key={v} className="text-xs text-gray-700 py-0.5">• {v}</p>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">🍓 Frutas</p>
                {items.frutas.map((f) => (
                  <p key={f} className="text-xs text-gray-700 py-0.5">• {f}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TabAnti() {
  return (
    <div className="px-4">

      <h3 className="font-bold text-sm mb-3" style={{ color: '#1C1917' }}>10 combos base que nunca fallan</h3>
      <div className="flex flex-col gap-2 mb-6">
        {COMBOS.map((c, i) => (
          <div key={i} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-2">
              <span className="font-bold text-sm" style={{ color: '#52B788' }}>{i + 1}.</span>
              <div>
                <p className="text-xs text-gray-700">
                  <strong>{c.base}</strong> + {c.proteina} + {c.extra}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">Aderezo: {c.aderezo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="font-bold text-sm mb-3" style={{ color: '#1C1917' }}>Técnicas que cambian la textura</h3>
      <div className="flex flex-col gap-3 mb-6">
        {TECNICAS.map((t) => (
          <div key={t.titulo} className="rounded-2xl p-4" style={{ backgroundColor: '#E8F5E9' }}>
            <p className="font-bold text-sm mb-1" style={{ color: '#2D6A4F' }}>{t.titulo}</p>
            <p className="text-xs text-gray-700">{t.desc}</p>
          </div>
        ))}
      </div>

      <h3 className="font-bold text-sm mb-3" style={{ color: '#1C1917' }}>Ingredientes secretos del chef</h3>
      <div className="flex flex-col gap-2">
        {SECRETOS.map((s) => (
          <div key={s.ingrediente} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
            <p className="font-bold text-sm" style={{ color: '#F4A261' }}>{s.ingrediente}</p>
            <p className="text-xs text-gray-600 mt-1">{s.uso}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function GuiasContent() {
  const [tab, setTab] = useState<Tab>('conservacion')

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="max-w-lg mx-auto">

        <div className="px-4 pt-8 pb-4">
          <Link href="/ensaladas-gourmet" className="text-sm mb-2 block" style={{ color: '#2D6A4F' }}>← Inicio</Link>
          <h1 className="text-2xl font-bold" style={{ color: '#1C1917' }}>Guías</h1>
          <p className="text-gray-500 text-sm">Todo lo que necesitás saber</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mx-4 mb-5 bg-gray-100 rounded-2xl p-1">
          {([
            { id: 'conservacion', label: '🧊 Conservación' },
            { id: 'estacion', label: '🌿 Estación' },
            { id: 'anti', label: '💡 Anti-boring' },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex-1 py-2 rounded-xl text-xs font-bold transition-colors"
              style={{
                backgroundColor: tab === t.id ? '#2D6A4F' : 'transparent',
                color: tab === t.id ? 'white' : '#6B7280',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'conservacion' && <TabConservacion />}
        {tab === 'estacion' && <TabEstacion />}
        {tab === 'anti' && <TabAnti />}

      </div>
      <EnsaladasNav />
    </div>
  )
}

export default function GuiasPage() {
  return (
    <EnsaladasGuard>
      <GuiasContent />
    </EnsaladasGuard>
  )
}
