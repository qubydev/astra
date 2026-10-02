'use client'

import React from 'react'

export default function Stats() {
  return (
    <section className='w-full max-w-4xl mx-auto px-4 py-8 sm:py-14'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6'>
        {/* Card 1: Users */}
        <div className='flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-6'>
          <span className='text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground tabular-nums'>
            100K+
          </span>
          <span className='mt-1.5 text-xs sm:text-sm text-muted-foreground'>
            Users
          </span>
        </div>

        {/* Card 2: Generations */}
        <div className='flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-6'>
          <span className='text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground tabular-nums'>
            25M+
          </span>
          <span className='mt-1.5 text-xs sm:text-sm text-muted-foreground'>
            Generations
          </span>
        </div>

        {/* Card 3: Online */}
        <div className='flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-6'>
          <span className='text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground tabular-nums'>
            1,420
          </span>
          <span className='mt-1.5 text-xs sm:text-sm text-muted-foreground'>
            Online
          </span>
        </div>
      </div>
    </section>
  )
}
