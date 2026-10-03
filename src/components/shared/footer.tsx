'use client'

import React from 'react'
import Link from 'next/link'

function SocialPill({
  icon,
  handle,
  href,
}: {
  icon: React.ReactNode
  handle: string
  href: string
}) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 dark:bg-card border border-border/80 text-xs font-medium text-foreground hover:border-foreground/50 transition-colors shadow-2xs'
    >
      <span className='size-3.5 flex items-center justify-center shrink-0 text-foreground'>
        {icon}
      </span>
      <span>{handle}</span>
    </a>
  )
}

export default function Footer() {
  return (
    <footer className='w-full pt-16 sm:pt-24 pb-0 overflow-hidden'>
      {/* Content Container - No card styling, no card border, clean page layout */}
      <div className='max-w-6xl mx-auto px-5 sm:px-8'>
        {/* Top Header: Tagline on Left, Contact Pill on Right */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 sm:pb-16 border-b border-border/60'>
          <h2 className='font-[family-name:var(--font-crimson-pro)] text-2xl sm:text-3xl md:text-4xl text-foreground font-normal tracking-tight max-w-sm leading-snug'>
            Your AI voice &amp; audio production partner
          </h2>

          <a
            href='mailto:hello@astra.ai'
            className='inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-3.5 rounded-full border border-foreground/30 text-base sm:text-lg font-medium text-foreground hover:bg-foreground hover:text-background transition-all shadow-xs'
          >
            Contact
          </a>
        </div>

        {/* Middle Navigation Grid: 3 Columns */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 py-12 sm:py-16'>
          {/* Col 1: Product */}
          <div>
            <span className='font-[family-name:var(--font-crimson-pro)] text-base sm:text-lg font-medium text-foreground block mb-4'>
              Product
            </span>
            <ul className='space-y-2.5 text-xs sm:text-sm text-muted-foreground'>
              <li>
                <Link href='#' className='hover:text-foreground transition-colors'>
                  Voice Cloning
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-foreground transition-colors'>
                  Text to Speech
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-foreground transition-colors'>
                  Audio Localization
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-foreground transition-colors'>
                  Voice Personas
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-foreground transition-colors'>
                  Streaming API
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Explore */}
          <div>
            <span className='font-[family-name:var(--font-crimson-pro)] text-base sm:text-lg font-medium text-foreground block mb-4'>
              Explore
            </span>
            <ul className='space-y-2.5 text-xs sm:text-sm text-muted-foreground'>
              <li>
                <Link href='#features' className='hover:text-foreground transition-colors'>
                  All Voices
                </Link>
              </li>
              <li>
                <Link href='#pricing' className='hover:text-foreground transition-colors'>
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-foreground transition-colors'>
                  Documentation
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-foreground transition-colors'>
                  Changelog
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-foreground transition-colors'>
                  System Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Say hello! Social Chips */}
          <div>
            <span className='font-[family-name:var(--font-crimson-pro)] text-base sm:text-lg font-medium text-foreground block mb-4'>
              Say hello!
            </span>
            <div className='flex flex-wrap gap-2 max-w-xs'>
              {/* X / Twitter */}
              <SocialPill
                href='https://x.com'
                handle='@astravocal'
                icon={
                  <svg viewBox='0 0 24 24' fill='currentColor' className='size-3.5'>
                    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                  </svg>
                }
              />

              {/* Instagram */}
              <SocialPill
                href='https://instagram.com'
                handle='@astravocal'
                icon={
                  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='size-3.5'>
                    <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
                    <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
                    <line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
                  </svg>
                }
              />

              {/* YouTube */}
              <SocialPill
                href='https://youtube.com'
                handle='@astravocal'
                icon={
                  <svg viewBox='0 0 24 24' fill='currentColor' className='size-3.5'>
                    <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
                  </svg>
                }
              />

              {/* GitHub */}
              <SocialPill
                href='https://github.com'
                handle='@astravocal'
                icon={
                  <svg viewBox='0 0 24 24' fill='currentColor' className='size-3.5'>
                    <path fillRule='evenodd' clipRule='evenodd' d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' />
                  </svg>
                }
              />
            </div>
          </div>
        </div>

        {/* Copyright & Legal Bar - Positioned ABOVE the bottom bleed */}
        <div className='pt-8 pb-10 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-3'>
          <span>&copy; {new Date().getFullYear()} Astra AI Inc. All rights reserved.</span>
          <div className='flex items-center gap-6'>
            <Link href='#' className='hover:text-foreground transition-colors'>
              Privacy Policy
            </Link>
            <Link href='#' className='hover:text-foreground transition-colors'>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom-Most Section: ONLY the giant Logo & ASTRA, fading directly on the glyphs themselves (no smoky overlay) */}
      <div className='w-full overflow-hidden select-none pointer-events-none flex items-center justify-center gap-2 sm:gap-6 md:gap-10 pt-4 pb-0 -mb-3 sm:-mb-6 md:-mb-8'>
        <svg
          viewBox='0 0 512 512'
          className='size-[16vw] sm:size-[14vw] md:size-[15vw] text-foreground shrink-0 self-center'
        >
          <defs>
            <linearGradient id='footer-logo-gradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='currentColor' stopOpacity='1' />
              <stop offset='28%' stopColor='currentColor' stopOpacity='1' />
              <stop offset='65%' stopColor='currentColor' stopOpacity='0.45' />
              <stop offset='95%' stopColor='currentColor' stopOpacity='0' />
            </linearGradient>
          </defs>
          <path
            d='M260 486h216.379c3.559 0 5.345-4.298 2.836-6.821l-189.84-190.841c-18.138-18.167-47.886-32.701-76.183-32.701H30a4 4 0 0 0-4 4v216.801c0 3.55 4.28 5.341 6.809 2.848l180.383-177.867c12.335-12.354 42.808-1.454 42.808 17.44V482a4 4 0 0 0 4 4m-8-460H35.621c-3.559 0-5.346 4.298-2.836 6.821l189.84 190.841c18.138 18.167 47.886 32.701 76.183 32.701H482a4 4 0 0 0 4-4V35.562c0-3.55-4.281-5.341-6.808-2.848L298.808 210.58C286.473 222.935 256 212.035 256 193.141V30a4 4 0 0 0-4-4'
            fill='url(#footer-logo-gradient)'
          />
        </svg>

        <h1 className='text-[24vw] sm:text-[20vw] md:text-[21vw] font-black tracking-tighter leading-[0.72] uppercase whitespace-nowrap bg-gradient-to-b from-foreground from-28% via-foreground/45 via-65% to-transparent bg-clip-text text-transparent'>
          ASTRA
        </h1>
      </div>
    </footer>
  )
}
