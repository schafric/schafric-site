import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PenLine, FileText, BookMarked, ArrowRight, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  {
    to: '/drops',
    icon: PenLine,
    label: 'Drops',
    desc: 'Small realisations and loose threads of thought — me thinking out loud about engineering, leadership, and everything in between.',
  },
  {
    to: '/articles',
    icon: FileText,
    label: 'Articles',
    desc: 'Longer pieces on engineering leadership, team dynamics, and lessons learned from building products at scale.',
  },
  {
    to: '/resources',
    icon: BookMarked,
    label: 'Resources',
    desc: 'A curated collection of articles, podcasts, and books that have shaped how I think about technology and management.',
  },
]

export default function Explore() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.explore-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
          y: 50,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.12,
          ease: 'power3.out',
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-40 px-8 md:px-[10%]"
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="explore-card mb-20 max-w-2xl">
          <span className="font-mono text-xs text-clay tracking-widest uppercase">
            Welcome
          </span>
          <h2 className="mt-4 font-heading font-bold text-3xl md:text-4xl tracking-tight text-charcoal leading-tight">
            Hey, I'm Richard.
          </h2>
          <p className="mt-6 text-lg text-charcoal/60 leading-relaxed">
            Director of Engineering at{' '}
            <a
              href="https://www.mews.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-clay font-medium hover:text-clay-light transition-colors"
            >
              Mews
              <ArrowUpRight className="w-4 h-4" />
            </a>
            . This is my corner of the internet where I share reflections on
            engineering leadership, things I'm reading, and resources worth
            passing along.{' '}
            <Link
              to="/about"
              className="text-clay font-medium hover:text-clay-light transition-colors"
            >
              Read more about me here
            </Link>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SECTIONS.map(item => (
            <Link
              key={item.label}
              to={item.to}
              className="explore-card group rounded-[2rem] bg-white/60 border border-charcoal/5 card-lift block"
              style={{ padding: '3rem 3rem' }}
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-moss/10 flex items-center justify-center group-hover:bg-clay/10 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-moss group-hover:text-clay transition-colors duration-300" />
                </div>
                <ArrowRight className="w-5 h-5 text-charcoal/20 group-hover:text-clay group-hover:translate-x-1 transition-all duration-300" />
              </div>

              <h3 className="font-heading font-bold text-charcoal text-2xl tracking-tight">
                {item.label}
              </h3>

              <p className="mt-4 text-base text-charcoal/50 leading-relaxed">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
