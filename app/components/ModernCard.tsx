'use client'

import { FC, ReactNode } from 'react'

interface ModernCardProps {
  children: ReactNode
  title?: string
  icon?: ReactNode
  className?: string
  delay?: number
  variant?: 'default' | 'gradient' | 'glass'
}

const ModernCard: FC<ModernCardProps> = ({ 
  children, 
  title, 
  icon, 
  className = '',
  delay = 0,
  variant = 'default'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-gray-50 to-white border-gray-200'
      case 'glass':
        return 'bg-white/95 border-gray-100'
      default:
        return 'bg-white border-gray-200'
    }
  }

  return (
    <div
      className={`p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200
                ${getVariantClasses()} ${className}`}
    >
      {(title || icon) && (
        <div className="flex items-center space-x-3 mb-4">
          {icon && (
            <div className="text-primary flex-shrink-0">
              {icon}
            </div>
          )}
          {title && (
            <h3 className="font-semibold text-gray-900 text-lg">
              {title}
            </h3>
          )}
        </div>
      )}
      <div className="text-gray-700 leading-relaxed">
        {children}
      </div>
    </div>
  )
}

export default ModernCard
