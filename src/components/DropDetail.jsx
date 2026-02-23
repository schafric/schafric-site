import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ArrowLeft } from 'lucide-react'
import { DROPS, toSlug } from '../content'
import Markdown from './Markdown'

const TAG_COLORS = {
  Leadership: 'bg-clay/10 text-clay',
  Engineering: 'bg-moss/10 text-moss',
  Reflection: 'bg-amber-500/10 text-amber-700',
  Personal: 'bg-rose-500/10 text-rose-700',
  Management: 'bg-indigo-500/10 text-indigo-700',
}

export default function DropDetail() {
  const { slug } = useParams()
  const sectionRef = useRef(null)

  const drop = DROPS.find(d => toSlug(d.title) === slug)

  useEffect(() => {
    if (!drop) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.detail-back', {
        y: 15,
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
      })
        .from('.detail-meta', {
          y: 20,
          opacity: 0,
          duration: 0.5,
        }, '-=0.2')
        .from('.detail-body', {
          y: 25,
          opacity: 0,
          duration: 0.6,
        }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [drop])

  if (!drop) {
    return (
      <section className="min-h-screen pt-40 md:pt-48 pb-32 md:pb-40 px-8 md:px-[10%]">
        <div className="w-full max-w-[800px] mx-auto text-center" style={{ margin: '10em auto' }}>
          <h2 className="font-heading font-bold text-3xl text-charcoal">Drop not found</h2>
          <p className="mt-4 text-charcoal/50 text-lg">
            This drop doesn't exist or may have been removed.
          </p>
          <Link
            to="/drops"
            className="inline-flex items-center gap-2 mt-8 text-clay font-medium hover:text-clay-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Drops
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen pt-40 md:pt-48 pb-32 md:pb-40 px-8 md:px-[10%]"
    >
      <div className="w-full max-w-[1200px]" style={{ margin: '6em auto' }}>
        <Link
          to="/drops"
          className="detail-back inline-flex items-center gap-2 text-sm text-charcoal/40 hover:text-clay transition-colors duration-300 mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Drops
        </Link>

        <div className="detail-meta flex items-center gap-3 mb-8">
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

        <div className="detail-body text-base md:text-lg">
          <Markdown>{drop.content}</Markdown>
        </div>

        <div className="mt-14 pt-8 border-t border-charcoal/8">
          <Link
            to="/drops"
            className="inline-flex items-center gap-2 text-sm font-medium text-clay hover:text-clay-light transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            All drops
          </Link>
        </div>
      </div>
    </section>
  )
}
