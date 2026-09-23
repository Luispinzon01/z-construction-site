const base = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
export const Arrow = ({ className }: { className?: string }) => (<svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const Check = ({ className }: { className?: string }) => (<svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.4}><path d="M20 6L9 17l-5-5" /></svg>);
export const Phone = ({ className }: { className?: string }) => (<svg viewBox="0 0 24 24" className={className} {...base}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.8 2z" /></svg>);
export const Globe = ({ className }: { className?: string }) => (<svg viewBox="0 0 24 24" className={className} {...base}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>);
export const Star = ({ className }: { className?: string }) => (<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 6.2 6.8.8-5 4.7 1.3 6.7L12 17.6 6 20.9l1.3-6.7-5-4.7 6.8-.8z" /></svg>);
export const Mark = ({ className = "w-9 h-9" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" aria-hidden="true"><path d="M24 3 44 14v20L24 45 4 34V14z" fill="#e3931e" /><path d="M15 17h18l-12 14h12v4H15l12-14H15z" fill="#0f1a2e" /></svg>
);
export const Stars = ({ label }: { label: string }) => (
  <span className="inline-flex gap-[3px] text-amber" aria-label={label}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="w-4 h-4" />)}</span>
);
