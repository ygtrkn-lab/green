'use client'

import { FC } from 'react'

interface PageHeroProps {
  title: string
  subtitle: string
  image: string
  pattern?: 'gaming' | 'circuit' | 'tech'
}

const PageHero: FC<PageHeroProps> = ({ title, subtitle, image, pattern = 'gaming' }) => {
  return (
    <section className="relative h-[400px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent">
        {/* Simple Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          {pattern === 'gaming' && (
            <div className="w-full h-full bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238dc63f' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          )}
          {pattern === 'circuit' && (
            <div className="w-full h-full bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238dc63f' fill-opacity='0.3'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          )}
          {pattern === 'tech' && (
            <div className="w-full h-full bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238dc63f' fill-opacity='0.3'%3E%3Cpath d='M50 0l50 50-50 50L0 50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {title}
            </h1>
            
            <p className="text-lg text-gray-200 max-w-2xl">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PageHero
