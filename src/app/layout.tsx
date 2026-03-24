import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Reyansh Joshi — Senior Full Stack Developer',
    template: '%s | Reyansh Joshi',
  },
  description:
    'Senior Full Stack Developer with 4+ years of experience building scalable MERN applications, microservices, AI pipelines, and DevOps systems. Based in Gurugram, India.',
  keywords: [
    'Reyansh Joshi',
    'Full Stack Developer',
    'Senior Full Stack Developer',
    'MERN Stack Developer',
    'React Developer',
    'Node.js Developer',
    'Python Developer',
    'AWS Developer',
    'DevOps Engineer',
    'LangChain Developer',
    'OpenAI Integration',
    'Next.js Developer',
    'TypeScript Developer',
    'Software Engineer India',
    'Software Engineer Gurugram',
    'Portfolio',
  ],
  authors: [{ name: 'Reyansh Joshi', url: BASE_URL }],
  creator: 'Reyansh Joshi',
  publisher: 'Reyansh Joshi',
  category: 'Technology',

  alternates: { canonical: BASE_URL },

  openGraph: {
    type: 'website',
    url: BASE_URL,
    title: 'Reyansh Joshi — Senior Full Stack Developer',
    description:
      'Senior Full Stack Developer with 4+ years building scalable MERN apps, AI pipelines & DevOps systems. MERN · Python · AWS · LangChain.',
    siteName: 'Reyansh Joshi Portfolio',
    locale: 'en_IN',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Reyansh Joshi — Senior Full Stack Developer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Reyansh Joshi — Senior Full Stack Developer',
    description:
      'Senior Full Stack Developer · MERN · Python · AWS · LangChain · DevOps · Gurugram, India',
    images: [`${BASE_URL}/og-image.png`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-16x16.png',
  },

  manifest: '/site.webmanifest',

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Reyansh Joshi',
  url: BASE_URL,
  image: `${BASE_URL}/og-image.png`,
  email: 'reyanshjoshi4511@gmail.com',
  telephone: '+91-8696164511',
  jobTitle: 'Senior Full Stack Developer',
  description:
    'Senior Full Stack Developer with 4+ years of experience in MERN, Python, AWS, DevOps, and AI integration using LangChain and OpenAI APIs.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gurugram',
    addressRegion: 'Haryana',
    addressCountry: 'IN',
  },
  sameAs: ['https://linkedin.com/in/reyansh-joshi'],
  knowsAbout: [
    'React.js', 'Next.js', 'Node.js', 'Express.js',
    'Python', 'Django', 'FastAPI', 'MongoDB', 'PostgreSQL',
    'AWS', 'Docker', 'CI/CD', 'LangChain', 'OpenAI',
    'GraphQL', 'TypeScript', 'Microservices', 'DevOps',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'JECRC College',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      addressCountry: 'IN',
    },
  },
  worksFor: {
    '@type': 'Organization',
    name: 'DelveInsight Business Research LLP',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      addressCountry: 'IN',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-[#e6edf3] font-body antialiased">
        <div className="scan-line" />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
