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

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.about-anim').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.08,
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
      <div className="w-full max-w-[1200px] flex flex-col items-center text-center" style={{ margin: '10em auto' }}>
        <div className="about-anim flex items-center gap-3 mb-10">
          <span className="w-10 h-px bg-clay" />
          <span className="font-mono text-xs text-clay tracking-widest uppercase">
            About
          </span>
        </div>

        <h2 className="about-anim font-heading font-bold text-4xl md:text-6xl tracking-tight text-charcoal leading-tight">
          Notes, <span className="text-moss">not answers.</span>
        </h2>

        <p className="about-anim mt-12 text-lg md:text-xl text-charcoal/70 leading-loose max-w-2xl">
          I'm Richard, Director of Engineering at{' '}
          <a
            href="https://www.mews.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-clay font-medium hover:text-clay-light transition-colors"
          >
            Mews
            <ArrowUpRight className="w-4 h-4" />
          </a>
          . This is where I share the things that stick with me &mdash; thoughts
          on building and leading engineering teams, reflections on what I'm
          reading and listening to, and the occasional resource I think is
          worth passing along.
        </p>

        <p className="about-anim mt-8 text-lg md:text-xl text-charcoal/70 leading-loose max-w-2xl">
          It's part notebook, part bookshelf, part thinking out loud.
        </p>

        <div className="about-anim mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left">
          {SECTIONS.map(item => (
            <Link
              key={item.label}
              to={item.to}
              className="group rounded-[2rem] bg-white/60 border border-charcoal/5 card-lift block"
              style={{ padding: '3rem 3rem' }}
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-moss/10 flex items-center justify-center group-hover:bg-clay/10 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-moss group-hover:text-clay transition-colors duration-300" />
                </div>
                <ArrowRight className="w-5 h-5 text-charcoal/20 group-hover:text-clay group-hover:translate-x-1 transition-all duration-300" />
              </div>

              <h3 className="font-heading font-bold text-charcoal text-2xl tracking-tight group-hover:text-clay transition-colors duration-300">
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
