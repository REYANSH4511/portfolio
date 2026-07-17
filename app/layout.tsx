import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { profile } from "@/data/profile";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.summary,
  metadataBase: new URL(profile.website),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
    url: profile.website,
    siteName: profile.name,
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="c22k8YKi92kgVckmc7ddVitp7EAhonK8lxD9-dEEdRY"
        />
        <meta
          name="msvalidate.01"
          content="620F97E45A658935B33F2B48BC472E74"
        />
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('theme');
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = stored || (systemDark ? 'dark' : 'light');
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden bg-bg text-fg transition-colors duration-200">
        <ScrollProgress />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
        </ThemeProvider>
        <main className="flex-1">{children}</main>
        <Footer />
        <Script
          id="person-ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  name: profile.name,
                  jobTitle: profile.title,
                  url: profile.website,
                  email: profile.email,
                  telephone: profile.phone,
                  sameAs: [profile.linkedin, profile.github],
                  knowsAbout: [
                    "Node.js",
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Python",
                    "AWS",
                    "MongoDB",
                    "PostgreSQL",
                    "LangChain",
                    "OpenAI APIs",
                    "Microservices",
                    "Distributed Systems",
                    "DevOps",
                  ],
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Gurugram",
                    addressCountry: "IN",
                  },
                  alumniOf: {
                    "@type": "EducationalOrganization",
                    name: "JECRC College, Jaipur",
                  },
                },
                {
                  "@type": "ProfilePage",
                  mainEntity: {
                    "@type": "Person",
                    name: profile.name,
                    url: profile.website,
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
