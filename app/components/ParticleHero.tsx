'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const ParticleHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [smoothScrollY, setSmoothScrollY] = useState(0)
  const animationFrameRef = useRef<number>()
  const lastScrollTime = useRef<number>(0)
  const scrollVelocity = useRef<number>(0)

  // Smooth scroll animation
  const animateScroll = useCallback(() => {
    const currentTime = Date.now()
    const timeDiff = currentTime - lastScrollTime.current
    
    // Calculate smooth scroll with easing
    const targetScroll = scrollY
    const currentScroll = smoothScrollY
    const diff = targetScroll - currentScroll
    
    // Easing factor - adjust for smoothness (0.1 = very smooth, 0.3 = more responsive)
    const easingFactor = 0.15
    const newSmoothScroll = currentScroll + (diff * easingFactor)
    
    // Only update if there's a meaningful difference
    if (Math.abs(diff) > 0.1) {
      setSmoothScrollY(newSmoothScroll)
      animationFrameRef.current = requestAnimationFrame(animateScroll)
    } else {
      setSmoothScrollY(targetScroll)
    }
    
    lastScrollTime.current = currentTime
  }, [scrollY, smoothScrollY])

  // Handle scroll with debouncing and smoothing
  useEffect(() => {
    let ticking = false
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(currentScrollY)
          ticking = false
        })
        ticking = true
      }

      // Clear existing timeout and set a new one
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        // Ensure final position is accurate after scroll ends
        setScrollY(window.scrollY)
      }, 100)
    }

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Start smooth scroll animation when scrollY changes
  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    animationFrameRef.current = requestAnimationFrame(animateScroll)
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [animateScroll])

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const updateCanvasSize = () => {
        if (canvas) {
          canvas.width = window.innerWidth
          canvas.height = 400
        }
      }

      updateCanvasSize()

      const particles: Array<{
        x: number
        y: number
        size: number
        speedX: number
        speedY: number
        opacity: number
        update: () => void
        draw: () => void
      }> = []
      
      const particleCount = 100

      // Particle class
      class Particle {
        x: number
        y: number
        size: number
        speedX: number
        speedY: number
        opacity: number

        constructor() {
          this.x = Math.random() * (canvas?.width || 0)
          this.y = Math.random() * (canvas?.height || 0)
          this.size = Math.random() * 3
          this.speedX = Math.random() * 3 - 1.5
          this.speedY = Math.random() * 3 - 1.5
          this.opacity = Math.random() * 0.5 + 0.3
        }

        update() {
          this.x += this.speedX
          this.y += this.speedY

          if (canvas) {
            if (this.x > canvas.width) this.x = 0
            if (this.x < 0) this.x = canvas.width
            if (this.y > canvas.height) this.y = 0
            if (this.y < 0) this.y = canvas.height
          }
        }

        draw() {
          if (ctx) {
            ctx.fillStyle = `rgba(141, 198, 63, ${this.opacity})`
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }

      // Animation loop
      function animate() {
        if (ctx && canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          
          particles.forEach(particle => {
            particle.update()
            particle.draw()
          })

          requestAnimationFrame(animate)
        }
      }

      animate()

      // Handle resize
      window.addEventListener('resize', updateCanvasSize)

      return () => {
        window.removeEventListener('resize', updateCanvasSize)
      }
    }, [])

    return (
      <div className="relative h-[500px] md:h-[400px] overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Custom SVG Background Pattern */}
        <div className="absolute inset-0">
          <svg 
            className="w-full h-full" 
            viewBox="0 0 1200 400" 
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8dc63f" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#a3d65c" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#8dc63f" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8dc63f" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#a3d65c" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            

            {/* Road Path - Side View */}
            <g className="road-path">
              {/* Road Base */}
              <path
                d="M-20,210 L1220,210"
                stroke="#2a2a2a"
                strokeWidth="3"
                opacity="0.8"
              />

              {/* Road Shadow */}
              <path
                d="M-20,213 L1220,213"
                stroke="#1a1a1a"
                strokeWidth="6"
                opacity="0.4"
              />

              {/* Road Surface Lines */}
              <path
                d="M-20,210 L1220,210"
                stroke="#8dc63f"
                strokeWidth="1"
                strokeDasharray="20,20"
                opacity="0.4"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;40"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Road Glow Effect */}
              <path
                d="M-20,210 L1220,210"
                stroke="url(#primaryGradient)"
                strokeWidth="2"
                opacity="0.1"
                filter="url(#glow)"
              />

              {/* Distance Markers */}
              {Array.from({ length: 10 }).map((_, i) => (
                <g key={`marker-${i}`}>
                  <line
                    x1={120 * i}
                    y1="208"
                    x2={120 * i}
                    y2="212"
                    stroke="#8dc63f"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  <line
                    x1={120 * i + 60}
                    y1="209"
                    x2={120 * i + 60}
                    y2="211"
                    stroke="#8dc63f"
                    strokeWidth="0.5"
                    opacity="0.2"
                  />
                </g>
              ))}
            </g>

            {/* Racing Cars */}
            <g className="racing-cars">
            {/* Car 1 - Left to Right (Appears on scroll down) */}
            <g 
              className="car1" 
              style={{ 
                transform: `translateX(${Math.min(Math.max(smoothScrollY - 150, -120), 1100)}px)`,
                opacity: smoothScrollY > 100 ? (smoothScrollY < 1500 ? 1 : 0) : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            >
                <image
                  href="/images/imp/car1.png"
                  x="-120"
                  y="180"
                  width="120"
                  height="60"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <animate
                    attributeName="y"
                    values="180;178;180"
                    dur="0.5s"
                    repeatCount="indefinite"
                  />
                </image>
              </g>

            {/* Car 2 - Right to Left (Second Lane) */}
            <g 
              className="car2" 
              style={{ 
                transform: `translateX(${Math.max(Math.min(-smoothScrollY + 1500, 1200), -150)}px)`,
                opacity: smoothScrollY > 200 ? (smoothScrollY < 1500 ? 1 : 0) : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            >
                <image
                  href="/images/imp/car2.png"
                  x="-150"
                  y="220"
                  width="150"
                  height="75"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <animate
                    attributeName="y"
                    values="180;178;180"
                    dur="0.5s"
                    repeatCount="indefinite"
                  />
                </image>
              </g>
            </g>
          </svg>
        </div>
        
        {/* Üst fade efekti */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-900/90 to-transparent z-20"></div>
        
        {/* Alt fade efekti */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900/90 to-transparent z-20"></div>
        
        {/* Particle Canvas with reduced opacity */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-70"
          style={{ mixBlendMode: 'screen' }}
        />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <motion.div
            className="inline-block mb-6 rounded-2xl px-4 md:px-6 py-3 apple-card reveal-animation"
            style={{ 
              background: 'rgba(141, 198, 63, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Performans Odaklı<br className="block md:hidden" /> Oyuncu Bilgisayarları
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-200 px-4"
            style={{ 
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Green Planet Gaming olarak, her seviyeden oyuncu için yüksek performanslı PC&apos;ler, 
            donanım bileşenleri ve çevre birimleri sunuyoruz. Oyun deneyiminizi bir üst 
            seviyeye taşıyacak ürünleri keşfedin.
          </motion.p>

          <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-4 items-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a 
              href="/gaming-pc" 
              className="modern-button group relative overflow-hidden min-w-[200px] text-center text-white subtle-float"
              style={{
                background: 'linear-gradient(135deg, #8dc63f 0%, #a3d65c 100%)',
                boxShadow: '0 8px 32px rgba(141, 198, 63, 0.3), 0 1px 0px rgba(255, 255, 255, 0.2) inset, 0 -1px 0px rgba(0, 0, 0, 0.1) inset',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #7ab82f 0%, #8dc63f 100%)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(141, 198, 63, 0.4), 0 1px 0px rgba(255, 255, 255, 0.3) inset, 0 -1px 0px rgba(0, 0, 0, 0.1) inset'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #8dc63f 0%, #a3d65c 100%)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(141, 198, 63, 0.3), 0 1px 0px rgba(255, 255, 255, 0.2) inset, 0 -1px 0px rgba(0, 0, 0, 0.1) inset'
                e.currentTarget.style.transform = 'translateY(0px)'
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Gaming PC&apos;leri Keşfet
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>
            
            <a 
              href="/kategoriler" 
              className="modern-button group relative overflow-hidden min-w-[200px] text-center text-white subtle-float"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 1px 0px rgba(255, 255, 255, 0.1) inset, 0 -1px 0px rgba(0, 0, 0, 0.1) inset'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15), 0 1px 0px rgba(255, 255, 255, 0.15) inset, 0 -1px 0px rgba(0, 0, 0, 0.1) inset'
                e.currentTarget.style.borderColor = 'rgba(141, 198, 63, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1), 0 1px 0px rgba(255, 255, 255, 0.1) inset, 0 -1px 0px rgba(0, 0, 0, 0.1) inset'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Tüm Kategoriler
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>
          </motion.div>
        </div>
      </div>
    )
  }

  export default ParticleHero
