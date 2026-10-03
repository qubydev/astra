'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check } from 'lucide-react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubscribed(true)
    }
  }

  return (
    <section className='w-full max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24'>
      {/* Dark Architectural Banner */}
      <div className='relative rounded-3xl bg-[#0a0a0c] border border-white/10 p-8 sm:p-12 lg:p-16 overflow-hidden min-h-[380px] sm:min-h-[420px] flex flex-col justify-center'>
        {/* 3D Architectural Acoustic Slats (Lit in White instead of Green) */}
        <div className='absolute inset-y-0 right-0 w-full sm:w-3/5 lg:w-1/2 flex pointer-events-none select-none overflow-hidden [mask-image:linear-gradient(to_left,black_50%,transparent_100%)]'>
          {Array.from({ length: 9 }).map((_, i) => {
            const progress = (i + 1) / 9
            const opacity = Math.pow(progress, 1.6)
            return (
              <div
                key={i}
                className='flex-1 h-full relative'
                style={{
                  background: `linear-gradient(to right, rgba(255,255,255,${0.015 * opacity}), rgba(255,255,255,${0.11 * opacity}))`,
                  borderRight: `1.5px solid rgba(255,255,255,${0.35 * opacity})`,
                  boxShadow: `inset -2px 0 12px rgba(255,255,255,${0.08 * opacity})`,
                }}
              />
            )
          })}
        </div>

        {/* Ambient White Rim Glow on the right edge */}
        <div className='absolute -right-24 top-1/2 -translate-y-1/2 w-80 h-[480px] bg-white/[0.08] blur-3xl rounded-full pointer-events-none' />

        {/* Left Content Area */}
        <div className='relative z-10 max-w-2xl'>
          {/* Main Statement */}
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-400 leading-[1.18]'>
            Most creators don&apos;t treat{' '}
            <span className='text-white font-extrabold'>
              voice
            </span>{' '}
            like a feature, but we do
          </h2>

          <p className='mt-3.5 sm:mt-4 text-sm sm:text-base text-neutral-400 max-w-lg leading-relaxed'>
            Join 25,000+ creators receiving weekly audio tech breakdowns, release drops, and studio guides.
          </p>

          {/* Email Subscribe Capsule Form */}
          <div className='mt-8 sm:mt-10 max-w-md'>
            <AnimatePresence mode='wait'>
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className='inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-white'
                >
                  <span className='size-5 rounded-full bg-white text-black flex items-center justify-center shrink-0'>
                    <Check className='size-3 stroke-[3]' />
                  </span>
                  <span>You&apos;re subscribed! Thanks for joining.</span>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className='relative flex items-center rounded-full bg-white/[0.06] border border-white/15 p-1.5 pl-5 sm:pl-6 focus-within:border-white/40 focus-within:ring-2 focus-within:ring-white/10 transition-all backdrop-blur-md'
                >
                  <input
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    className='w-full bg-transparent text-sm text-white placeholder:text-neutral-500 focus:outline-none pr-3'
                  />
                  <button
                    type='submit'
                    className='shrink-0 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white text-black hover:bg-neutral-100 font-semibold text-xs sm:text-sm transition-colors cursor-pointer'
                  >
                    <span>Subscribe</span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
