'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { Button } from '../ui/button'
import { Orb } from '../ui/orb'
import { cn } from '@/lib/utils'

type Voice = {
  id: string
  name: string
  persona: string
  seed: number
  colors: [string, string]
  audio: string
  quote?: string
}

const VOICES: Voice[] = [
  {
    id: 'apollo',
    name: 'Apollo',
    persona: 'Cinematic',
    seed: 12,
    colors: ['#F9A8D4', '#8B5CF6'],
    audio: '/voices/apollo-cinematic.mp3',
    quote: 'In a world of endless noise, one voice rises above them all.',
  },
  {
    id: 'abigail',
    name: 'Abigail',
    persona: 'Storyteller',
    seed: 121,
    colors: ['#A8825F', '#3B2A24'],
    audio: '/voices/abigail-storyteller.mp3',
    quote: 'Once upon a quiet evening, the story finally began to tell itself.',
  },
  {
    id: 'ben',
    name: 'Ben',
    persona: 'Sportscaster',
    seed: 47,
    colors: ['#FDBA74', '#EA580C'],
    audio: '/voices/ben-sportscaster.mp3',
    quote: 'And there it is - an unbelievable finish in the final seconds!',
  },
  {
    id: 'audrey',
    name: 'Audrey',
    persona: 'Expressive',
    seed: 203,
    colors: ['#7DD3FC', '#2563EB'],
    audio: '/voices/audrey-expressive.mp3',
    quote: "I can't believe it. After everything, we actually made it here.",
  },
  {
    id: 'aaron',
    name: 'Aaron',
    persona: 'Explainer',
    seed: 88,
    colors: ['#86EFAC', '#15803D'],
    audio: '/voices/aaron-explainer.mp3',
    quote: "Let's break this down step by step so it's easy to follow along.",
  },
  {
    id: 'athena',
    name: 'Athena',
    persona: 'Powerful',
    seed: 777,
    colors: ['#F0ABFC', '#C026D3'],
    audio: '/voices/athena-powerful.mp3',
    quote: 'We do not wait for the moment. We become the moment.',
  },
  {
    id: 'bruce',
    name: 'Bruce',
    persona: 'Motivational',
    seed: 440,
    colors: ['#5EEAD4', '#0F766E'],
    audio: '/voices/bruce-motivational.mp3',
    quote: 'Every great journey starts the second you decide not to quit.',
  },
  {
    id: 'annie',
    name: 'Annie',
    persona: 'Conversational',
    seed: 314,
    colors: ['#FDE68A', '#D97706'],
    audio: '/voices/annie-conversational.mp3',
    quote: "Hey! So glad you're here - let me walk you through how this works.",
  },
]

const COUNT = VOICES.length
const SLOT = 256
const SPRING = { type: 'spring' as const, stiffness: 220, damping: 30, mass: 1 }

const wrap = (value: number) => ((((value + COUNT / 2) % COUNT) + COUNT) % COUNT) - COUNT / 2

type SlideProps = {
  voice: Voice
  index: number
  position: MotionValue<number>
  active: boolean
  playing: boolean
  slot: number
  isMobile: boolean
  onSelect: () => void
  isDragging: () => boolean
}

