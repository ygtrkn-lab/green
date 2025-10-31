import { ReactNode } from 'react'

interface CorporateSectionProps {
  id?: string
  title: string
  icon?: ReactNode
  description?: string
  children: ReactNode
  tone?: 'default' | 'subtle'
}

const CorporateSection = ({
  id,
  title,
  icon,
  description,
  children,
  tone = 'default'
}: CorporateSectionProps) => {
  const toneClasses =
    tone === 'subtle'
      ? 'bg-white/70 border-slate-200/60'
      : 'bg-white/85 border-slate-200/70'

  return (
    <section
      id={id}
      className={`relative overflow-hidden rounded-[32px] border ${toneClasses} p-8 shadow-xl shadow-slate-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_80px_-60px_rgba(15,23,42,0.45)]`}
    >
      <div className="flex flex-wrap items-start gap-5">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/5 text-slate-900">
            {icon}
          </div>
        )}
        <div className="flex-1 space-y-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              {title}
            </h2>
            {description && (
              <p className="mt-2 max-w-3xl text-sm text-slate-600">
                {description}
              </p>
            )}
          </div>
          <div className="prose prose-slate max-w-none text-slate-600 prose-headings:text-slate-900 prose-a:text-primary prose-li:marker:text-primary">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CorporateSection
