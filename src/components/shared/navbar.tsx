'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '../ui/button'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border bg-background'>
      <nav className='mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 md:px-12'>
        {/* Brand Logo */}
        <Link href="/" className='flex items-center gap-2.5 shrink-0'>
          <Image
            height={24}
            width={24}
            src="/logo.svg"
            alt="Logo"
            className='size-6'
          />
          <span className='font-bold text-lg tracking-wider uppercase'>Astra</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className='hidden md:flex items-center justify-center gap-8 text-sm font-medium [&>a]:text-muted-foreground [&>a]:hover:text-foreground [&>a]:transition-colors'>
          <Link href="#">How it works</Link>
          <Link href="#">All tools</Link>
          <Link href="#">Pricing</Link>
        </div>

        {/* Desktop Action Buttons */}
        <div className='hidden sm:flex items-center gap-2'>
          <Button className="h-10 rounded-full px-3.5 text-sm font-medium" variant="ghost">
            Log in
          </Button>
          <Button className="h-10 rounded-full px-4 text-sm font-medium">
            Get started
          </Button>
        </div>

        {/* Custom Modern Animated Hamburger Button (2 lines: 1 big, 1 small -> equal cross) */}
        <div className='flex sm:hidden items-center'>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="relative flex size-10 items-center justify-center rounded-full text-foreground hover:bg-muted transition-colors outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative flex size-5 items-center justify-center">
              {/* Top Line (longer line: 20px -> rotates 45deg to 18px cross arm) */}
              <motion.span
                className="absolute h-0.5 rounded-full bg-foreground"
                animate={
                  mobileMenuOpen
                    ? { rotate: 45, y: 0, width: 18, x: 0 }
                    : { rotate: 0, y: -3.5, width: 20, x: 0 }
                }
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Bottom Line (shorter line: 13px right-aligned -> rotates -45deg to 18px cross arm) */}
              <motion.span
                className="absolute h-0.5 rounded-full bg-foreground"
                animate={
                  mobileMenuOpen
                    ? { rotate: -45, y: 0, width: 18, x: 0 }
                    : { rotate: 0, y: 3.5, width: 13, x: 3.5 }
                }
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Floating Solid Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 z-40 bg-black/50 sm:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Completely Opaque Dropdown Drawer */}
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 z-50 border-b border-border bg-background px-6 py-6 shadow-2xl sm:hidden"
            >
              <div className="flex flex-col space-y-3.5 text-base font-medium">
                <Link
                  href="#"
                  className="py-1 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How it works
                </Link>
                <Link
                  href="#"
                  className="py-1 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All tools
                </Link>
                <Link
                  href="#"
                  className="py-1 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
              </div>

              {/* Proportional Action Buttons (side-by-side, h-11, not thin & long) */}
              <div className="mt-6 pt-5 border-t border-border grid grid-cols-2 gap-3">
                <Button
                  className="h-11 rounded-full text-sm font-medium w-full"
                  variant="outline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Button>
                <Button
                  className="h-11 rounded-full text-sm font-medium w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get started
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
