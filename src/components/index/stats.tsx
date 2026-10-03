'use client'

import React from 'react'
import { AnimatePresence, motion } from 'motion/react'

// Placeholder image for the left studio card - swap with your own image path anytime
const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900&auto=format&fit=crop&q=80'

type Platform = 'youtube' | 'x' | 'instagram' | 'tiktok'

type Testimonial = {
  avatar: string
  author: string
  platform: Platform
  audience: string
  url: string
  quote: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    author: 'Alex Rivera',
    platform: 'youtube',
    audience: '2.4M subscribers',
    url: 'https://youtube.com',
    quote:
      'Astra cut our voiceover production time from days to minutes. The emotional nuance is indistinguishable from studio recordings.',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    author: 'Sarah Chen',
    platform: 'instagram',
    audience: '1.2M followers',
    url: 'https://instagram.com',
    quote:
      'The emotional range in each generation is remarkable. Our audience genuinely couldn’t tell it apart from human narration.',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    author: 'Elena Rostova',
    platform: 'x',
    audience: '680K followers',
    url: 'https://x.com',
    quote:
      'Voice cloning at this level of nuance used to require days in a booth. Now I produce weekly episodes right from my desk.',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    author: 'Marcus Vance',
    platform: 'tiktok',
    audience: '3.1M followers',
    url: 'https://tiktok.com',
    quote:
      'Clone accuracy is unreal. I can edit and re-record entire sponsor segments in my own voice while on the road.',
  },
]

function StreamingGraph() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let lastTime = performance.now()

    const rightInset = 16
    const pointSpacing = 22
    const speed = 26 // calm, natural real-time streaming velocity

    let width = 0
    let height = 0
    let dpr = 1

    const getNextTarget = (h: number, current: number) => {
      const minY = h * 0.18
      const maxY = h * 0.8
      const midY = (minY + maxY) / 2
      const delta = (Math.random() - 0.5) * (maxY - minY) * 0.85
      const pull = (midY - current) * 0.35
      const next = current + delta + pull
      return Math.max(minY, Math.min(maxY, next))
    }

    const points: { x: number; y: number }[] = []
    let startY = 60
    let targetY = 50
    let currentTipY = 60

    const initPoints = (w: number, h: number) => {
      points.length = 0
      const tipX = w - rightInset
      const numPoints = Math.ceil(w / pointSpacing) + 4
      let y = h * 0.5
      const tempYs: number[] = []
      for (let i = 0; i <= numPoints; i++) {
        y = getNextTarget(h, y)
        tempYs.push(y)
      }
      for (let i = numPoints; i >= 0; i--) {
        points.push({
          x: tipX - i * pointSpacing,
          y: tempYs[numPoints - i],
        })
      }
      startY = points[points.length - 1].y
      targetY = getNextTarget(h, startY)
      currentTipY = startY
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width || canvas.parentElement?.clientWidth || 300
      const h = rect.height || canvas.parentElement?.clientHeight || 120
      dpr = window.devicePixelRatio || 1
      width = w
      height = h
      canvas.width = w * dpr
      canvas.height = h * dpr

      if (points.length === 0) {
        initPoints(w, h)
      }
    }
    resize()

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      if (width === 0 || height === 0) {
        animId = requestAnimationFrame(loop)
        return
      }

      // 1. Historical points drift steadily leftward (rigid recorded shape)
      const dx = speed * dt
      for (let i = 0; i < points.length; i++) {
        points[i].x -= dx
      }

      // 2. Remove points that have scrolled out of frame on the left
      while (points.length > 0 && points[0].x < -40) {
        points.shift()
      }

      // 3. Telemetry leading edge: live tip moves to new values, then gets committed
      const tipX = width - rightInset
      const lastPt = points[points.length - 1]

      if (lastPt) {
        const distance = tipX - lastPt.x
        const progress = Math.min(Math.max(distance / pointSpacing, 0), 1)

        // Smoothstep easing for fluid motion
        const ease = progress * progress * (3 - 2 * progress)
        currentTipY = startY + (targetY - startY) * ease

        if (distance >= pointSpacing) {
          // Commit the recorded point to history so it flows left out of frame
          points.push({ x: lastPt.x + pointSpacing, y: targetY })
          startY = targetY
          targetY = getNextTarget(height, startY)
        }
      }

      // 4. Render
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const allPoints = [...points, { x: tipX, y: currentTipY }]

      if (allPoints.length >= 2) {
        const isDark = document.documentElement.classList.contains('dark')
        const color = isDark ? '255, 255, 255' : '20, 20, 20'

        const traceCurve = () => {
          ctx.beginPath()
          ctx.moveTo(allPoints[0].x, allPoints[0].y)
          for (let i = 1; i < allPoints.length - 1; i++) {
            const xc = (allPoints[i].x + allPoints[i + 1].x) / 2
            const yc = (allPoints[i].y + allPoints[i + 1].y) / 2
            ctx.quadraticCurveTo(allPoints[i].x, allPoints[i].y, xc, yc)
          }
          ctx.lineTo(tipX, currentTipY)
        }

        // Faded vertical gradient area under curve
        traceCurve()
        ctx.lineTo(tipX, height)
        ctx.lineTo(allPoints[0].x, height)
        ctx.closePath()

        const grad = ctx.createLinearGradient(0, height * 0.15, 0, height)
        grad.addColorStop(0, `rgba(${color}, 0.24)`)
        grad.addColorStop(0.5, `rgba(${color}, 0.07)`)
        grad.addColorStop(1, `rgba(${color}, 0)`)
        ctx.fillStyle = grad
        ctx.fill()

        // Clean stroke line
        traceCurve()
        ctx.strokeStyle = `rgba(${color}, 0.85)`
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()

        // Live tip dot with soft pulsing halo
        const pulse = 1 + Math.sin(now * 0.004) * 0.25
        ctx.beginPath()
        ctx.arc(tipX, currentTipY, 6 * pulse, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, 0.18)`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(tipX, currentTipY, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, 0.95)`
        ctx.fill()
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    const ro = new ResizeObserver(() => {
      resize()
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <div
      className='relative w-full h-28 sm:h-34 overflow-hidden pt-1'
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0px, transparent 10px, black 36px, black 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0px, transparent 10px, black 36px, black 100%)',
      }}
    >
      <canvas ref={canvasRef} className='w-full h-full block' />
    </div>
  )
}

