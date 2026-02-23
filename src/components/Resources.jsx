import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RESOURCES, toSlug } from '../content'

gsap.registerPlugin(ScrollTrigger)

export default function Resources() {
  const sectionRef = useRef(null)
  const [activeTypes, setActiveTypes] = useState(new Set())

  const allTypes = useMemo(
    () => [...new Set(RESOURCES.map(r => r.type).filter(Boolean))],
    []
  )

  const filtered = activeTypes.size === 0
    ? RESOURCES
    : RESOURCES.filter(r => activeTypes.has(r.type))

  const toggleType = (type) => {
    setActiveTypes(prev => {
      const next = new Set(prev)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })
  }

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

      gsap.utils.toArray('.resource-item').forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
          },
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.04,
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

        <div className="flex flex-wrap items-center gap-2 mb-10">
          {allTypes.map(type => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer capitalize ${
                activeTypes.has(type)
                  ? 'bg-clay/10 text-charcoal/70 border border-clay/40'
                  : 'bg-transparent text-charcoal/40 border border-charcoal/10 hover:border-charcoal/20 hover:text-charcoal/60'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="space-y-0 w-full text-left">
          {filtered.map((res) => (
            <Link
              key={res.title}
              to={`/resources/${toSlug(res.title)}`}
              className="resource-item group block py-7 border-b border-charcoal/6 hover:border-charcoal/12 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-charcoal/30">
                  {new Date(res.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-charcoal/5 text-charcoal/50 capitalize">
                  {res.type}
                </span>
              </div>

              <h3 className="font-heading font-semibold text-charcoal text-base leading-snug tracking-tight group-hover:text-clay transition-colors duration-300">
                {res.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-charcoal/30">
                {res.author}
              </p>
              <p className="mt-3 text-base text-charcoal/70 leading-relaxed group-hover:text-charcoal transition-colors duration-300">
                {res.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
