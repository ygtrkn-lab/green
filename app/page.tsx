'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import HeroSlider from './components/HeroSlider'

// Dinamik olarak yüklenen bileşenler
const ParticleHero = dynamic(() => import('./components/ParticleHero'), {
  ssr: false,
  loading: () => <div className="h-[50vh] bg-gradient-to-b from-black to-gray-900" />
})

const FlashDeals = dynamic(() => import('./components/FlashDeals'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-900" />
})

const GlassTechCards = dynamic(() => import('./components/GlassTechCards'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-900" />
})

const Newsletter = dynamic(() => import('./components/Newsletter'))
const WhyGreenSection = dynamic(() => import('./components/WhyGreenSection'))
const HomeCategoryRows = dynamic(() => import('./components/HomeCategoryRows'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-900" />
})

const DiscoverSections = dynamic(() => import('./components/DiscoverSections'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-900" />
})

export default function Home() {
  return (
    <main>
      <Suspense>
        <HeroSlider />
      </Suspense>

      <Suspense>
        <ParticleHero />
      </Suspense>

      <Suspense>
        <FlashDeals />
      </Suspense>

      <Suspense>
        <HomeCategoryRows />
      </Suspense>

      <Suspense>
        <GlassTechCards />
      </Suspense>

      <Suspense>
        <DiscoverSections />
      </Suspense>

      <Suspense>
        <Newsletter />
      </Suspense>

      <Suspense>
        <WhyGreenSection />
      </Suspense>
    </main>
  )
}
