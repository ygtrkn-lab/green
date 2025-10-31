'use client'

import HeroSlider from './components/HeroSlider'
import ParticleHero from './components/ParticleHero'
import FlashDeals from './components/FlashDeals'
import GlassTechCards from './components/GlassTechCards'
import Newsletter from './components/Newsletter'
import WhyGreenSection from './components/WhyGreenSection'
import HomeCategoryRows from './components/HomeCategoryRows'
import DiscoverSections from './components/DiscoverSections'

export default function Home() {
  return (
    <>
      {/* Ana Slider */}
      <HeroSlider />

      <ParticleHero />

      {/* Flash Fırsatlar */}
      <FlashDeals />

      {/* Category rows (from feed) */}
      <HomeCategoryRows />

      {/* Glass Tech Cards */}
      <GlassTechCards />

  <DiscoverSections />

      {/* Haber Bülteni */}
      <Newsletter />

      {/* Why Green Section */}
      <WhyGreenSection />
    </>
  )
}
