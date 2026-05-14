'use client'

interface Filtro {
  key: string
  label: string
}

interface Props {
  filtros: Filtro[]
  activo: string
  onChange: (key: string) => void
}

export default function FiltroBar({ filtros, activo, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {filtros.map((f) => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          className={`flex-none px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
            activo === f.key
              ? 'bg-verde text-white'
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
