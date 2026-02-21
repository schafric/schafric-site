import { Github, Linkedin, Twitter, ExternalLink } from 'lucide-react'

function SubstackIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16" />
      <path d="M4 8h16" />
      <path d="M4 12l8 6 8-6" />
    </svg>
  )
}

const externalLinks = [
  {
    href: "https://github.com",
    label: "GitHub profile",
    icon: Github,
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn profile",
    icon: Linkedin,
  },
  {
    href: "https://twitter.com",
    label: "Twitter profile",
    icon: Twitter,
  },
  {
    href: "https://substack.com",
    label: "Substack",
    icon: SubstackIcon,
  },
];
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-16 bg-charcoal px-8 md:px-[10%] py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div>
          <p className="font-heading text-2xl font-bold text-cream/80">
            schafric
          </p>
          <p className="mt-2 text-sm text-cream/40">
            Engineering leadership, reflections, and resources
          </p>
        </div>
        <div className="mt-8 flex items-center gap-6">
          {externalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-cream/50 transition-colors duration-200 hover:text-cream"
            >
              <link.icon size={20} />
            </a>
          ))}
          <a
            href="https://mews.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mews website"
            className="flex items-center gap-1.5 text-cream/50 transition-colors duration-200 hover:text-cream"
          >
            <ExternalLink size={20} />
            <span className="text-sm">mews.com</span>
          </a>
        </div>
        <div className="mt-12 border-t border-cream/10 pt-6">
          <p className="text-xs text-cream/30">
            &copy; {currentYear} Richard Schafer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
