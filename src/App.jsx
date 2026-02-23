import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import NoiseOverlay from './components/NoiseOverlay'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Drops from './components/Drops'
import Articles from './components/Articles'
import Resources from './components/Resources'
import DropDetail from './components/DropDetail'
import ArticleDetail from './components/ArticleDetail'
import ResourceDetail from './components/ResourceDetail'
import Explore from './components/Explore'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function Layout() {
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <NoiseOverlay />
      <Navbar />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<><Hero /><Explore /></>} />
          <Route path="/about" element={<About />} />
          <Route path="/drops" element={<Drops />} />
          <Route path="/drops/:slug" element={<DropDetail />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:slug" element={<ResourceDetail />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
