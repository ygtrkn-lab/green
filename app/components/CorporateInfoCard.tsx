import { ReactNode } from 'react'

interface CorporateInfoCardProps {
  title?: string
  icon?: ReactNode
  children: ReactNode
  accent?: 'primary' | 'blue' | 'emerald' | 'amber' | 'slate'
}

const accentMap: Record<NonNullable<CorporateInfoCardProps['accent']>, string> = {
  primary: 'bg-gradient-to-br from-primary/15 via-primary/5 to-transparent text-primary',
  blue: 'bg-gradient-to-br from-blue-500/15 via-blue-500/5 to-transparent text-blue-600',
  emerald: 'bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent text-emerald-600',
  amber: 'bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent text-amber-600',
  slate: 'bg-gradient-to-br from-slate-900/10 via-slate-900/5 to-transparent text-slate-900'
}

const CorporateInfoCard = ({
  title,
  icon,
  children,
  accent = 'primary'
}: CorporateInfoCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {icon && (
        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${accentMap[accent]}`}>
          {icon}
        </div>
      )}
      {title && (
        <h3 className="text-lg font-semibold text-slate-900">
          {title}
        </h3>
      )}
      <div className="mt-3 text-sm leading-relaxed text-slate-600">
        {children}
      </div>
    </div>
  )
}

export default CorporateInfoCard
