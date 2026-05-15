'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

function useCountdown(minutes: number) {
  const [segundos, setSegundos] = useState(minutes * 60)
  useEffect(() => {
    const t = setInterval(() => setSegundos((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])
  const m = Math.floor(segundos / 60).toString().padStart(2, '0')
  const s = (segundos % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function FAQItem({ pregunta, respuesta }: { pregunta: string; respuesta: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-700">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-semibold text-white pr-4">{pregunta}</span>
        <span
          className="flex-none w-6 h-6 flex items-center justify-center rounded-full border-2 border-naranja text-naranja font-bold text-lg transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '400px' : '0px', paddingBottom: open ? '20px' : '0px' }}
      >
        <p className="text-gray-300 text-sm leading-relaxed">{respuesta}</p>
      </div>
    </div>
  )
}

function WABubble({ text, sent, time, name }: { text: string; sent?: boolean; time: string; name?: string }) {
  return (
    <div className={`flex ${sent ? 'justify-end' : 'justify-start'} mb-1`}>
      <div
        className="max-w-[80%] px-3 py-2 shadow-sm"
        style={{
          background: sent ? '#DCF8C6' : '#ffffff',
          borderRadius: sent ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
        }}
      >
        {name && !sent && <p className="text-xs font-bold text-emerald-600 mb-0.5">{name}</p>}
        <p className="text-gray-800 text-sm leading-snug">{text}</p>
        <p className="text-[10px] text-gray-400 text-right mt-0.5">{time} ✓✓</p>
      </div>
    </div>
  )
}

const SHOPIFY_URL = 'https://agoraeducacion.store/cart/53225908535575:1'
const WA_URL = 'https://wa.me/5493518509904?text=Hola!%20Acabo%20de%20comprar%20Nutriki%20y%20quiero%20activar%20mi%20acceso.%20Mi%20email%20es:'

export default function LandingPage() {
  const countdown = useCountdown(15)
  const [sliderIdx, setSliderIdx] = useState(0)
  const screenshots = [
    { bg: 'from-green-800 to-green-600', label: 'Dashboard personalizado' },
    { bg: 'from-orange-700 to-orange-500', label: 'Biblioteca de recetas' },
    { bg: 'from-teal-700 to-teal-500', label: 'Plan semanal' },
    { bg: 'from-purple-700 to-purple-500', label: 'Lista de compras' },
  ]

  const faqs = [
    {
      pregunta: '¿Para qué edades sirve Nutriki?',
      respuesta: 'Para niños de 1 a 12 años. Cada receta tiene indicación de edad mínima y los filtros te muestran solo las opciones apropiadas para tu hijo.',
    },
    {
      pregunta: '¿Cómo accedo después de comprar?',
      respuesta: 'Comprás en la tienda, nos escribís por WhatsApp con tu nombre y email, y en menos de 5 minutos te activamos el acceso. Ingresás desde cualquier dispositivo, en cualquier momento.',
    },
    {
      pregunta: '¿Las recetas sirven para niños selectivos?',
      respuesta: 'Sí. Cada receta tiene un "Tip para mamá" con consejos específicos para presentar la comida a niños que rechazan alimentos nuevos. Además tenés la Guía Anti-Selectividad incluida.',
    },
    {
      pregunta: '¿Necesito saber cocinar?',
      respuesta: 'No. Todas las recetas están en pasos simples, con ingredientes básicos y tiempo real de preparación. Si podés hervir agua, podés hacer estas recetas.',
    },
    {
      pregunta: '¿Los ingredientes son caros o difíciles de conseguir?',
      respuesta: 'No. Todos los ingredientes se consiguen en cualquier verdulería o súper del barrio. Sin quinoa, sin semillas importadas, sin nada raro.',
    },
    {
      pregunta: '¿Por cuánto tiempo tengo acceso?',
      respuesta: 'Acceso vitalicio. Pagás una sola vez y la plataforma es tuya para siempre, con todas las actualizaciones y recetas nuevas incluidas sin costo adicional.',
    },
  ]

  return (
    <div style={{ background: '#0D1F15', color: 'white', minHeight: '100vh' }}>
      {/* Barra sticky urgencia */}
      <div className="sticky top-0 z-50 bg-verde text-white py-2.5 px-4 text-center text-sm font-semibold">
        <span className="mr-2">🔥 75% OFF · La oferta termina en</span>
        <span className="bg-naranja text-white font-bold px-2 py-0.5 rounded font-mono">{countdown}</span>
        <span className="ml-2">· Garantía 7 días</span>
      </div>

      {/* HERO */}
      <section className="px-5 pt-12 pb-8 max-w-2xl mx-auto text-center">
        <span className="inline-block bg-verde/40 border border-verde text-green-200 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
          🥦 La plataforma de recetas infantiles #1 en Argentina
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-5">
          ¿Siempre terminás dando lo mismo<br />
          porque no sabés qué cocinarle<br />
          que sea{' '}
          <span className="text-naranja">sano</span>
          {' '}Y que lo coma?
        </h1>
        <p className="text-gray-300 text-base mb-6 max-w-lg mx-auto leading-relaxed">
          Nutriki tiene +200 recetas rápidas y nutritivas para niños de 1 a 12 años,
          listas en menos de 15 minutos, con ingredientes de tu verdulería,
          y organizadas por edad para que nunca más te quedes sin ideas.
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-300 mb-6">
          <span>★★★★★ 4.9/5</span>
          <span className="text-gray-600">|</span>
          <span>Garantía 7 días</span>
          <span className="text-gray-600">|</span>
          <span>+800 mamás</span>
        </div>

        {/* Antes / Después */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {/* ❌ Sin Nutriki */}
          <div className="bg-gray-800 border-2 border-red-900/60 rounded-2xl overflow-hidden sm:order-last">
            <div className="relative aspect-[4/3]">
              <Image
                src="https://images.pexels.com/photos/5704250/pexels-photo-5704250.jpeg?auto=compress&cs=tinysrgb&w=640"
                alt="Niño aburrido con comida repetitiva"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 640px) 50vw, 300px"
              />
              <div className="absolute inset-0 bg-red-950/30 pointer-events-none" />
              <span className="absolute top-2 left-2 text-xl">❌</span>
            </div>
            <p className="text-gray-400 text-xs text-center font-semibold py-2 px-2">La misma historia de siempre</p>
          </div>
          {/* ✅ Con Nutriki */}
          <div className="bg-verde/10 border-2 border-verde rounded-2xl overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src="https://images.pexels.com/photos/6969708/pexels-photo-6969708.jpeg?auto=compress&cs=tinysrgb&w=640"
                alt="Niño feliz comiendo comida saludable"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 300px"
              />
              <div className="absolute inset-0 bg-verde/10 pointer-events-none" />
              <span className="absolute top-2 left-2 text-xl">✅</span>
            </div>
            <p className="text-green-300 text-xs text-center font-semibold py-2 px-2">Con Nutriki, en 15 minutos</p>
          </div>
        </div>

        <a
          href={SHOPIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { if (typeof window !== 'undefined' && (window as any).fbq) { (window as any).fbq('track', 'InitiateCheckout') } }}
          className="inline-block bg-naranja text-white font-extrabold text-lg px-8 py-4 rounded-2xl shadow-lg transition-transform active:scale-95"
        >
          🥦 Quiero acceder a Nutriki →
        </a>
      </section>

      {/* Social proof bar */}
      <div className="bg-verde py-5 px-4">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-2xl font-extrabold">+800</p>
            <p className="text-green-200 text-xs">mamás usando Nutriki</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold">+200</p>
            <p className="text-green-200 text-xs">recetas para 1-12 años</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold">4.9★</p>
            <p className="text-green-200 text-xs">calificación</p>
          </div>
        </div>
      </div>

      {/* Pain points */}
      <section className="px-5 py-14 max-w-2xl mx-auto">
        <p className="text-naranja text-xs font-bold uppercase tracking-wider text-center mb-3">¿Te pasa esto?</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-8">
          &quot;Tu hijo no come lo que preparás...<br />
          y vos no sabés qué más inventar&quot;
        </h2>
        <div className="space-y-4">
          {[
            { ico: '😩', titulo: 'Siempre repetís lo mismo', desc: 'Pollo, fideos, milanesa. Y cuando intentás algo nuevo, lo rechaza sin ni probarlo.' },
            { ico: '🔍', titulo: 'Buscás recetas online pero son complicadas', desc: 'Ingredientes raros, 1 hora de preparación o equipos que no tenés.' },
            { ico: '⏰', titulo: 'No tenés tiempo', desc: 'Llegás cansada y necesitás algo listo en 15 minutos máximo.' },
            { ico: '🎒', titulo: 'La vianda es una pesadilla', desc: 'Siempre mandás lo mismo y ya no sabés qué ponerle.' },
            { ico: '😰', titulo: 'Tu hijo es selectivo', desc: 'Come 5 cosas y punto. Cada comida es una batalla.' },
            { ico: '💸', titulo: 'Las recetas "saludables" son caras', desc: 'Ingredientes que no conseguís en el súper del barrio.' },
          ].map((p, i) => (
            <div key={i} className="flex gap-4 rounded-2xl p-4 border-l-4 border-naranja" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <span className="text-2xl flex-none">{p.ico}</span>
              <div>
                <p className="font-bold text-white">{p.titulo}</p>
                <p className="text-gray-400 text-sm mt-0.5">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Remate emocional */}
        <div className="mt-8 rounded-2xl p-6 text-center border border-gray-700" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <p className="text-gray-300 text-base leading-relaxed mb-1">No es que no te importa.</p>
          <p className="text-naranja font-bold text-base">Es que no tenés tiempo, ni cabeza, ni ideas nuevas todos los días.</p>
          <p className="text-gray-300 text-base mt-1">Nutriki fue creado exactamente para eso.</p>
        </div>
      </section>

      {/* Solución */}
      <div style={{ background: 'rgba(0,0,0,0.3)' }}>
        <section className="px-5 py-14 max-w-2xl mx-auto text-center">
          <p className="text-verde text-xs font-bold uppercase tracking-wider mb-3">La solución que estabas buscando</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
            +200 recetas pensadas para lo que<br />los chicos realmente comen
          </h2>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto">
            Una plataforma completa con recetas organizadas por edad, categoría y restricción alimentaria.
            Plan semanal, lista de compras, guía nutricional y mucho más — todo en tu celular.
          </p>
          <Image
            src="/mockup-nutriki.png"
            alt="Plataforma Nutriki"
            width={500}
            height={500}
            className="mx-auto drop-shadow-xl rounded-2xl"
            style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
            priority
          />
        </section>
      </div>

      {/* Bonos */}
      <section className="px-5 py-14 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-8">
          Todo lo que recibís con tu acceso
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { img: '/bono1-nutriki.jpg', nombre: '200+ Recetas Infantiles' },
            { img: '/bono2-nutriki.jpg', nombre: 'Guía de Alimentación por Edad' },
            { img: '/bono3-nutriki.jpg', nombre: 'Plan Semanal Completo' },
            { img: '/bono4-nutriki.jpg', nombre: 'Viandas Escolares' },
            { img: '/bono5-nutriki.jpg', nombre: 'Postres Sin Culpa' },
            { img: '/bono6-nutriki.jpg', nombre: 'Jugos y Licuados Saludables' },
            { img: '/bono7-nutriki.jpg', nombre: 'Guía Anti-Selectividad' },
          ].map((b, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden">
                <Image
                  src={b.img}
                  alt={b.nombre}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <p className="text-white font-semibold text-xs text-center mt-2 leading-snug">{b.nombre}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resultados */}
      <div style={{ background: 'rgba(0,0,0,0.3)' }}>
        <section className="px-5 py-14 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-8">
            ¿Qué cambia en tu familia cuando comés bien?
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { ico: '⚡', label: 'Más energía para jugar y aprender' },
              { ico: '🧠', label: 'Mejor concentración en la escuela' },
              { ico: '😋', label: 'Chicos que piden repetir' },
              { ico: '⏰', label: 'Mamás que ahorran tiempo y cabeza' },
              { ico: '💪', label: 'Crecimiento y desarrollo óptimo' },
              { ico: '🎒', label: 'Viandas que vuelven vacías' },
            ].map((r, i) => (
              <div key={i} className="bg-verde/10 border border-verde/30 rounded-2xl p-4 text-center">
                <span className="text-3xl block mb-2">{r.ico}</span>
                <p className="text-sm font-semibold text-gray-200">{r.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Cómo funciona */}
      <section className="px-5 py-14 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-8">¿Cómo funciona?</h2>
        <div className="space-y-5">
          {[
            { n: 1, titulo: 'Comprás el acceso', desc: 'Pago único en Shopify, sin suscripciones' },
            { n: 2, titulo: 'Nos escribís por WhatsApp', desc: 'Con tu nombre y el email con el que compraste' },
            { n: 3, titulo: 'Te activamos en menos de 5 minutos', desc: 'Recibís el link de acceso directo' },
            { n: 4, titulo: 'Ingresás y empezás hoy', desc: 'Cargás la edad de tu hijo y las recetas se adaptan' },
          ].map((paso) => (
            <div key={paso.n} className="flex gap-4 items-start">
              <div className="flex-none w-10 h-10 rounded-full bg-naranja flex items-center justify-center font-extrabold text-lg text-white">
                {paso.n}
              </div>
              <div>
                <p className="font-bold text-white">{paso.titulo}</p>
                <p className="text-gray-400 text-sm">{paso.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshots slider */}
      <div style={{ background: 'rgba(0,0,0,0.3)' }}>
        <section className="px-5 py-14 max-w-2xl mx-auto">
          <h2 className="text-xl font-extrabold text-center mb-6">Así se ve Nutriki</h2>
          <div className="relative overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${sliderIdx * 100}%)` }}
            >
              {screenshots.map((sc, i) => (
                <div key={i} className={`flex-none w-full bg-gradient-to-br ${sc.bg} rounded-3xl h-52 flex items-center justify-center`}>
                  <div className="text-center">
                    <p className="text-4xl mb-2">📱</p>
                    <p className="text-white/80 text-sm font-semibold">{sc.label}</p>
                    <p className="text-white/50 text-xs mt-1">Screenshot — disponible al lanzamiento</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => setSliderIdx(i)}
                className="w-2 h-2 rounded-full transition-colors"
                style={{ background: i === sliderIdx ? '#F4A261' : '#4B5563' }}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Precio */}
      <section className="px-5 py-14 max-w-lg mx-auto">
        <div className="border-2 border-verde rounded-3xl overflow-hidden">
          <div className="bg-verde px-6 py-3 text-center">
            <span className="text-white font-bold text-sm uppercase tracking-wide">MÁS ELEGIDO</span>
          </div>
          <div className="px-6 py-8" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {['💳 Pago único', '♾️ Sin suscripciones', '🔄 Actualizaciones gratis', '🛡️ Garantía 7 días'].map((b) => (
                <span key={b} className="text-xs bg-verde/20 text-green-300 border border-verde/30 px-3 py-1 rounded-full font-semibold">{b}</span>
              ))}
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-500 line-through text-xl mb-1">$79.999 ARS</p>
              <p className="text-4xl font-extrabold text-verde">$19.999 ARS</p>
              <p className="text-gray-400 text-sm mt-1">pago único, acceso vitalicio</p>
            </div>

            <div className="bg-naranja/20 border border-naranja/40 rounded-xl p-3 text-center mb-6">
              <p className="text-naranja font-semibold text-sm">
                ⏰ Oferta termina en <span className="font-mono font-bold">{countdown}</span>
              </p>
            </div>

            <ul className="space-y-2 mb-6">
              {[
                '✅ 200+ recetas para 1-12 años',
                '✅ Plan semanal con lista de compras',
                '✅ 40 ideas de viandas escolares',
                '✅ Guía de alimentación por edad',
                '✅ 25 postres sin azúcar refinada',
                '✅ 15 jugos y licuados',
                '✅ Guía anti-selectividad',
                '✅ Acceso vitalicio con actualizaciones',
              ].map((item) => (
                <li key={item} className="text-sm text-gray-300">{item}</li>
              ))}
            </ul>

            <a
              href={SHOPIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { if (typeof window !== 'undefined' && (window as any).fbq) { (window as any).fbq('track', 'InitiateCheckout') } }}
              className="block w-full bg-verde text-white font-extrabold text-lg py-4 rounded-2xl text-center transition-transform active:scale-95"
            >
              Sí, quiero acceder a Nutriki →
            </a>
            <p className="text-center text-gray-500 text-xs mt-3">🔒 Pago seguro · Mercado Pago</p>
          </div>
        </div>
      </section>

      {/* Testimonios WhatsApp */}
      <div style={{ background: 'rgba(0,0,0,0.3)' }}>
        <section className="px-5 py-14 max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-extrabold text-center mb-8">
            Lo que dicen las mamás que ya usan Nutriki
          </h2>
          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden border border-gray-700" style={{ background: '#0B141A' }}>
              <div className="px-4 py-3 flex items-center gap-3" style={{ background: '#1F2C34' }}>
                <div className="w-8 h-8 bg-verde rounded-full flex items-center justify-center text-sm font-bold">R</div>
                <div>
                  <p className="text-white text-sm font-semibold">Romina — Córdoba</p>
                  <p className="text-gray-400 text-xs">Mamá de Tomás, 5 años</p>
                </div>
              </div>
              <div className="p-4 space-y-1.5" style={{ background: '#0D1417' }}>
                <WABubble text="Flor, probé las tostadas de palta con huevo de Nutriki y mi hijo las pidió tres veces esta semana 😍" sent time="9:14 AM" />
                <WABubble text="¡Qué bueno! ¿Y fue fácil de hacer?" time="9:16 AM" name="Florencia" />
                <WABubble text="Tardé 10 minutos, con ingredientes que tenía en casa. No lo puedo creer 🙏" sent time="9:17 AM" />
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-700" style={{ background: '#0B141A' }}>
              <div className="px-4 py-3 flex items-center gap-3" style={{ background: '#1F2C34' }}>
                <div className="w-8 h-8 bg-naranja rounded-full flex items-center justify-center text-sm font-bold text-white">V</div>
                <div>
                  <p className="text-white text-sm font-semibold">Valeria — Buenos Aires</p>
                  <p className="text-gray-400 text-xs">Mamá de Valentina, 7 años</p>
                </div>
              </div>
              <div className="p-4 space-y-1.5" style={{ background: '#0D1417' }}>
                <WABubble text="Chicas les juro que mi hija que no come NADA se comió la vianda completa hoy 😭🙌" sent time="1:45 PM" />
                <WABubble text="¡¿Qué le mandaste?!" time="1:47 PM" name="Ana" />
                <WABubble text="Las bolitas de avena del plan de Nutriki. Dijo que eran ricas y no sabía que eran sanas jajaja 😂" sent time="1:48 PM" />
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-700" style={{ background: '#0B141A' }}>
              <div className="px-4 py-3 flex items-center gap-3" style={{ background: '#1F2C34' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: '#FFB4A2' }}>M</div>
                <div>
                  <p className="text-white text-sm font-semibold">Mariela — Rosario</p>
                  <p className="text-gray-400 text-xs">Mamá de Bautista, 3 años</p>
                </div>
              </div>
              <div className="p-4 space-y-1.5" style={{ background: '#0D1417' }}>
                <WABubble text="Antes de Nutriki mandaba siempre sándwich de fiambre porque no se me ocurría otra cosa 😅" sent time="8:30 AM" />
                <WABubble text="Ahora con los planes semanales ya no pienso más, todo está ahí. Es una tranquilidad enorme 💚" sent time="8:31 AM" />
                <WABubble text="¿Y lo usan desde el celu?" time="8:33 AM" name="Graciela" />
                <WABubble text="Sí! Consulto directo desde la cocina mientras cocino. Facilísimo 👌" sent time="8:34 AM" />
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-xs text-center mt-4">
            Testimonios de mamás reales. Resultados pueden variar.
          </p>
        </section>
      </div>

      {/* Garantía */}
      <section className="px-5 py-14 max-w-lg mx-auto text-center">
        <div className="text-5xl mb-4">🛡️</div>
        <h2 className="text-2xl font-extrabold mb-3">Garantía total de 7 días</h2>
        <p className="text-gray-300 mb-2">
          Si por cualquier motivo no quedás satisfecha,
        </p>
        <p className="text-verde font-bold text-lg">
          te devolvemos el 100% de tu dinero.
        </p>
        <p className="text-gray-300">Sin preguntas, sin vueltas.</p>
      </section>

      {/* FAQ */}
      <div style={{ background: 'rgba(0,0,0,0.3)' }}>
        <section className="px-5 py-14 max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-extrabold text-center mb-8">Preguntas frecuentes</h2>
          <div className="border-t border-gray-700">
            {faqs.map((faq, i) => (
              <FAQItem key={i} pregunta={faq.pregunta} respuesta={faq.respuesta} />
            ))}
          </div>
        </section>
      </div>

      {/* CTA Final */}
      <section className="px-5 py-16 text-center max-w-lg mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
          ¿Seguís pensando qué cocinarle mañana?
        </h2>
        <p className="text-gray-300 mb-8">Más de 800 mamás ya no tienen ese problema.</p>
        <a
          href={SHOPIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { if (typeof window !== 'undefined' && (window as any).fbq) { (window as any).fbq('track', 'InitiateCheckout') } }}
          className="inline-block bg-verde text-white font-extrabold text-xl px-10 py-5 rounded-2xl shadow-lg transition-transform active:scale-95"
        >
          🥦 Quiero acceder a Nutriki →
        </a>
      </section>

      {/* Footer */}
      <footer style={{ background: 'rgba(0,0,0,0.6)' }} className="px-5 py-10 text-center">
        <p className="text-4xl mb-3">🥦</p>
        <p className="text-white font-bold text-lg mb-4">Nutriki</p>
        <div className="flex flex-wrap justify-center gap-4 text-gray-400 text-sm mb-6">
          <a href="#" className="hover:text-white">Inicio</a>
          <a href="#" className="hover:text-white">Recetas</a>
          <a href="#" className="hover:text-white">Garantía</a>
          <Link href="/login" className="hover:text-white">Ingresar</Link>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">Contacto</a>
        </div>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-full text-sm mb-6"
          style={{ background: '#25D366' }}
        >
          WhatsApp: +54 9 351 850-9904
        </a>
        <p className="text-gray-600 text-xs max-w-sm mx-auto mt-4">
          El contenido de esta plataforma es de carácter informativo y educativo.
          No reemplaza la consulta con un pediatra o nutricionista infantil.
        </p>
      </footer>
    </div>
  )
}
