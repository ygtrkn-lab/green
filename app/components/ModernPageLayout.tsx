'use client'

import { FC, ReactNode } from 'react'
import PageHero from './PageHero'

interface ModernPageLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  image: string
  pattern?: 'gaming' | 'circuit' | 'tech'
}

const ModernPageLayout: FC<ModernPageLayoutProps> = ({
  children,
  title,
  subtitle,
  image,
  pattern
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title={title}
        subtitle={subtitle}
        image={image}
        pattern={pattern}
      />

      <div className="container mx-auto px-4 py-16 -mt-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8 border border-gray-100">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModernPageLayout
