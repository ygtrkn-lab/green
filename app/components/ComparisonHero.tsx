'use client'

import { motion } from 'framer-motion'

type ComparisonHeroProps = {
  productCount?: number
  activeCategoryName?: string | null
  activeCategorySlug?: string | null
}

const ComparisonHero = ({
  productCount = 0,
  activeCategoryName,
  activeCategorySlug
}: ComparisonHeroProps) => {
  const headline =
    productCount > 0
      ? `${productCount} ürün seçildi`
      : 'Karşılaştırma merkezine hoş geldiniz'

  const hasCategory = Boolean(activeCategoryName)
  const categoryHref = activeCategorySlug ? `/kategoriler/${activeCategorySlug}` : null

  const sublineContent = hasCategory ? (
    <span>
      Seçili kategori:{' '}
      {categoryHref ? (
        <a
          href={categoryHref}
          className="font-semibold text-white underline-offset-4 hover:underline"
        >
          {activeCategoryName}
        </a>
      ) : (
        <span className="font-semibold">{activeCategoryName}</span>
      )}
      . Ürünleri yan yana inceleyin.
    </span>
  ) : (
    'Ürün kartlarından karşılaştırmak istediğiniz modelleri ekleyin.'
  )

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#8dc63f] via-[#8dc63f] to-[#6fa630] px-4 py-16 text-white shadow-xl sm:px-6 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_70%)]" />
      <motion.div
  className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="mb-4 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white sm:px-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5 }}
        >
          Green Karşılaştırma
        </motion.span>
        <motion.h1
          className="text-2xl font-semibold text-white sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.55 }}
        >
          {headline}
        </motion.h1>
        <motion.p
          className="mt-4 max-w-3xl text-sm text-white/90 sm:text-base"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.55 }}
        >
          {sublineContent}
        </motion.p>
        <motion.div
          className="mt-8 grid w-full gap-3 sm:w-auto sm:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.55 }}
        >
          <a
            href="/kategoriler"
            className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#5a8e25] shadow-lg shadow-[#628f2a]/30 transition hover:bg-[#f0f8e4] sm:w-auto"
          >
            Kategorilere Göz At
          </a>
          <a
            href="/#comparison-section"
            className="w-full rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 sm:w-auto"
          >
            Seçimleri Görüntüle
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ComparisonHero
