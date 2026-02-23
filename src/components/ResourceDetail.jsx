import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ArrowLeft } from 'lucide-react'
import { RESOURCES, toSlug } from '../content'
import Markdown from './Markdown'

const TYPE_COLORS = {
  book: 'bg-moss/10 text-moss border-moss/15',
  podcast: 'bg-clay/10 text-clay border-clay/15',
  article: 'bg-charcoal/5 text-charcoal/70 border-charcoal/10',
}

export default function ResourceDetail() {
  const { slug } = useParams()
  const sectionRef = useRef(null)

  const resource = RESOURCES.find(r => toSlug(r.title) === slug)

  useEffect(() => {
    if (!resource) return

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
        .from('.detail-title', {
          y: 30,
          opacity: 0,
          duration: 0.6,
        }, '-=0.3')
        .from('.detail-summary', {
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
  }, [resource])

  if (!resource) {
    return (
      <section className="min-h-screen pt-40 md:pt-48 pb-32 md:pb-40 px-8 md:px-[10%]">
        <div className="w-full max-w-[800px] mx-auto text-center" style={{ margin: '10em auto' }}>
          <h2 className="font-heading font-bold text-3xl text-charcoal">Resource not found</h2>
          <p className="mt-4 text-charcoal/50 text-lg">
            This resource doesn't exist or may have been removed.
          </p>
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 mt-8 text-clay font-medium hover:text-clay-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
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
      <div className="w-full max-w-[800px]" style={{ margin: '6em auto' }}>
        <Link
          to="/resources"
          className="detail-back inline-flex items-center gap-2 text-sm text-charcoal/40 hover:text-clay transition-colors duration-300 mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>

        <div className="detail-meta flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-charcoal/35">
            {resource.author}
          </span>
          <span className="w-1 h-1 rounded-full bg-charcoal/20" />
          <span
            className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium border ${
              TYPE_COLORS[resource.type]
            }`}
          >
            {resource.type}
          </span>
        </div>

        <h1 className="detail-title font-heading font-bold text-3xl md:text-5xl tracking-tight text-charcoal leading-tight">
          {resource.title}
        </h1>

        <p className="detail-summary mt-8 text-lg md:text-xl text-charcoal/50 leading-relaxed">
          {resource.summary}
        </p>

        <div className="detail-body mt-12 pt-12 border-t border-charcoal/8">
          <span className="font-mono text-xs text-clay tracking-widest uppercase">
            My take
          </span>
          <div className="mt-6 text-base md:text-lg">
            <Markdown>{resource.content}</Markdown>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-charcoal/8">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-clay hover:text-clay-light transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            All resources
          </Link>
        </div>
      </div>
    </section>
  )
}