type LanguageItem = {
  code: string
  name: string
  flag: string
}

const LANGUAGE_ROWS: [LanguageItem, LanguageItem, LanguageItem][] = [
  [
    { code: 'us', name: 'English', flag: '🇺🇸' },
    { code: 'jp', name: '日本語', flag: '🇯🇵' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ],
  [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'kr', name: '한국어', flag: '🇰🇷' },
    { code: 'gr', name: 'Ελληνικά', flag: '🇬🇷' },
  ],
  [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'cn', name: '中文', flag: '🇨🇳' },
    { code: 'cz', name: 'Čeština', flag: '🇨🇿' },
  ],
  [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'sa', name: 'العربية', flag: '🇸🇦' },
    { code: 'ua', name: 'Українська', flag: '🇺🇦' },
  ],
  [
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'in', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ro', name: 'Română', flag: '🇷🇴' },
  ],
  [
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  ],
  [
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'vn', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'bg', name: 'Български', flag: '🇧🇬' },
  ],
  [
    { code: 'se', name: 'Svenska', flag: '🇸🇪' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
  ],
  [
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'id', name: 'Bahasa', flag: '🇮🇩' },
    { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  ],
  [
    { code: 'dk', name: 'Dansk', flag: '🇩🇰' },
    { code: 'my', name: 'Melayu', flag: '🇲🇾' },
    { code: 'rs', name: 'Srpski', flag: '🇷🇸' },
  ],
  [
    { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
    { code: 'il', name: 'עברית', flag: '🇮🇱' },
    { code: 'lt', name: 'Lietuvių', flag: '🇱🇹' },
  ],
  [
    { code: 'no', name: 'Norsk', flag: '🇳🇴' },
    { code: 'ph', name: 'Filipino', flag: '🇵🇭' },
    { code: 'lv', name: 'Latviešu', flag: '🇱🇻' },
  ],
  [
    { code: 'ie', name: 'Gaeilge', flag: '🇮🇪' },
    { code: 'bd', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'ee', name: 'Eesti', flag: '🇪🇪' },
  ],
  [
    { code: 'br', name: 'Português (BR)', flag: '🇧🇷' },
    { code: 'pk', name: 'اردو', flag: '🇵🇰' },
    { code: 'is', name: 'Íslenska', flag: '🇮🇸' },
  ],
]

function FlagImage({ code, fallback }: { code: string; fallback: string }) {
  const [hasError, setHasError] = React.useState(false)

  if (hasError) {
    return <span className='text-xs leading-none shrink-0 select-none'>{fallback}</span>
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt=''
      onError={() => setHasError(true)}
      className='w-4 h-2.5 object-cover rounded-none shrink-0 select-none'
      loading='lazy'
    />
  )
}

function InfiniteLanguagesGrid() {
  const allRows = [...LANGUAGE_ROWS, ...LANGUAGE_ROWS]

  return (
    <div
      className='absolute inset-0 w-full h-full overflow-hidden select-none'
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      <div className='absolute inset-x-0 -top-16 flex justify-center pointer-events-none'>
        <motion.div
          animate={{ y: ['0%', '-50%'] }}
          transition={{
            duration: 24,
            ease: 'linear',
            repeat: Infinity,
          }}
          className='flex flex-col rotate-[-6deg] scale-110 sm:scale-115 border-t border-l border-border/30'
        >
          {allRows.map((row, rowIdx) => (
            <div key={rowIdx} className='flex'>
              {row.map((lang, colIdx) => (
                <div
                  key={colIdx}
                  className='w-28 sm:w-32 h-8 px-2 flex items-center justify-center gap-2 border-b border-r border-border/30 bg-transparent rounded-none whitespace-nowrap shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_3px_rgba(255,255,255,0.05)]'
                >
                  <FlagImage code={lang.code} fallback={lang.flag} />
                  <span className='text-xs font-medium text-foreground tracking-tight'>
                    {lang.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function PlatformIcon({
  platform,
  className = 'size-3.5',
}: {
  platform: Platform
  className?: string
}) {
  if (platform === 'youtube') {
    return (
      <svg viewBox='0 0 24 24' fill='currentColor' className={className}>
        <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
      </svg>
    )
  }
  if (platform === 'x') {
    return (
      <svg viewBox='0 0 24 24' fill='currentColor' className={className}>
        <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
      </svg>
    )
  }
  if (platform === 'instagram') {
    return (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className={className}>
        <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
        <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
        <line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
      </svg>
    )
  }
  if (platform === 'tiktok') {
    return (
      <svg viewBox='0 0 24 24' fill='currentColor' className={className}>
        <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.28 6.28 0 0 0 1.88-4.48V8.77a8.28 8.28 0 0 0 4.89 1.58V6.9a4.82 4.82 0 0 1-1-.21z' />
      </svg>
    )
  }
  return null
}

function AnimatedTestimonials() {
  const [activeIndex, setActiveIndex] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [])

  const current = TESTIMONIALS[activeIndex]

  return (
    <div className='mt-6 pt-5 border-t border-border/60'>
      {/* Interactive Avatar Row: Active Avatar Scales Up Smoothly without Dark Rings */}
      <div className='flex items-center -space-x-1.5 mb-3.5'>
        {TESTIMONIALS.map((t, i) => {
          const isActive = i === activeIndex
          return (
            <motion.button
              key={i}
              type='button'
              onClick={() => setActiveIndex(i)}
              animate={{
                scale: isActive ? 1.2 : 0.88,
                opacity: isActive ? 1 : 0.42,
                zIndex: isActive ? 20 : 10 - i,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className={`relative rounded-full ring-2 ring-card cursor-pointer select-none focus:outline-none transition-opacity ${
                isActive ? '' : 'hover:opacity-75'
              }`}
            >
              <img
                src={t.avatar}
                alt={t.author}
                className='size-8 sm:size-8.5 rounded-full object-cover block shadow-xs'
              />
            </motion.button>
          )
        })}
      </div>

      {/* Smoothly Transitioning Quote & Author Link */}
      <div className='min-h-[90px] sm:min-h-[96px] flex flex-col justify-between'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <p className='text-sm text-foreground/85 leading-relaxed italic'>
              &ldquo;{current.quote}&rdquo;
            </p>
            <a
              href={current.url}
              target='_blank'
              rel='noopener noreferrer'
              className='group/creator inline-flex items-center gap-1.5 mt-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors'
            >
              <span className='size-3.5 shrink-0 flex items-center justify-center text-muted-foreground/80 group-hover/creator:text-foreground transition-colors'>
                <PlatformIcon platform={current.platform} />
              </span>
              <span className='font-medium text-foreground group-hover/creator:underline'>
                {current.author}
              </span>
              <span className='text-muted-foreground/40'>&bull;</span>
              <span>{current.audience}</span>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function Stats() {
  return (
    <section className='w-full max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 md:pt-28 pb-16 sm:pb-24'>
      {/* Section Header */}
      <div className='text-center max-w-xl mx-auto mb-8 sm:mb-10'>
        <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-foreground'>
          Built for modern creators
        </h2>
      </div>

      {/* Bento Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch'>
        {/* Card 1 (Left): Creator Studio Background with Voice Library Overlay */}
        <div className='relative rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[350px] flex flex-col justify-end p-4 sm:p-5 bg-muted shadow-xs group'>
          {/* Background Image Placeholder */}
          <img
            src={PLACEHOLDER_IMAGE}
            alt='Creator Studio'
            className='absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105'
          />
          {/* Subtle gradient overlay to keep card legible */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none' />

          {/* Bottom Overlay Card */}
          <div className='relative z-10 rounded-2xl bg-background/95 backdrop-blur-md p-5 shadow-xs border border-border/50'>
            <span className='text-4xl sm:text-5xl font-bold tracking-tight text-foreground block'>
              120+
            </span>
            <span className='text-sm font-semibold text-foreground mt-1.5 block'>
              AI Voices & Personas
            </span>
            <p className='mt-1.5 text-sm text-muted-foreground leading-relaxed'>
              Hyper-realistic accents, emotional tones, and narration styles built for creators and storytellers.
            </p>
          </div>
        </div>

        {/* Card 2 (Middle): 99.8% First, Then Text & Creator Testimonial */}
        <div className='rounded-3xl border border-border/80 bg-card p-5 sm:p-6 flex flex-col justify-between shadow-xs'>
          <div>
            <span className='text-4xl sm:text-5xl font-bold tracking-tight text-foreground block'>
              99.8%
            </span>
            <span className='text-sm font-semibold text-foreground mt-1.5 block'>
              Speech Accuracy & Naturalness
            </span>
            <p className='mt-1.5 text-sm text-muted-foreground leading-relaxed'>
              Evaluated by audio engineers against professional studio voice talent.
            </p>
          </div>

          {/* Animated Testimonials Carousel */}
          <AnimatedTestimonials />
        </div>

        {/* Card 3 (Right): 25M+ First, Then Monthly Audio Generated + Supported Languages */}
        <div className='flex flex-col gap-4 md:col-span-2 lg:col-span-1'>
          {/* Top: 25M+ First, then Monthly Audio Generated + Streaming Real-time Plot */}
          <div className='flex-1 rounded-3xl bg-card border border-border/80 p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-xs'>
            <div>
              <span className='text-4xl sm:text-5xl font-bold tracking-tight text-foreground block'>
                25M+
              </span>
              <span className='text-sm font-semibold text-foreground mt-1.5 block'>
                Monthly Audio Generated
              </span>
            </div>

            {/* Real-time Streaming Graph: point generates at tip, scrolls leftward out of frame */}
            <div className='mt-2 -mx-4 -mb-5 sm:-mx-5 sm:-mb-6 overflow-hidden'>
              <StreamingGraph />
            </div>
          </div>

          {/* Bottom: Full-Card Animated Languages Grid with Top-Right Faded Stat */}
          <div className='relative h-[135px] sm:h-[145px] rounded-3xl bg-card border border-border/80 overflow-hidden shadow-xs shrink-0'>
            {/* Full-Card Tilted Infinite Languages Marquee */}
            <InfiniteLanguagesGrid />

            {/* Top Right: 50+ Languages with Soft Corner Fade */}
            <div className='absolute top-0 right-0 z-10 pt-3.5 pr-4 pl-10 pb-6 sm:pt-4 sm:pr-5 sm:pl-12 sm:pb-7 bg-gradient-to-bl from-card from-35% via-card/90 via-65% to-transparent text-right pointer-events-none'>
              <span className='text-3xl sm:text-4xl font-bold tracking-tight text-foreground block leading-none'>
                50+
              </span>
              <span className='text-xs sm:text-sm font-semibold text-foreground mt-1 block leading-tight'>
                Languages
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
