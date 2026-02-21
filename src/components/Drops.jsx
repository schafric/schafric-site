import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { DROPS, toSlug } from '../content'

gsap.registerPlugin(ScrollTrigger)

const FILTERS = ['All', 'Articles', 'Thoughts']

const FILTER_MAP = {
  All: null,
  Articles: 'article',
  Thoughts: 'thought',
}

const TAG_COLORS = {
  Leadership: 'bg-clay/10 text-clay',
  Engineering: 'bg-moss/10 text-moss',
  Reflection: 'bg-amber-500/10 text-amber-700',
  Personal: 'bg-rose-500/10 text-rose-700',
  Management: 'bg-indigo-500/10 text-indigo-700',
}

const TYPE_COLORS = {
  article: 'bg-charcoal/5 text-charcoal/70 border-charcoal/10',
  thought: 'bg-moss/10 text-moss border-moss/15',
}

export default function Drops() {
  const sectionRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? DROPS
    : DROPS.filter(d => d.type === FILTER_MAP[activeFilter])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.drops-header', {
        scrollTrigger: {
          trigger: '.drops-header',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      })

      gsap.utils.toArray('.drop-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.06,
          ease: 'power3.out',
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen pt-40 md:pt-48 pb-32 md:pb-40 px-8 md:px-[10%]"
    >
      <div className="w-full max-w-[1200px]" style={{ margin: '10em auto' }}>
        <div className="drops-header mb-16">
          <span className="font-mono text-xs text-clay tracking-widest uppercase">
            Journal
          </span>
          <h2 className="mt-4 font-heading font-bold text-5xl md:text-7xl tracking-tight text-charcoal leading-none">
            Drops
          </h2>
          <p className="mt-5 text-charcoal/50 text-lg md:text-xl max-w-xl leading-relaxed">
            Reflections, realisations and work tips dropped here as they come.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-12">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 md:px-7 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeFilter === filter
                  ? 'bg-charcoal text-cream'
                  : 'bg-transparent text-charcoal/60 border border-charcoal/15 hover:border-charcoal/30 hover:text-charcoal'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="space-y-8 w-full text-left">
          {filtered.map((drop) => (
            <Link
              key={drop.title}
              to={`/drops/${toSlug(drop.title)}`}
              className="drop-card group rounded-[2rem] bg-white/60 border border-charcoal/5 hover:border-charcoal/10 transition-all duration-500 card-lift block"
              style={{ padding: '2.5rem 3rem' }}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-heading font-bold text-charcoal text-xl md:text-2xl leading-snug tracking-tight group-hover:text-clay transition-colors duration-300">
                  {drop.title}
                </h3>
                <span
                  className={`shrink-0 inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium border ${
                    TYPE_COLORS[drop.type]
                  }`}
                >
                  {drop.type}
                </span>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <span className="font-mono text-xs text-charcoal/35">
                  {new Date(drop.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="w-1 h-1 rounded-full bg-charcoal/20" />
                <span
                  className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${
                    TAG_COLORS[drop.tag] || 'bg-charcoal/5 text-charcoal/60'
                  }`}
                >
                  {drop.tag}
                </span>
              </div>

              <p className="mt-6 text-base md:text-lg text-charcoal/60 leading-loose">
                {drop.summary}
              </p>

              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-clay group-hover:text-clay-light transition-colors duration-300">
                <span>Read more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
