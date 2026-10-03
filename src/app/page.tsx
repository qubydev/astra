import React from 'react'
import Hero from '@/components/index/hero'
import Stats from '@/components/index/stats'
import FAQ from '@/components/index/faq'
import Pricing from '@/components/index/pricing'
import CTA from '@/components/index/cta'
import Footer from '@/components/shared/footer'

export default function Page() {
  return (
    <main>
      <Hero />
      <Stats />
      <FAQ />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}
