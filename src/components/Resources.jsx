import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { RESOURCES, toSlug } from '../content'

gsap.registerPlugin(ScrollTrigger)

const FILTERS = ['All', 'Articles', 'Podcasts', 'Books']

const FILTER_MAP = {
  All: null,
  Articles: 'article',
  Podcasts: 'podcast',
  Books: 'book',
}

const TYPE_COLORS = {
  book: 'text-moss',
  podcast: 'text-clay',
  article: 'text-charcoal/50',
}

export default function Resources() {
  const sectionRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? RESOURCES
    : RESOURCES.filter(r => r.type === FILTER_MAP[activeFilter])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.resources-header', {
        scrollTrigger: {
          trigger: '.resources-header',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      })

      gsap.utils.toArray('.resource-row').forEach((row, i) => {
        gsap.from(row, {
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
          },
          y: 30,
          opacity: 0,
          duration: 0.5,
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
        <div className="resources-header mb-16">
          <span className="font-mono text-xs text-clay tracking-widest uppercase">
            Curated
          </span>
          <h2 className="mt-4 font-heading font-bold text-5xl md:text-7xl tracking-tight text-charcoal leading-none">
            Resources
          </h2>
          <p className="mt-5 text-charcoal/50 text-lg md:text-xl max-w-xl leading-relaxed">
            Articles, podcasts, and books that I believe are worth sharing.
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

        {/* Table header — hidden on mobile */}
        <div className="hidden md:flex items-center gap-6 px-6 pb-4 border-b border-charcoal/10">
          <span className="w-24 shrink-0 font-mono text-[11px] text-charcoal/30 uppercase tracking-widest">
            Type
          </span>
          <span className="flex-1 font-mono text-[11px] text-charcoal/30 uppercase tracking-widest">
            Title
          </span>
          <span className="w-32 shrink-0 text-right font-mono text-[11px] text-charcoal/30 uppercase tracking-widest">
            Added
          </span>
        </div>

        <div className="divide-y divide-charcoal/6">
          {filtered.map((res) => (
            <Link
              key={res.title}
              to={`/resources/${toSlug(res.title)}`}
              className="resource-row group block py-7 md:py-8 px-2 md:px-6 -mx-2 md:-mx-6 rounded-2xl hover:bg-white/50 transition-all duration-300"
            >
              {/* Desktop layout */}
              <div className="hidden md:flex items-start gap-6">
                <span className={`w-24 shrink-0 font-mono text-xs font-medium capitalize pt-1 ${TYPE_COLORS[res.type]}`}>
                  {res.type}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3">
                    <h3 className="font-heading font-semibold text-charcoal text-base leading-snug tracking-tight group-hover:text-clay transition-colors duration-300">
                      {res.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 shrink-0 mt-0.5 text-charcoal/0 group-hover:text-clay group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <p className="mt-1 font-mono text-xs text-charcoal/30">
                    {res.author}
                  </p>
                  <p className="mt-3 text-sm text-charcoal/45 leading-relaxed">
                    {res.summary}
                  </p>
                </div>

                <span className="w-32 shrink-0 text-right font-mono text-xs text-charcoal/45 pt-1">
                  {new Date(res.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              {/* Mobile layout */}
              <div className="md:hidden">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className={`font-mono text-xs font-medium capitalize ${TYPE_COLORS[res.type]}`}>
                    {res.type}
                  </span>
                  <span className="font-mono text-xs text-charcoal/45">
                    {new Date(res.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-charcoal text-base leading-snug tracking-tight group-hover:text-clay transition-colors duration-300">
                  {res.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-charcoal/30">
                  {res.author}
                </p>
                <p className="mt-3 text-sm text-charcoal/45 leading-relaxed">
                  {res.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
