import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { ARTICLES, toSlug } from '../content'

gsap.registerPlugin(ScrollTrigger)

const TAG_COLORS = {
  Leadership: 'bg-clay/10 text-clay',
  Engineering: 'bg-moss/10 text-moss',
  Reflection: 'bg-amber-500/10 text-amber-700',
  Personal: 'bg-rose-500/10 text-rose-700',
  Management: 'bg-indigo-500/10 text-indigo-700',
}

export default function Articles() {
  const sectionRef = useRef(null)
  const [activeTags, setActiveTags] = useState(new Set())

  const allTags = useMemo(
    () => [...new Set(ARTICLES.flatMap(a => a.tags))],
    []
  )

  const filtered = activeTags.size === 0
    ? ARTICLES
    : ARTICLES.filter(a => [...activeTags].every(t => a.tags.includes(t)))

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
      gsap.from('.articles-header', {
        scrollTrigger: {
          trigger: '.articles-header',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      })

      gsap.utils.toArray('.article-card').forEach((card, i) => {
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
        <div className="articles-header mb-16">
          <span className="font-mono text-xs text-clay tracking-widest uppercase">
            Long-form
          </span>
          <h2 className="mt-4 font-heading font-bold text-5xl md:text-7xl tracking-tight text-charcoal leading-none">
            Articles
          </h2>
          <p className="mt-5 text-charcoal/50 text-lg md:text-xl max-w-xl leading-relaxed">
            Longer pieces on engineering leadership, team dynamics, and lessons learned along the way.
          </p>
        </div>

        {allTags.length > 0 && (
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
        )}

        <div className="space-y-8 w-full text-left">
          {filtered.map((article) => (
            <Link
              key={article.title}
              to={`/articles/${toSlug(article.title)}`}
              className="article-card group rounded-[2rem] bg-white/60 border border-charcoal/5 hover:border-charcoal/10 transition-all duration-500 card-lift block"
              style={{ padding: '2.5rem 3rem' }}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-heading font-bold text-charcoal text-xl md:text-2xl leading-snug tracking-tight group-hover:text-clay transition-colors duration-300">
                  {article.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <span className="font-mono text-xs text-charcoal/35">
                  {new Date(article.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="w-1 h-1 rounded-full bg-charcoal/20" />
                <span
                  className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${
                    TAG_COLORS[article.tag] || 'bg-charcoal/5 text-charcoal/60'
                  }`}
                >
                  {article.tag}
                </span>
              </div>

              <p className="mt-6 text-base md:text-lg text-charcoal/60 leading-loose">
                {article.summary}
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
