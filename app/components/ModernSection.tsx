'use client'

import { FC, ReactNode } from 'react'

interface ModernSectionProps {
  children: ReactNode
  title: string
  icon?: ReactNode
  className?: string
  delay?: number
}

const ModernSection: FC<ModernSectionProps> = ({ 
  children, 
  title, 
  icon, 
  className = '',
  delay = 0 
}) => {
  return (
    <section className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        {icon && (
          <div className="text-primary flex-shrink-0">
            {icon}
          </div>
        )}
        <h2 className="text-2xl font-bold text-gray-900">
          {title}
        </h2>
      </div>
      <div className="prose max-w-none text-gray-700">
        {children}
      </div>
    </section>
  )
}

export default ModernSection
