'use client'

import { useState, useEffect } from 'react'
import { X, Filter } from 'lucide-react'

interface FilterSidebarProps {
  filters: {
    priceRange: {
      min: number
      max: number
    }
    specs: {
      [key: string]: string[]
    }
  }
  selectedFilters: {
    priceRange: {
      min: number
      max: number
    }
    specs: {
      [key: string]: string
    }
    sort: string
  }
  onFilterChange: (filters: any) => void
}

export default function FilterSidebar({ filters, selectedFilters, onFilterChange }: FilterSidebarProps) {
  const [priceMin, setPriceMin] = useState(selectedFilters.priceRange.min)
  const [priceMax, setPriceMax] = useState(selectedFilters.priceRange.max)

  useEffect(() => {
    setPriceMin(selectedFilters.priceRange.min)
    setPriceMax(selectedFilters.priceRange.max)
  }, [selectedFilters.priceRange])

  const handlePriceRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    const type = event.target.dataset.type as 'min' | 'max'
    
    if (type === 'min' && value <= priceMax) {
      setPriceMin(value)
      onFilterChange({
        ...selectedFilters,
        priceRange: {
          min: value,
          max: priceMax
        }
      })
    } else if (type === 'max' && value >= priceMin) {
      setPriceMax(value)
      onFilterChange({
        ...selectedFilters,
        priceRange: {
          min: priceMin,
          max: value
        }
      })
    }
  }

  const handlePriceInputChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseInt(event.target.value) || 0
    
    if (type === 'min' && value <= priceMax) {
      setPriceMin(value)
      onFilterChange({
        ...selectedFilters,
        priceRange: {
          min: value,
          max: priceMax
        }
      })
    } else if (type === 'max' && value >= priceMin) {
      setPriceMax(value)
      onFilterChange({
        ...selectedFilters,
        priceRange: {
          min: priceMin,
          max: value
        }
      })
    }
  }

  const handleSpecChange = (specKey: string, value: string) => {
    onFilterChange({
      ...selectedFilters,
      specs: {
        ...selectedFilters.specs,
        [specKey]: value,
      },
    })
  }

  const toggleSpecValue = (specKey: string, value: string) => {
    const currentValue = selectedFilters.specs[specKey]
    handleSpecChange(specKey, currentValue === value ? '' : value)
  }

  const clearFilters = () => {
    setPriceMin(filters.priceRange.min)
    setPriceMax(filters.priceRange.max)
    onFilterChange({
      ...selectedFilters,
      priceRange: {
        min: filters.priceRange.min,
        max: filters.priceRange.max
      },
      specs: {}
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const getSpecDisplayName = (specKey: string) => {
    const specNames: { [key: string]: string } = {
      'dpi': 'DPI',
      'connection': 'Bağlantı',
      'sensor': 'Sensör',
      'weight': 'Ağırlık'
    }
    return specNames[specKey] || specKey
  }

  const calculatedStep = Math.round((filters.priceRange.max - filters.priceRange.min) / 100)
  const priceStep = Math.max(1, calculatedStep || 0)
  const activeFiltersCount =
    Object.values(selectedFilters.specs).filter((v) => v).length +
    (priceMin !== filters.priceRange.min || priceMax !== filters.priceRange.max ? 1 : 0)

  const hasCustomPrice = priceMin !== filters.priceRange.min || priceMax !== filters.priceRange.max

  const resetPrice = () => {
    setPriceMin(filters.priceRange.min)
    setPriceMax(filters.priceRange.max)
    onFilterChange({
      ...selectedFilters,
      priceRange: {
        min: filters.priceRange.min,
        max: filters.priceRange.max,
      },
    })
  }

  return (
    <aside className="flex flex-col gap-4">
      <div className="rounded-3xl border border-slate-200/60 bg-white/95 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#8dc63f]/20 bg-[#8dc63f]/10 text-[#8dc63f]">
            <Filter className="h-4 w-4" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-400">Filtre Merkezi</p>
            <p className="text-base font-semibold text-slate-900">Kategoriyi Daralt</p>
            {activeFiltersCount > 0 && (
              <p className="text-xs text-slate-500">{activeFiltersCount} filtre aktif</p>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="rounded-2xl border border-slate-200/80 px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:border-[#8dc63f]/40 hover:bg-[#8dc63f]/10 hover:text-[#2f3b16]"
            >
              <div className="flex items-center gap-1">
                <X className="h-4 w-4" />
                Temizle
              </div>
            </button>
          )}
        </div>
        {activeFiltersCount > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {hasCustomPrice && (
              <button
                type="button"
                onClick={resetPrice}
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-[#8dc63f]/40 hover:bg-[#8dc63f]/10 hover:text-[#2f3b16]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#8dc63f]" />
                {formatPrice(priceMin)} - {formatPrice(priceMax)}
                <X className="h-3 w-3 text-slate-400 transition group-hover:text-[#2f3b16]" />
              </button>
            )}
            {Object.entries(selectedFilters.specs).map(([key, value]) =>
              value ? (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSpecChange(key, '')}
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-[#8dc63f]/40 hover:bg-[#8dc63f]/10 hover:text-[#2f3b16]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8dc63f]" />
                  {getSpecDisplayName(key)}: {value}
                  <X className="h-3 w-3 text-slate-400 transition group-hover:text-[#2f3b16]" />
                </button>
              ) : null
            )}
          </div>
        ) : (
          <p className="mt-4 text-xs text-slate-400">Favori ürününüzü bulmak için kriter seçin.</p>
        )}
      </div>

      <div className="rounded-3xl border border-slate-200/60 bg-white/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Fiyat</p>
            <p className="text-lg font-semibold text-slate-900">Bütçe aralığı</p>
          </div>
          <div className="rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
            {formatPrice(priceMin)} – {formatPrice(priceMax)}
          </div>
        </div>

        <div className="relative mt-6">
          <div className="relative h-2 rounded-full bg-slate-100">
            <div
              className="absolute h-2 rounded-full bg-gradient-to-r from-[#8dc63f] via-[#7ab32f] to-[#5a8c1d]"
              style={{
                left: `${((priceMin - filters.priceRange.min) / (filters.priceRange.max - filters.priceRange.min)) * 100}%`,
                right: `${100 - ((priceMax - filters.priceRange.min) / (filters.priceRange.max - filters.priceRange.min)) * 100}%`,
              }}
            />
          </div>

          <input
            type="range"
            min={filters.priceRange.min}
            max={filters.priceRange.max}
            step={priceStep}
            value={priceMin}
            data-type="min"
            onChange={handlePriceRangeChange}
            className="range-slider absolute left-0 top-[-8px] h-2 w-full cursor-grab bg-transparent appearance-none active:cursor-grabbing"
          />

          <input
            type="range"
            min={filters.priceRange.min}
            max={filters.priceRange.max}
            step={priceStep}
            value={priceMax}
            data-type="max"
            onChange={handlePriceRangeChange}
            className="range-slider absolute left-0 top-[-8px] h-2 w-full cursor-grab bg-transparent appearance-none active:cursor-grabbing"
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Min
            <input
              type="number"
              value={priceMin}
              onChange={(e) => handlePriceInputChange(e, 'min')}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-[#8dc63f]/60 focus:outline-none focus:ring-2 focus:ring-[#8dc63f]/30"
              min={filters.priceRange.min}
              max={priceMax}
            />
          </label>
          <label className="flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Max
            <input
              type="number"
              value={priceMax}
              onChange={(e) => handlePriceInputChange(e, 'max')}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-[#8dc63f]/60 focus:outline-none focus:ring-2 focus:ring-[#8dc63f]/30"
              min={priceMin}
              max={filters.priceRange.max}
            />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(filters.specs).map(([specKey, specValues]) => {
          const activeValue = selectedFilters.specs[specKey]
          return (
            <div
              key={specKey}
              className="rounded-3xl border border-slate-200/60 bg-white/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">{getSpecDisplayName(specKey)}</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {activeValue ? activeValue : 'Tüm seçenekler'}
                  </p>
                </div>
                {activeValue && (
                  <button
                    type="button"
                    onClick={() => handleSpecChange(specKey, '')}
                    className="rounded-full border border-slate-200/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 transition hover:border-[#8dc63f]/40 hover:text-[#2f3b16]"
                  >
                    Sıfırla
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {[...specValues].map((value) => {
                  const isActive = activeValue === value
                  return (
                    <button
                      type="button"
                      key={value}
                      onClick={() => toggleSpecValue(specKey, value)}
                      className={`group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                        isActive
                          ? 'border-transparent bg-slate-900 text-white shadow-[0_16px_32px_rgba(15,23,42,0.2)]'
                          : 'border-slate-200/80 bg-white/80 text-slate-600 hover:border-[#8dc63f]/40 hover:bg-white hover:text-[#1f2710]'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition ${isActive ? 'bg-[#8dc63f]' : 'bg-slate-300'}`}
                      />
                      {value}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .range-slider::-webkit-slider-thumb {
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #8dc63f, #6ea82a);
          border: 2px solid #ffffff;
          box-shadow: 0 8px 24px rgba(141, 198, 63, 0.35);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .range-slider::-webkit-slider-thumb:hover {
          transform: scale(1.08);
          box-shadow: 0 12px 28px rgba(141, 198, 63, 0.45);
        }

        .range-slider::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #8dc63f, #6ea82a);
          border: 2px solid #ffffff;
          box-shadow: 0 8px 24px rgba(141, 198, 63, 0.35);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .range-slider::-moz-range-thumb:hover {
          transform: scale(1.08);
          box-shadow: 0 12px 28px rgba(141, 198, 63, 0.45);
        }
      `}</style>
    </aside>
  )
}
