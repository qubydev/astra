'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'

type BillingCycle = 'monthly' | 'yearly'

type Plan = {
  name: string
  monthlyPrice: number
  yearlyPrice: number
  description: string
  features: string[]
  isPopular?: boolean
}

const PLANS: Plan[] = [
  {
    name: 'Starter Plan',
    monthlyPrice: 20,
    yearlyPrice: 16,
    description: 'Perfect for Indie Creators, Podcasters, and Solo Producers',
    features: [
      '30+ studio-grade AI voices',
      '2 hours generated audio / month',
      'Instant 1-click voice cloning',
      'Real-time preview & timeline export',
      'Full commercial monetization rights',
    ],
  },
  {
    name: 'Creator Plan',
    monthlyPrice: 50,
    yearlyPrice: 40,
    description: 'Perfect for Growing Channels, Game Studios, and Content Teams',
    isPopular: true,
    features: [
      'Unlimited audio generations',
      'Full library of 120+ actor personas',
      '5 custom voice clones & emotion tuning',
      '50+ languages & localized voice dubbing',
      'Priority neural synthesis queue',
    ],
  },
  {
    name: 'Studio Plan',
    monthlyPrice: 100,
    yearlyPrice: 80,
    description: 'Perfect for Production Companies, Agencies, and Large Teams',
    features: [
      'Everything in Creator Plan',
      'Unlimited instant voice clones',
      'Ultra-low latency streaming API (sub-150ms)',
      'Collaborative team seats & shared library',
      'Dedicated account manager & 99.9% SLA',
    ],
  },
]

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const isYearly = billingCycle === 'yearly'

  return (
    <section id='pricing' className='w-full max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24'>
      {/* Header */}
      <div className='text-center max-w-xl mx-auto'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground'>
          Choose your plan
        </h2>

        {/* Billing Switcher */}
        <div className='flex justify-center mt-6 mb-12 sm:mb-16'>
          <div className='relative inline-flex items-center p-1 rounded-full bg-muted/60 border border-border/70 shadow-xs'>
            <button
              type='button'
              onClick={() => setBillingCycle('monthly')}
              className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors cursor-pointer select-none ${
                !isYearly ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {!isYearly && (
                <motion.div
                  layoutId='pricing-toggle'
                  className='absolute inset-0 bg-background rounded-full shadow-xs border border-border/50'
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className='relative z-10'>Pay monthly</span>
            </button>

            <button
              type='button'
              onClick={() => setBillingCycle('yearly')}
              className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors cursor-pointer select-none flex items-center gap-1.5 ${
                isYearly ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isYearly && (
                <motion.div
                  layoutId='pricing-toggle'
                  className='absolute inset-0 bg-background rounded-full shadow-xs border border-border/50'
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className='relative z-10'>Pay yearly</span>
              <span className='relative z-10 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full'>
                -20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Pricing Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch'>
        {PLANS.map((plan) => {
          const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice

          if (plan.isPopular) {
            // Middle Featured Dark Card
            return (
              <div
                key={plan.name}
                className='rounded-3xl bg-neutral-950 text-white border border-neutral-800 p-7 sm:p-8 flex flex-col justify-between shadow-xl'
              >
                <div>
                  <span className='text-base sm:text-lg font-medium text-neutral-300 tracking-tight block'>
                    {plan.name}
                  </span>

                  <div className='mt-3 flex items-baseline gap-1.5'>
                    <span className='text-4xl sm:text-5xl font-bold tracking-tight text-white'>
                      ${price}
                    </span>
                    <span className='text-sm sm:text-base text-neutral-400 font-normal'>
                      /month
                    </span>
                  </div>

                  <p className='text-xs sm:text-sm text-neutral-400 mt-3 mb-8 leading-relaxed min-h-[40px]'>
                    {plan.description}
                  </p>

                  <span className='text-xs sm:text-sm font-semibold text-white block mb-4'>
                    Features:
                  </span>

                  <ul className='space-y-3.5 text-xs sm:text-sm text-neutral-200'>
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className='flex items-center gap-3'>
                        <span className='size-4.5 rounded-full bg-white text-black flex items-center justify-center shrink-0'>
                          <Check className='size-2.5 stroke-[3]' />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type='button'
                  className='w-full py-3.5 px-4 rounded-xl sm:rounded-2xl bg-white text-black hover:bg-neutral-100 font-semibold text-sm transition-colors mt-8 cursor-pointer shadow-xs'
                >
                  Get Started
                </button>
              </div>
            )
          }

          // Left and Right Light Cards
          return (
            <div
              key={plan.name}
              className='rounded-3xl bg-card border border-border/80 p-7 sm:p-8 flex flex-col justify-between shadow-xs transition-colors hover:border-border'
            >
              <div>
                <span className='text-base sm:text-lg font-medium text-foreground tracking-tight block'>
                  {plan.name}
                </span>

                <div className='mt-3 flex items-baseline gap-1.5'>
                  <span className='text-4xl sm:text-5xl font-bold tracking-tight text-foreground'>
                    ${price}
                  </span>
                  <span className='text-sm sm:text-base text-muted-foreground font-normal'>
                    /month
                  </span>
                </div>

                <p className='text-xs sm:text-sm text-muted-foreground mt-3 mb-8 leading-relaxed min-h-[40px]'>
                  {plan.description}
                </p>

                <span className='text-xs sm:text-sm font-semibold text-foreground block mb-4'>
                  Features:
                </span>

                <ul className='space-y-3.5 text-xs sm:text-sm text-foreground/85'>
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className='flex items-center gap-3'>
                      <span className='size-4.5 rounded-full bg-foreground text-background flex items-center justify-center shrink-0'>
                        <Check className='size-2.5 stroke-[3]' />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type='button'
                className='w-full py-3.5 px-4 rounded-xl sm:rounded-2xl bg-foreground text-background hover:opacity-90 font-medium text-sm transition-opacity mt-8 cursor-pointer'
              >
                Get Started
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