function Slide({ voice, index, position, active, playing, slot, isMobile, onSelect, isDragging }: SlideProps) {
  const rel = useTransform(position, (p) => wrap(index - p))
  const dist = useTransform(rel, (r) => Math.abs(r))
  const x = useTransform(rel, (r) => r * slot)
  const size = useTransform(
    dist,
    [0, 1, 2, 3],
    isMobile ? [140, 100, 70, 50] : [180, 135, 95, 65]
  )
  const opacity = useTransform(dist, [2, 3], [1, 0])
  const labelOpacity = useTransform(dist, [0, 1], [1, 0.5])
  const accessoryOpacity = useTransform(dist, [0, 0.5], [1, 0])
  const playScale = useTransform(dist, [0, 0.5], [1, 0.6])
  const zIndex = useTransform(dist, (d) => Math.round(10 - d))

  const [near, setNear] = useState(() => dist.get() < 3)
  useMotionValueEvent(dist, 'change', (v) => setNear(v < 3))

  const [hovered, setHovered] = useState(false)
  const hoverValue = useMotionValue(0)

  useEffect(() => {
    const controls = animate(hoverValue, hovered ? 1 : 0, { duration: 0.18 })
    return () => controls.stop()
  }, [hovered, hoverValue])

  const effectiveOpacity = useTransform([accessoryOpacity, hoverValue], ([acc, hov]) =>
    Math.max(acc as number, hov as number)
  )

  const effectiveScale = useTransform([playScale, hoverValue], ([ps, hov]) => {
    const base = ps as number
    const h = hov as number
    return base + (0.85 - base) * h
  })

  return (
    <motion.div
      className='absolute top-0 left-1/2 flex w-0 flex-col items-center pt-2 sm:pt-3'
      style={{ x, opacity, zIndex }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className='flex h-36 sm:h-48 items-center justify-center'>
        <motion.button
          type='button'
          aria-label={active ? `${playing ? 'Pause' : 'Play'} ${voice.name} demo` : `Select ${voice.name}`}
          onClick={() => {
            if (isDragging()) return
            onSelect()
          }}
          className='relative shrink-0 cursor-pointer overflow-hidden rounded-full outline-none focus-visible:ring-2 focus-visible:ring-foreground/30'
          style={{ width: size, height: size }}
        >
          {near && (
            <Orb
              className='size-full'
              colors={voice.colors}
              seed={voice.seed}
              resizeDebounce={0}
              agentState={active && playing ? 'talking' : null}
            />
          )}

          <motion.span
            className='pointer-events-none absolute inset-0 flex items-center justify-center'
            style={{ opacity: effectiveOpacity }}
          >
            <motion.span
              className='flex size-10 sm:size-12 items-center justify-center rounded-full bg-white shadow-lg'
              style={{ scale: effectiveScale }}
            >
              {active && playing ? (
                <Pause className='size-3.5 sm:size-4 fill-black text-black' />
              ) : (
                <Play className='size-3.5 sm:size-4 translate-x-0.5 fill-black text-black' />
              )}
            </motion.span>
          </motion.span>
        </motion.button>
      </div>

      <motion.div
        className='relative mt-2 sm:mt-2.5 flex flex-col items-center text-center whitespace-nowrap'
        style={{ opacity: labelOpacity }}
      >
        <span className='relative flex items-center justify-center font-medium text-foreground text-sm sm:text-base'>
          {voice.name}
          <motion.span
            className='absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2'
            style={{ opacity: accessoryOpacity }}
          >
            <ArrowUpRight className='size-3 sm:size-3.5' />
          </motion.span>
        </span>
        <span className='text-[11px] sm:text-xs text-muted-foreground'>{voice.persona}</span>
      </motion.div>
    </motion.div>
  )
}

function TTSDemo() {
  const [target, setTarget] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const position = useMotionValue(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const controlsRef = useRef<{ stop: () => void } | null>(null)
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef<{ x: number; pos: number; time: number } | null>(null)
  const lastWheelTime = useRef(0)
  const wheelAccumulator = useRef(0)

  const activeIndex = ((target % COUNT) + COUNT) % COUNT
  const slot = isMobile ? 140 : 200

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('resize', updateSize)
      audioRef.current?.pause()
    }
  }, [])

  useEffect(() => {
    controlsRef.current?.stop()
    controlsRef.current = animate(position, target, SPRING)
    return () => controlsRef.current?.stop()
  }, [target, position])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    el.pause()
    el.currentTime = 0
    setPlaying(false)
  }, [activeIndex])

  const togglePlay = () => {
    const el = audioRef.current
    if (!el) return
    if (playing) {
      el.pause()
      setPlaying(false)
    } else {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    }
  }

  const handleSelect = (index: number) => {
    const delta = wrap(index - activeIndex)
    if (delta === 0) togglePlay()
    else setTarget((t) => t + delta)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    controlsRef.current?.stop()
    dragStartRef.current = {
      x: e.clientX,
      pos: position.get(),
      time: Date.now(),
    }
    isDraggingRef.current = false
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragStartRef.current) return
    const dx = e.clientX - dragStartRef.current.x
    if (Math.abs(dx) > 6) {
      isDraggingRef.current = true
    }
    if (isDraggingRef.current) {
      position.set(dragStartRef.current.pos - dx / slot)
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragStartRef.current) return
    const dx = e.clientX - dragStartRef.current.x
    const dt = Date.now() - dragStartRef.current.time
    const wasDragging = isDraggingRef.current

    if (wasDragging) {
      const velocity = dt > 0 ? dx / dt : 0
      let snapPos = position.get()
      if (Math.abs(velocity) > 0.35) {
        snapPos -= Math.sign(velocity) * 0.4
      }
      const nextTarget = Math.round(snapPos)
      if (nextTarget === target) {
        controlsRef.current?.stop()
        controlsRef.current = animate(position, target, SPRING)
      } else {
        setTarget(nextTarget)
      }
    }

    dragStartRef.current = null
    setTimeout(() => {
      isDraggingRef.current = false
    }, 60)
  }

  const handlePointerCancel = () => {
    if (dragStartRef.current && isDraggingRef.current) {
      const snapTarget = Math.round(position.get())
      if (snapTarget === target) {
        controlsRef.current?.stop()
        controlsRef.current = animate(position, target, SPRING)
      } else {
        setTarget(snapTarget)
      }
    }
    dragStartRef.current = null
    isDraggingRef.current = false
  }

  const handleWheel = (e: React.WheelEvent) => {
    let delta = 0

    if (e.shiftKey) {
      // Shift + scroll is the standard keyboard modifier for horizontal scrolling
      delta = e.deltaX !== 0 ? e.deltaX : e.deltaY
    } else if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      // Native horizontal trackpad swipe or horizontal scroll wheel
      delta = e.deltaX
    } else {
      // Normal vertical page scroll - do not intercept
      return
    }

    if (Math.abs(delta) < 4) return

    wheelAccumulator.current += delta

    const now = Date.now()
    if (now - lastWheelTime.current < 200) {
      return
    }

    if (Math.abs(wheelAccumulator.current) > 15) {
      lastWheelTime.current = now
      const dir = wheelAccumulator.current > 0 ? 1 : -1
      wheelAccumulator.current = 0
      setTarget((t) => t + dir)
    }
  }

  return (
    <div className='relative mx-auto w-full max-w-4xl px-2 sm:px-4'>
      <audio
        ref={audioRef}
        src={VOICES[activeIndex].audio}
        onEnded={() => setPlaying(false)}
        preload='none'
      />

      {/* Navigation Arrows centered to the row of orbs */}
      <div className='pointer-events-none absolute inset-x-1 sm:inset-x-2 top-2 sm:top-3 h-36 sm:h-48 flex items-center justify-between z-20'>
        <div className='pointer-events-auto'>
          <Button
            variant='outline'
            size={isMobile ? 'icon-sm' : 'icon-lg'}
            className='rounded-full shadow-md bg-background/90 backdrop-blur-sm'
            onClick={() => setTarget((t) => t - 1)}
            aria-label='Previous voice'
          >
            <ChevronLeft className='size-4 sm:size-5' />
          </Button>
        </div>

        <div className='pointer-events-auto'>
          <Button
            variant='outline'
            size={isMobile ? 'icon-sm' : 'icon-lg'}
            className='rounded-full shadow-md bg-background/90 backdrop-blur-sm'
            onClick={() => setTarget((t) => t + 1)}
            aria-label='Next voice'
          >
            <ChevronRight className='size-4 sm:size-5' />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div
        className='relative h-60 sm:h-70 w-full overflow-hidden cursor-grab active:cursor-grabbing select-none touch-pan-y'
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onWheel={handleWheel}
      >
        {VOICES.map((voice, index) => (
          <Slide
            key={voice.id}
            voice={voice}
            index={index}
            position={position}
            active={index === activeIndex}
            playing={playing}
            slot={slot}
            isMobile={isMobile}
            onSelect={() => handleSelect(index)}
            isDragging={() => isDraggingRef.current}
          />
        ))}
      </div>
    </div>
  )
}

