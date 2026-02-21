import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-tag', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.5,
      })
        .from('.hero-title-line', {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
        }, '-=0.2')
        .from('.hero-sub', {
          y: 20,
          opacity: 0,
          duration: 0.6,
        }, '-=0.3')
        .from('.hero-scroll', {
          y: 10,
          opacity: 0,
          duration: 0.5,
        }, '-=0.1')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-moss"
    >
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-clay/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-moss-light/20 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        <div className="hero-tag inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cream/15 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-clay animate-pulse" />
          <span className="font-mono text-xs text-cream/60 tracking-wide uppercase">
            Thoughts & Resources
          </span>
        </div>

        <h1 className="font-heading font-bold tracking-tight text-cream">
          <span className="hero-title-line block text-5xl md:text-7xl lg:text-8xl">
            Somewhere between
          </span>
          <span className="hero-title-line block text-5xl md:text-7xl lg:text-8xl mt-1">
            learning <span className="text-clay">& doing</span>
          </span>
        </h1>

        <p className="hero-sub mt-8 text-lg md:text-xl text-cream/60 max-w-xl mx-auto font-light leading-relaxed">
          A personal space for reflections on engineering, leadership,
          and the things I'm learning along the way.
        </p>

        <div className="hero-scroll mt-12">
          <div className="w-5 h-8 rounded-full border-2 border-cream/30 flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-cream/50 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
