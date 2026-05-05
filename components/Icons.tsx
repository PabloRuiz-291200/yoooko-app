export function YoookoMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="yoooko-core" x1="8" y1="6" x2="56" y2="58">
          <stop stopColor="#A78BFA"/>
          <stop offset="0.48" stopColor="#22D3EE"/>
          <stop offset="1" stopColor="#7C3AED"/>
        </linearGradient>
        <filter id="yoooko-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path d="M32 4 55 17.5v29L32 60 9 46.5v-29L32 4Z" fill="#080B14" stroke="url(#yoooko-core)" strokeWidth="2.4"/>
      <path d="M20 22.5 32 15l12 7.5v19L32 49l-12-7.5v-19Z" fill="url(#yoooko-core)" opacity=".16"/>
      <path d="M19 20.5h8.5l4.7 9 4.7-9H45L35.9 35v8.5h-7.8V35L19 20.5Z" fill="white" filter="url(#yoooko-glow)"/>
      <path d="M15 15h7M42 49h7M49 15h-7M22 49h-7" stroke="#67E8F9" strokeWidth="2" strokeLinecap="round" opacity=".75"/>
    </svg>
  );
}
export function MinimalIcon({ children }: { children: React.ReactNode }) { return <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[.06] text-cyan-100">{children}</span> }
