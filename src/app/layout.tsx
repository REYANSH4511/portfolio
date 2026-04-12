import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://reyansh.dev')

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Reyansh Joshi — Senior Full Stack Developer',
    template: '%s | Reyansh Joshi',
  },
  description:
    'Reyansh Joshi — Senior Full Stack Developer with 4+ years of experience building scalable MERN applications, microservices, AI pipelines, and DevOps systems. Reduced DB latency by 45%, deployment time by 40%, and manual research effort by 60% using LangChain & OpenAI. Based in Gurugram, India.',
  keywords: [
    // Brand
    'Reyansh Joshi',
    'Reyansh Joshi developer',
    'Reyansh Joshi portfolio',
    'reyansh.dev',
    // Role
    'Full Stack Developer',
    'Senior Full Stack Developer',
    'Full Stack Engineer',
    'Senior Software Engineer',
    'Software Engineer',
    // Stack
    'MERN Stack Developer',
    'MERN Stack Engineer',
    'React Developer',
    'React.js Developer',
    'Next.js Developer',
    'Next.js Engineer',
    'Node.js Developer',
    'Node.js Engineer',
    'Express.js Developer',
    'TypeScript Developer',
    'Python Developer',
    'Django Developer',
    'FastAPI Developer',
    'GraphQL Developer',
    'REST API Developer',
    // Cloud & DevOps
    'AWS Developer',
    'AWS Engineer',
    'DevOps Engineer',
    'Docker Developer',
    'CI/CD Engineer',
    'Jenkins',
    'GitHub Actions',
    // AI
    'LangChain Developer',
    'OpenAI Integration',
    'AI Engineer',
    'AI Pipeline Developer',
    'LLM Developer',
    // Databases
    'MongoDB Developer',
    'PostgreSQL Developer',
    'Redis Developer',
    // Location
    'Software Engineer India',
    'Software Engineer Gurugram',
    'Full Stack Developer Gurugram',
    'Full Stack Developer India',
    'Developer Jaipur',
    // Generic
    'Hire Full Stack Developer',
    'Freelance Full Stack Developer India',
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
      'Senior Full Stack Developer with 4+ years building scalable MERN apps, AI pipelines & DevOps systems. 45% faster DB · 40% faster deploys · 99.9% uptime. MERN · Python · AWS · LangChain.',
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
      'Senior Full Stack Developer · MERN · Python · AWS · LangChain · 4+ yrs · 99.9% uptime · Gurugram, India',
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
    'Senior Full Stack Developer with 4+ years of experience in MERN, Python, AWS, DevOps, and AI integration using LangChain and OpenAI APIs. Delivered 7+ production systems including AI chatbots, EdTech LMS platforms, HR automation, and IoT monitoring backends — serving 5,000+ concurrent users with 99.9% uptime.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gurugram',
    addressRegion: 'Haryana',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://linkedin.com/in/reyansh-joshi',
    'https://github.com/REYANSH4511',
    'https://reyansh.dev',
  ],
  knowsAbout: [
    'React.js', 'Next.js', 'Node.js', 'Express.js',
    'Python', 'Django', 'FastAPI', 'MongoDB', 'PostgreSQL',
    'MySQL', 'Redis', 'Prisma', 'Sequelize',
    'AWS EC2', 'AWS S3', 'AWS Lambda', 'AWS RDS',
    'Docker', 'Nginx', 'Jenkins', 'GitHub Actions', 'CI/CD',
    'LangChain', 'OpenAI', 'GraphQL', 'TypeScript',
    'JavaScript', 'SQL', 'Bash', 'Kafka', 'RabbitMQ',
    'JWT', 'OAuth2', 'Jest', 'Swagger',
    'Microservices', 'DevOps', 'Web Scraping',
    'Tailwind CSS', 'Material-UI', 'Ant Design',
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
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Full Stack Development (Python)',
      credentialCategory: 'Certificate',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Codeplanet Technologies',
      },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'AWS Cloud Practitioner',
      credentialCategory: 'Certificate',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Amazon Web Services',
      },
    },
  ],
  seeks: {
    '@type': 'Demand',
    name: 'Senior Full Stack Developer or Engineering Lead opportunities',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Reyansh Joshi — Portfolio',
  url: BASE_URL,
  author: {
    '@type': 'Person',
    name: 'Reyansh Joshi',
  },
  description:
    'Portfolio of Reyansh Joshi, Senior Full Stack Developer specializing in MERN, Python, AWS, and AI/LLM integration.',
  inLanguage: 'en-IN',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/#projects`,
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to font origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* font-display=swap prevents render-blocking — text shows in system font while custom font loads */}
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
