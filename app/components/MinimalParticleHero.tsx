'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion, animate, useMotionValue } from 'framer-motion'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

const PARTICLE_COUNT = 80

const MinimalParticleHero = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>()
  const parallaxX = useMotionValue(0)
  const parallaxY = useMotionValue(0)

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.35 + 0.2
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = 420
      initParticles(canvas)
    }

    setSize()

    const render = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        ctx.beginPath()
        ctx.fillStyle = `rgba(141, 198, 63, ${particle.opacity})`
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    window.addEventListener('resize', setSize)

    return () => {
      window.removeEventListener('resize', setSize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [initParticles])

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const { innerWidth, innerHeight } = window
      const targetX = ((event.clientX / innerWidth) - 0.5) * 30
      const targetY = ((event.clientY / innerHeight) - 0.5) * 18

      animate(parallaxX, targetX, { type: 'spring', stiffness: 80, damping: 16 })
      animate(parallaxY, targetY, { type: 'spring', stiffness: 80, damping: 16 })
    },
    [parallaxX, parallaxY]
  )

  const resetParallax = useCallback(() => {
    animate(parallaxX, 0, { type: 'spring', stiffness: 60, damping: 18 })
    animate(parallaxY, 0, { type: 'spring', stiffness: 60, damping: 18 })
  }, [parallaxX, parallaxY])

  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-70"
        style={{ mixBlendMode: 'screen' }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />

      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-24 text-center md:py-28"
      >
        <motion.span
          className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Green Planet Gaming
        </motion.span>

        <motion.h1
          className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Performansı hissedin, oyunun ritmini yakalayın
        </motion.h1>

        <motion.p
          className="max-w-3xl text-sm text-gray-300 sm:text-base"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Minimal tasarımlı oyuncu bilgisayarlarımız, hassas mühendislik ve sürdürülebilir bileşenlerle
          güçlendirilmiştir. Seçili konfigürasyonlarda stoktan hızlı teslimat ve kurulum desteği sağlayarak
          rekabete bir adım önde başlama imkanı sunuyoruz.
        </motion.p>

        <motion.div
          className="mt-6 flex flex-col items-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a
            href="/gaming-pc"
            className="min-w-[180px] rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
          >
            Hazır Sistemleri İncele
          </a>
          <a
            href="/katalog"
            className="min-w-[180px] rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-emerald-400/40 hover:text-white"
          >
            Bileşen Kataloğu
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default MinimalParticleHero
