import { profile } from "@/data/profile";
import {
  LinkedInBrandIcon,
  GithubBrandIcon,
  MailBrandIcon,
  WhatsAppIcon,
} from "@/components/icons";

export function Footer() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <footer className="border-t border-border/50 bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="font-mono text-sm font-semibold text-fg">
              {profile.name}
            </p>
            <p className="text-sm text-muted">{profile.title}</p>
            <p className="text-xs text-muted">{profile.location}</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="transition-transform hover:scale-110"
            >
              <MailBrandIcon className="h-5 w-5" />
            </a>
            <a
              href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="transition-transform hover:scale-110"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-transform hover:scale-110"
            >
              <LinkedInBrandIcon className="h-5 w-5" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[#181717] transition-transform hover:scale-110 dark:text-white"
            >
              <GithubBrandIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border/50 pt-6 text-xs text-muted sm:flex-row sm:justify-between">
          <p>Built with Next.js, Tailwind CSS & Framer Motion.</p>
          <p>Last updated: {lastUpdated}</p>
        </div>
      </div>
    </footer>
  );
}
