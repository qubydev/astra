'use client'

import React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'

type FAQItem = {
  question: string
  answer: string
}

const FAQS: FAQItem[] = [
  {
    question: "What makes Astra's voice synthesis different from standard TTS?",
    answer:
      'Astra uses neural emotional prosody modeling to reproduce authentic human speech cadence, breathing, and pitch dynamics rather than flat, robotic pronunciation.',
  },
  {
    question: 'Can I clone my own voice or create custom synthetic personas?',
    answer:
      'Yes. With Instant Voice Cloning, you only need 60 seconds of clean audio to generate an identical digital voice replica. You can also design bespoke synthetic personas from scratch by fine-tuning pitch, timbre, age, and accent.',
  },
  {
    question: 'What languages and regional accents are supported?',
    answer:
      'Astra natively supports 50+ languages with regional accent preservation and dialect accuracy. You can also localize or dub content across multiple languages while maintaining the speaker\'s original vocal identity.',
  },
  {
    question: 'How does commercial licensing work for generated audio?',
    answer:
      'All audio produced on paid tiers includes 100% royalty-free commercial rights. You hold full ownership of generated outputs for YouTube, podcasts, audiobooks, video games, broadcasts, and commercial advertisements.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  return (
    <section id='faq' className='w-full max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start'>
        {/* Left Column: Heading + Help Card */}
        <div className='lg:col-span-5 flex flex-col justify-between lg:sticky lg:top-24'>
          {/* Main Title */}
          <div>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]'>
              Frequently asked
              <br />
              questions
            </h2>
          </div>

          {/* Bottom "Still have questions?" Card */}
          <div className='rounded-3xl bg-muted/30 border border-border/80 p-6 sm:p-7 shadow-xs mt-8 sm:mt-12'>
            <h3 className='text-xl sm:text-2xl font-bold tracking-tight text-foreground'>
              Still have questions?
            </h3>
            <p className='text-sm text-muted-foreground leading-relaxed mt-2 mb-6'>
              Can&apos;t find the answer to your question? Send us an email and we&apos;ll get back to you as soon as possible.
            </p>
            <a
              href='mailto:support@astra.ai'
              className='inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-xs'
            >
              Send email
            </a>
          </div>
        </div>

        {/* Right Column: Accordion Cards */}
        <div className='lg:col-span-7 flex flex-col gap-3.5 sm:gap-4'>
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className='rounded-2xl sm:rounded-3xl bg-card border border-border/80 p-5 sm:p-6 transition-colors shadow-xs'
              >
                <button
                  type='button'
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className='w-full flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none'
                >
                  <span className='text-base sm:text-lg font-semibold text-foreground tracking-tight'>
                    {faq.question}
                  </span>
                  <span className='shrink-0 size-8 sm:size-9 rounded-xl bg-muted/60 border border-border/50 flex items-center justify-center text-foreground transition-transform duration-200'>
                    <ChevronDown
                      className={`size-4 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-foreground' : ''
                      }`}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className='overflow-hidden'
                    >
                      <p className='text-sm sm:text-base text-muted-foreground leading-relaxed pt-3 sm:pt-4'>
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
