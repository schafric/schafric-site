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
    desc: 'Small realisations and loose threads of thought: me thinking out loud about engineering, leadership, and everything in between.',
  },
  {
    to: '/articles',
    icon: FileText,
    label: 'Articles',
    desc: 'Longer pieces on anything from engineering leadership to personal stuff.',
  },
  {
    to: '/resources',
    icon: BookMarked,
    label: 'Resources',
    desc: 'A collection of articles, podcasts, and books that I enjoyed and that I believe are worth sharing.',
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
          I'm Richard and this is my corner of the internet where I share reflections on
            engineering leadership, things I'm reading and listening to, and resources worth
            passing along.
        </p>

        <p className="about-anim mt-8 text-lg md:text-xl text-charcoal/70 leading-loose max-w-2xl">
          It's part notebook, part bookshelf, part thinking out loud.
        </p>

        <p className="about-anim mt-8 text-lg md:text-xl text-charcoal/50 leading-loose w-full text-center">
          You can find three types of content here:
        </p>

        <div className="about-anim mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left">
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

      {/* Subtle divider */}
      <div className="about-anim w-full max-w-[1200px] mx-auto flex items-center gap-6 my-8">
        <span className="flex-1 h-px bg-charcoal/5" />
        <span className="font-mono text-[0.65rem] text-charcoal/15 tracking-widest uppercase select-none">
          &bull;
        </span>
        <span className="flex-1 h-px bg-charcoal/5" />
      </div>

      {/* About Me section */}
      <div className="w-full max-w-[1200px] flex flex-col items-center" style={{ margin: '6em auto 10em' }}>
        <div className="about-anim flex items-center gap-3 mb-10">
          <span className="w-10 h-px bg-clay" />
          <span className="font-mono text-xs text-clay tracking-widest uppercase">
            About me
          </span>
        </div>

        <h2 className="about-anim font-heading font-bold text-4xl md:text-6xl tracking-tight text-charcoal leading-tight text-center">
          A bit about <span className="text-moss">myself.</span>
        </h2>

        <div className="mt-16 max-w-2xl w-full flex flex-col gap-6 text-left">
          <p className="about-anim text-lg md:text-xl text-charcoal/70 leading-relaxed">
            For the last couple of years I've been at{' '}
            <a
              href="https://www.mews.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-clay font-medium hover:text-clay-light transition-colors"
            >
              Mews
              <ArrowUpRight className="w-4 h-4" />
            </a>
            , where I originally started as a platform engineer before shifting
            into management. I spent my last two years there in the Director of
            Engineering role.
          </p>

          <p className="about-anim text-lg md:text-xl text-charcoal/70 leading-relaxed">
            Early in my career, I found myself naturally drawn not just to the
            technical side of our work, but to how our team operated: the
            processes, the workflows, the question of how we could work more
            effectively.
          </p>

          <p className="about-anim text-lg md:text-xl text-charcoal/70 leading-relaxed">
            On paper, going into management can look like a bad deal. More
            responsibility, more ambiguity, harder conversations, and a much
            longer feedback loops than the daily wins we all loved as engineers.
          </p>

          <p className="about-anim text-lg md:text-xl text-charcoal/70 leading-relaxed">
            So what's the upside? For me, it comes down to a sense of
            entrepreneurship (assuming your company gives you enough autonomy).
            As an engineering leader, you get to shape how your team(s) operate - from day to
            day to long-term decisions. No one hands you an exact playbook with instructions on what will work in your environment, in your context. You get to be creative, experiment, and stay
            genuinely curious about team dynamics and ways of working. I believe
            the design space here is almost limitless — after all, even something
            as common as the 1:1s were someone's idea at some point.
          </p>

          <p className="about-anim text-lg md:text-xl text-charcoal/70 leading-relaxed">
            And yes, if you do it well, you help people grow, increase your
            teams' impact, and build great things along the way.
          </p>
        </div>
      </div>
    </section>
  )
}
