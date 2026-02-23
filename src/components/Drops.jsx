import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DROPS, toSlug } from '../content'

gsap.registerPlugin(ScrollTrigger)

export default function Drops() {
  const sectionRef = useRef(null)
  const [activeTags, setActiveTags] = useState(new Set())

  const allTags = useMemo(
    () => [...new Set(DROPS.flatMap(d => d.tags))],
    []
  )

  const filtered = activeTags.size === 0
    ? DROPS
    : DROPS.filter(d => [...activeTags].every(t => d.tags.includes(t)))

  const toggleTag = (tag) => {
    setActiveTags(prev => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }

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

      gsap.utils.toArray('.drop-item').forEach((item, i) => {
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
        <div className="drops-header mb-16">
          <span className="font-mono text-xs text-clay tracking-widest uppercase">
            Thinking out loud
          </span>
          <h2 className="mt-4 font-heading font-bold text-5xl md:text-7xl tracking-tight text-charcoal leading-none">
            Drops
          </h2>
          <p className="mt-5 text-charcoal/50 text-lg md:text-xl max-w-xl leading-relaxed">
            Small realisations, loose threads of thought, and things I'm figuring out as I go. Some of these might grow into full articles — most are just me thinking out loud.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-10">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                activeTags.has(tag)
                  ? 'bg-clay/10 text-charcoal/70 border border-clay/40'
                  : 'bg-transparent text-charcoal/40 border border-charcoal/10 hover:border-charcoal/20 hover:text-charcoal/60'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="space-y-0 w-full text-left">
          {filtered.map((drop) => (
            <Link
              key={drop.title}
              to={`/drops/${toSlug(drop.title)}`}
              className="drop-item group block py-7 border-b border-charcoal/6 hover:border-charcoal/12 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-charcoal/30">
                  {new Date(drop.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-charcoal/5 text-charcoal/50">
                  {drop.tag}
                </span>
              </div>

              <p className="text-base text-charcoal/70 leading-relaxed group-hover:text-charcoal transition-colors duration-300">
                {drop.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
