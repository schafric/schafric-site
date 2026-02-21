import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import Logo from './Logo'

const NAV_LINKS = [
  { id: 'home', label: 'home', to: '/' },
  { id: 'about', label: 'about', to: '/about' },
  { id: 'drops', label: 'drops', to: '/drops' },
  { id: 'resources', label: 'resources', to: '/resources' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const menuLinksRef = useRef(null)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      })
    }, navRef)
    return () => ctx.revert()
  }, [])

  // Animate mobile menu open/close
  useEffect(() => {
    const menu = menuRef.current
    const links = menuLinksRef.current
    if (!menu || !links) return

    if (menuOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden'

      gsap.killTweensOf([menu, links.children])
      gsap.set(menu, { display: 'flex' })

      const tl = gsap.timeline()
      tl.fromTo(menu, {
        opacity: 0,
        backdropFilter: 'blur(0px)',
      }, {
        opacity: 1,
        backdropFilter: 'blur(40px)',
        duration: 0.4,
        ease: 'power2.out',
      })
        .fromTo(links.children, {
          y: 30,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
        }, '-=0.15')
    } else {
      document.body.style.overflow = ''

      gsap.killTweensOf([menu, links.children])
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(menu, { display: 'none' })
        },
      })
      tl.to(links.children, {
        y: -20,
        opacity: 0,
        duration: 0.25,
        stagger: 0.03,
        ease: 'power2.in',
      })
        .to(menu, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        }, '-=0.1')
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  const isHome = location.pathname === '/'
  const showTransparent = !scrolled
  const lightText = isHome && showTransparent

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        style={{ padding: '5px 20px', opacity: 1 }}
        className={`fixed top-10 left-8 right-8 md:left-[10%] md:right-[10%] mx-auto max-w-[1200px] z-[100] rounded-full transition-all duration-500 ease-out flex items-center justify-between ${
          showTransparent && !menuOpen
            ? 'bg-transparent'
            : 'bg-white/60 hover:bg-white/75 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 shadow-xl shadow-charcoal/8'
        }`}
      >
        <Link
          to="/"
          className={`transition-colors duration-300 ${
            lightText && !menuOpen ? 'text-cream' : 'text-moss'
          }`}
        >
          <Logo className="w-28 h-8 md:w-32 md:h-9" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map(link => (
            <Link
              key={link.id}
              to={link.to}
              className={`link-underline px-4 py-1.5 text-base font-medium tracking-tight transition-colors duration-300 ${
                isActive(link.to) ? 'active text-clay' : ''
              } ${!isActive(link.to) ? (lightText ? 'text-cream/90 hover:text-cream' : 'text-charcoal hover:text-moss') : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={toggleMenu}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] cursor-pointer relative z-[110]"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`block w-5 h-[2px] rounded-full transition-all duration-300 ease-out ${
              menuOpen
                ? 'rotate-45 translate-y-[7px] bg-charcoal'
                : lightText ? 'bg-cream' : 'bg-charcoal'
            }`}
          />
          <span
            className={`block w-5 h-[2px] rounded-full transition-all duration-300 ease-out ${
              menuOpen
                ? 'opacity-0 scale-0'
                : lightText ? 'bg-cream' : 'bg-charcoal'
            }`}
          />
          <span
            className={`block w-5 h-[2px] rounded-full transition-all duration-300 ease-out ${
              menuOpen
                ? '-rotate-45 -translate-y-[7px] bg-charcoal'
                : lightText ? 'bg-cream' : 'bg-charcoal'
            }`}
          />
        </button>
      </nav>

      {/* Mobile fullscreen menu overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[99] flex-col items-center justify-center bg-cream/90 backdrop-blur-[40px] md:hidden"
        style={{ display: 'none', opacity: 0 }}
      >
        <div ref={menuLinksRef} className="flex flex-col items-center gap-4">
          {NAV_LINKS.map(link => (
            <Link
              key={link.id}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`font-heading font-bold text-4xl tracking-tight transition-colors duration-300 ${
                isActive(link.to) ? 'text-clay' : 'text-charcoal hover:text-moss'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
