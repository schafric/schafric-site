import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Briefcase, BookOpen, Podcast, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

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
          {[
            {
              icon: Briefcase,
              label: 'Work',
              desc: 'Engineering leadership, management & team building',
            },
            {
              icon: BookOpen,
              label: 'Reading',
              desc: 'Articles, books & long-form pieces that shaped my thinking',
            },
            {
              icon: Podcast,
              label: 'Listening',
              desc: 'Podcasts & conversations worth sharing with others',
            },
          ].map(item => (
            <div
              key={item.label}
              className="about-anim group p-8 rounded-[2rem] bg-white/50 border border-charcoal/5 card-lift"
            >
              <div className="w-12 h-12 rounded-2xl bg-moss/10 flex items-center justify-center mb-6 group-hover:bg-clay/10 transition-colors duration-300">
                <item.icon className="w-5 h-5 text-moss group-hover:text-clay transition-colors duration-300" />
              </div>
              <h3 className="font-heading font-semibold text-charcoal text-base tracking-tight">
                {item.label}
              </h3>
              <p className="mt-2 text-sm text-charcoal/50 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