function VoiceCloneDemo() {
  const [playingClone, setPlayingClone] = useState(false)
  const [playingOriginal, setPlayingOriginal] = useState(false)
  const cloneAudioRef = useRef<HTMLAudioElement | null>(null)
  const originalAudioRef = useRef<HTMLAudioElement | null>(null)

  const sampleAudio = '/voices/bruce-motivational.mp3'

  useEffect(() => {
    return () => {
      cloneAudioRef.current?.pause()
      originalAudioRef.current?.pause()
    }
  }, [])

  const toggleClone = () => {
    const clone = cloneAudioRef.current
    const orig = originalAudioRef.current
    if (!clone) return

    if (playingClone) {
      clone.pause()
      setPlayingClone(false)
    } else {
      if (orig) {
        orig.pause()
        orig.currentTime = 0
        setPlayingOriginal(false)
      }
      clone
        .play()
        .then(() => setPlayingClone(true))
        .catch(() => setPlayingClone(false))
    }
  }

  const toggleOriginal = () => {
    const clone = cloneAudioRef.current
    const orig = originalAudioRef.current
    if (!orig) return

    if (playingOriginal) {
      orig.pause()
      setPlayingOriginal(false)
    } else {
      if (clone) {
        clone.pause()
        clone.currentTime = 0
        setPlayingClone(false)
      }
      orig
        .play()
        .then(() => setPlayingOriginal(true))
        .catch(() => setPlayingOriginal(false))
    }
  }

  return (
    <div className='relative mx-auto w-full max-w-2xl px-3 sm:px-4'>
      <audio
        ref={cloneAudioRef}
        src={sampleAudio}
        onEnded={() => setPlayingClone(false)}
        preload='none'
      />
      <audio
        ref={originalAudioRef}
        src={sampleAudio}
        onEnded={() => setPlayingOriginal(false)}
        preload='none'
      />

      <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-2xl px-4'>
        {/* Left Card: Input */}
        <div className='flex flex-col justify-between rounded-2xl border border-border bg-card p-5 w-full sm:w-72 h-60 sm:h-64'>
          <div className='flex items-center justify-start'>
            <span className='inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-muted text-muted-foreground'>
              Input
            </span>
          </div>

          <textarea
            readOnly
            value='Every great journey starts the second you decide not to quit.'
            className='w-full resize-none rounded-xl border border-border/80 bg-muted/30 p-3 text-xs sm:text-sm text-foreground/90 leading-relaxed focus:outline-none cursor-default my-auto h-24 select-none'
          />

          <div>
            <Button
              variant='outline'
              size='sm'
              onClick={toggleOriginal}
              className='rounded-full px-3.5 h-8 text-xs text-muted-foreground hover:text-foreground gap-1.5 w-fit cursor-pointer'
            >
              {playingOriginal ? (
                <Pause className='size-3 fill-current' />
              ) : (
                <Play className='size-3 fill-current translate-x-0.5' />
              )}
              <span>Original audio</span>
            </Button>
          </div>
        </div>

        {/* Right Card: Output */}
        <div className='flex flex-col justify-between rounded-2xl border border-border bg-card p-5 w-full sm:w-72 h-60 sm:h-64'>
          <div className='flex items-center justify-start'>
            <span className='inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-muted text-muted-foreground'>
              Output
            </span>
          </div>

          <div className='flex items-center justify-center my-auto'>
            <button
              type='button'
              onClick={toggleClone}
              aria-label={playingClone ? 'Pause cloned voice' : 'Play cloned voice'}
              className='relative shrink-0 cursor-pointer overflow-hidden rounded-full outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 size-32 sm:size-36 transition-transform active:scale-95'
            >
              <Orb
                className='size-full'
                colors={['#5EEAD4', '#0F766E']}
                seed={440}
                resizeDebounce={0}
                agentState={playingClone ? 'talking' : null}
              />

              <span className='pointer-events-none absolute inset-0 flex items-center justify-center'>
                <span className='flex size-10 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-105'>
                  {playingClone ? (
                    <Pause className='size-3.5 fill-black text-black' />
                  ) : (
                    <Play className='size-3.5 translate-x-0.5 fill-black text-black' />
                  )}
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'tts' | 'clone'>('tts')

  return (
    <div className='flex flex-col items-center justify-center pt-8 sm:pt-14 md:pt-18 pb-12 sm:pb-16 md:pb-20'>
      <h1 className='text-balance px-4 text-center font-crimson-pro text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.15] sm:leading-[1.1] tracking-tight max-w-3xl'>
        The best All-in-one content creation platform.
      </h1>
      <p className='mt-3.5 sm:mt-4 text-balance max-w-md sm:max-w-lg px-5 text-center text-sm sm:text-base text-muted-foreground leading-relaxed'>
        A platform to access all the required tools for content creation<span className='sm:hidden'>.</span>
        <span className='hidden sm:inline'> in one place, for a fraction of the price.</span>
      </p>

      <div className='mt-6 sm:mt-7'>
        <Link href='#pricing'>
          <Button className='h-12 rounded-full px-5 text-sm sm:text-base font-medium shadow-xs transition-all'>
            Get started
          </Button>
        </Link>
      </div>

      {/* Demo Section */}
      <div className='mt-8 sm:mt-10 w-full flex flex-col items-center'>
        {/* Tab Content */}
        <div className='w-full'>
          <AnimatePresence mode='wait'>
            {activeTab === 'tts' ? (
              <motion.div
                key='tts'
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className='w-full'
              >
                <TTSDemo />
              </motion.div>
            ) : (
              <motion.div
                key='clone'
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className='w-full'
              >
                <VoiceCloneDemo />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Demo Mode Switcher - Centered below the demo, well-proportioned */}
        <div className='mt-6 sm:mt-8 flex items-center justify-center'>
          <div className='inline-flex items-center p-1 rounded-full border border-border bg-muted/40 backdrop-blur-xs'>
            <button
              type='button'
              onClick={() => setActiveTab('tts')}
              className={cn(
                'relative h-8 sm:h-8.5 px-4 text-xs sm:text-sm font-medium rounded-full transition-colors cursor-pointer outline-none flex items-center justify-center',
                activeTab === 'tts'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {activeTab === 'tts' && (
                <motion.div
                  layoutId='activeDemoTab'
                  className='absolute inset-0 rounded-full bg-background shadow-xs border border-border/80'
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                />
              )}
              <span className='relative z-10'>
                Text to Speech
              </span>
            </button>

            <button
              type='button'
              onClick={() => setActiveTab('clone')}
              className={cn(
                'relative h-8 sm:h-8.5 px-4 text-xs sm:text-sm font-medium rounded-full transition-colors cursor-pointer outline-none flex items-center justify-center',
                activeTab === 'clone'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {activeTab === 'clone' && (
                <motion.div
                  layoutId='activeDemoTab'
                  className='absolute inset-0 rounded-full bg-background shadow-xs border border-border/80'
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                />
              )}
              <span className='relative z-10'>
                Voice Clone
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}