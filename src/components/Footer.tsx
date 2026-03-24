export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[#21262d] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border border-[#58e6d9] rounded flex items-center justify-center">
            <span className="text-[#58e6d9] font-mono text-[9px] font-bold">RJ</span>
          </div>
          <span className="font-mono text-xs text-[#6e7681]">
            Reyansh Joshi · Gurugram, India
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#21262d]">·</span>
          <a
            href="https://linkedin.com/in/reyansh-joshi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#6e7681] hover:text-[#58e6d9] transition-colors"
          >
            LinkedIn
          </a>
          <span className="font-mono text-xs text-[#21262d]">·</span>
          <a
            href="mailto:reyanshjoshi4511@gmail.com"
            className="font-mono text-xs text-[#6e7681] hover:text-[#58e6d9] transition-colors"
          >
            Email
          </a>
          <span className="font-mono text-xs text-[#21262d]">·</span>
          <span className="font-mono text-xs text-[#21262d]">© {year}</span>
        </div>
      </div>
    </footer>
  )
}
