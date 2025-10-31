import Link from 'next/link'

const featureBlocks = [
  {
    id: 'discover-rigs',
    eyebrow: 'Şimdi Keşfet',
    title: 'Yeni Nesil Oyun Sistemleri',
    description:
      'Titizlikle seçilmiş bileşenlerle kurguladığımız performans odaklı sistemlerle rakiplerinin hep önünde ol.',
    ctaLabel: 'Hazır Sistemlere Göz At',
    ctaHref: '/kategoriler/gaming-pc',
    videoSrc: '/videos/giris/giris-bg.mp4',
    stats: ['RTX 40 Serisi', 'Sıvı Soğutma Standart', '3 Yıl Garanti'],
  },
  {
    id: 'mods',
    eyebrow: 'Green Özel',
    title: 'El Yapımı Mod Projeleri',
    description:
      'Sınırlı sayıda üretilen, tamamı profesyonelce modifiye edilmiş kasalar ile tarzını yansıt.',
    ctaLabel: 'Özel Projeleri Keşfet',
    ctaHref: '/kategoriler/pc-kasasi',
    videoSrc: '/videos/giris/e.mp4',
    stats: ['UV Baskılı Paneller', 'ARGB Işık Şovları', 'Kişiselleştirilebilir'],
  },
  {
    id: 'peripherals',
    eyebrow: 'Deneyimini Tamamla',
    title: 'Profesyonel Ekipman Seçkisi',
    description:
      'E-spor seviyesindeki mouse, klavye ve kulaklıklarla kusursuz bir oyun kombinasyonu oluştur.',
    ctaLabel: 'Ekipmanları İncele',
    ctaHref: '/kategoriler/gaming-mouse',
    videoSrc: '/videos/giris/WEW.mp4',
    stats: ['1 ms Tepkime', 'Ergonomik Tasarımlar', 'RGB Ekosistemi'],
  },
]

const highlightStrip = [
  {
    id: 'workstations',
    eyebrow: 'Creator Serisi',
    title: '4K video düzenleme ve render için optimize edildi',
    videoSrc: '/videos/giris/output_free (1).mp4',
    href: '/kategoriler/aio-pc',
  },
  {
    id: 'accessories',
    eyebrow: 'Aksesuar Rafı',
    title: 'Standlardan kablo yönetimine, düzen tutkunu ekipmanlar',
    videoSrc: '/videos/giris/giris-bggrer.mp4',
    href: '/kategoriler/diger',
  },
]

export default function DiscoverSections() {
  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/80">Green ile daha fazlası</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
            Oyun tutkusunu besleyen deneyim alanları
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            İlham veren vitrinler, hazır kurulumlar ve performansınızı zirveye taşıyacak ekipman demo alanları ile mağazamızı online olarak keşfedin.
          </p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featureBlocks.map((block) => (
            <article
              key={block.id}
              className="group relative overflow-hidden rounded-3xl bg-gray-900 text-white shadow-2xl"
            >
              <div className="absolute inset-0">
                <video
                  className="h-full w-full object-cover opacity-60 transition duration-700 group-hover:opacity-90"
                  src={block.videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
              </div>
              <div className="relative flex h-full flex-col justify-between p-8 sm:p-10">        
                <div className="space-y-4">
                  <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1 text-xs font-semibold tracking-[0.2em] uppercase">
                    {block.eyebrow}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-semibold leading-tight">
                    {block.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-200/90 leading-relaxed">
                    {block.description}
                  </p>
                  <ul className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-200/90">
                    {block.stats.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <Link
                    href={block.ctaHref}
                    className="inline-flex items-center justify-center rounded-full bg-white text-gray-900 px-5 py-2.5 text-sm font-semibold transition group-hover:bg-primary group-hover:text-white"
                  >
                    {block.ctaLabel}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {highlightStrip.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative overflow-hidden rounded-3xl bg-gray-900 shadow-xl"
            >
              <div className="absolute inset-0">
                <video
                  className="h-full w-full object-cover opacity-70 transition duration-700 group-hover:opacity-100"
                  src={item.videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
              </div>
              <div className="relative flex h-full flex-col justify-between p-8 sm:p-10">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                  {item.eyebrow}
                </span>
                <h3 className="mt-3 text-2xl sm:text-3xl font-semibold text-white leading-tight">
                  {item.title}
                </h3>
                <span className="mt-6 inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold text-white transition group-hover:border-white/60 group-hover:bg-white/20">
                  Koleksiyona Git
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
