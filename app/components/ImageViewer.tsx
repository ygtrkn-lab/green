'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X, Maximize2, RotateCcw } from 'lucide-react'

interface ImageViewerProps {
  images: Array<{
    url: string
    alt: string
  }>
  onImageChange?: (index: number) => void
}

export default function ImageViewer({ images, onImageChange }: ImageViewerProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [touchDistance, setTouchDistance] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const mainImageRef = useRef<HTMLImageElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return
      
      if (e.key === 'ArrowLeft') {
        navigateImage('prev')
      } else if (e.key === 'ArrowRight') {
        navigateImage('next')
      } else if (e.key === 'Escape') {
        closeModal()
      } else if (e.key === '+' || e.key === '=') {
        handleZoom(0.2)
      } else if (e.key === '-') {
        handleZoom(-0.2)
      } else if (e.key === '0') {
        resetZoom()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, isModalOpen, zoom])

  // Prevent body scroll when modal is open and hide header
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('modal-open')
      
      // Hide header
      const header = document.querySelector('header')
      if (header) {
        header.style.display = 'none'
      }
      
      // Specifically target buttons with "SATIN AL" or "WhatsApp Destek" text
      const buttons = document.querySelectorAll('button')
      buttons.forEach(button => {
        const buttonText = button.textContent?.trim() || ''
        if ((buttonText.includes('SATIN AL') || buttonText.includes('WhatsApp Destek') || buttonText.includes('Hemen Al')) &&
            !modalRef.current?.contains(button)) {
          button.setAttribute('data-original-display', button.style.display || 'initial')
          button.style.display = 'none'
        }
      })
      
      // Also hide the mobile sticky bottom bar specifically
      const mobileBottomBar = document.querySelector('.lg\\:hidden.fixed.bottom-0')
      if (mobileBottomBar) {
        const element = mobileBottomBar as HTMLElement
        element.setAttribute('data-original-display', element.style.display || 'initial')
        element.style.display = 'none'
      }
      
    } else {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('modal-open')
      
      // Restore header
      const header = document.querySelector('header')
      if (header) {
        header.style.display = ''
      }
      
      // Restore all hidden elements
      const hiddenElements = document.querySelectorAll('[data-original-display]')
      hiddenElements.forEach(el => {
        const element = el as HTMLElement
        const originalDisplay = element.getAttribute('data-original-display') || ''
        element.style.display = originalDisplay === 'initial' ? '' : originalDisplay
        element.removeAttribute('data-original-display')
      })
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('modal-open')
      // Cleanup on unmount
      const header = document.querySelector('header')
      if (header) {
        header.style.display = ''
      }
      // Restore any hidden elements
      const hiddenElements = document.querySelectorAll('[data-original-display]')
      hiddenElements.forEach(el => {
        const element = el as HTMLElement
        const originalDisplay = element.getAttribute('data-original-display') || ''
        element.style.display = originalDisplay === 'initial' ? '' : originalDisplay
        element.removeAttribute('data-original-display')
      })
    }
  }, [isModalOpen])

  useEffect(() => {
    const img = mainImageRef.current
    if (!img) return

    if (img.complete && img.naturalWidth > 0) {
      setImageLoaded(true)
      return
    }

    setImageLoaded(false)

    const handleLoad = () => setImageLoaded(true)
    const handleError = () => setImageLoaded(true)

    img.addEventListener('load', handleLoad)
    img.addEventListener('error', handleError)

    return () => {
      img.removeEventListener('load', handleLoad)
      img.removeEventListener('error', handleError)
    }
  }, [selectedImage, images[selectedImage]?.url])

  const navigateImage = (direction: 'prev' | 'next') => {
    let newIndex = selectedImage
    if (direction === 'prev') {
      newIndex = selectedImage === 0 ? images.length - 1 : selectedImage - 1
    } else {
      newIndex = selectedImage === images.length - 1 ? 0 : selectedImage + 1
    }
    setSelectedImage(newIndex)
    setImageLoaded(false)
    resetZoom()
    onImageChange?.(newIndex)
  }

  const handleZoom = (delta: number) => {
    const newZoom = Math.max(0.5, Math.min(5, zoom + delta))
    setZoom(newZoom)
    
    // Reset position if zooming out to 1x or less
    if (newZoom <= 1) {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (!isModalOpen || !imageRef.current) return
    e.preventDefault()
    
    const delta = e.deltaY > 0 ? -0.2 : 0.2
    const newZoom = Math.max(0.5, Math.min(5, zoom + delta))
    
    if (newZoom !== zoom) {
      // Get mouse position relative to the image
      const rect = imageRef.current.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      // Calculate the point in the image that the mouse is over
      const imagePointX = (mouseX - rect.width / 2) / zoom
      const imagePointY = (mouseY - rect.height / 2) / zoom
      
      // Calculate new position to keep the mouse point in the same place
      const newX = position.x - (imagePointX * (newZoom - zoom))
      const newY = position.y - (imagePointY * (newZoom - zoom))
      
      // Limit panning to reasonable bounds
      const maxX = (newZoom - 1) * 300
      const maxY = (newZoom - 1) * 300
      
      setZoom(newZoom)
      setPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY))
      })
    }
  }

  const resetZoom = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch to zoom
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      setTouchDistance(distance)
    } else if (e.touches.length === 1) {
      // Single touch for panning or swiping
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      })
      setTouchStartX(e.touches[0].clientX)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault() // Prevent page scrolling while interacting with image
    
    if (e.touches.length === 2) {
      // Handle pinch zoom
      const newDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      
      if (touchDistance) {
        const scale = newDistance / touchDistance
        const newZoom = Math.max(1, Math.min(5, zoom * scale))
        setZoom(newZoom)
        setTouchDistance(newDistance)
      }
    } else if (e.touches.length === 1 && isDragging) {
      if (zoom > 1) {
        // Pan zoomed image
        const newX = e.touches[0].clientX - dragStart.x
        const newY = e.touches[0].clientY - dragStart.y
        
        const maxX = (zoom - 1) * 300
        const maxY = (zoom - 1) * 300
        
        setPosition({
          x: Math.max(-maxX, Math.min(maxX, newX)),
          y: Math.max(-maxY, Math.min(maxY, newY))
        })
      } else if (touchStartX !== null) {
        // Swipe between images
        const deltaX = e.touches[0].clientX - touchStartX
        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0) {
            navigateImage('prev')
          } else {
            navigateImage('next')
          }
          setTouchStartX(null)
        }
      }
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setTouchDistance(null)
    setTouchStartX(null)
  }

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isModalOpen || zoom <= 1) return
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return
    
    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y
    
    const maxX = (zoom - 1) * 300
    const maxY = (zoom - 1) * 300
    
    setPosition({
      x: Math.max(-maxX, Math.min(maxX, newX)),
      y: Math.max(-maxY, Math.min(maxY, newY))
    })
  }

  const handleMouseLeave = () => {
    if (!isDragging) {
      setZoom(1)
      setPosition({ x: 0, y: 0 })
    }
  }

  const openModal = () => {
    setIsModalOpen(true)
    resetZoom()
  }

  const closeModal = () => {
    setIsModalOpen(false)
    resetZoom()
  }

  // Handle click outside image to close modal
  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && e.target === modalRef.current) {
      closeModal()
    }
  }

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg w-full max-w-full">
      {/* Ana Görsel Konteyner */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 group w-full">
        {/* Loading State */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#8dc63f] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Ana Görsel */}
        <img
          ref={mainImageRef}
          src={images[selectedImage].url}
          alt={images[selectedImage].alt}
          className={`w-full h-full object-contain cursor-zoom-in transition-all duration-500 max-w-full ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onClick={openModal}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 pointer-events-none" />
        
        {/* Navigation Arrows - Desktop Only */}
        {images.length > 1 && !isMobile && (
          <>
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Navigation Arrows - Mobile Only */}
        {images.length > 1 && isMobile && (
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center space-x-8">
            <button
              onClick={() => navigateImage('prev')}
              className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-300 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateImage('next')}
              className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-300 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {/* Full Screen Button */}
          <button
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen()
              } else {
                containerRef.current?.requestFullscreen()
              }
            }}
            className="w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-300 shadow-lg hover:scale-110"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          {/* Zoom Button */}
          <button
            onClick={openModal}
            className="w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-300 shadow-lg hover:scale-110"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
            {selectedImage + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="p-3 lg:p-4 bg-gray-50/50 border-t border-gray-100">
          <div className="flex items-center justify-start lg:justify-center space-x-2 lg:space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImage(index)
                  setImageLoaded(false)
                  onImageChange?.(index)
                }}
                className={`relative flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg lg:rounded-xl overflow-hidden transition-all duration-300 ${
                  selectedImage === index
                    ? 'ring-2 ring-[#8dc63f] ring-offset-1 lg:ring-offset-2 scale-105 shadow-lg'
                    : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-1 hover:scale-105 shadow-md'
                }`}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-contain bg-white max-w-full"
                />
                {selectedImage === index && (
                  <div className="absolute inset-0 bg-[#8dc63f]/10 pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Modal Photo Viewer */}
      {isModalOpen && (
        <div 
          ref={modalRef}
          className="fixed inset-0 bg-black/95 flex items-center justify-center backdrop-blur-sm cursor-pointer"
          style={{ zIndex: 2147483647 }}
          onWheel={handleWheel}
          onClick={handleModalClick}
        >
          <div 
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden cursor-default"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Desktop Modal Action Buttons */}
            {!isMobile && (
              <div className="absolute top-6 right-6 flex items-center space-x-4 z-50">
                {/* Full Screen Button */}
                <button
                  onClick={() => {
                    if (document.fullscreenElement) {
                      document.exitFullscreen()
                    } else {
                      modalRef.current?.requestFullscreen()
                    }
                  }}
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                >
                  <Maximize2 className="w-6 h-6" />
                </button>
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* Mobile Control Panel - Bottom */}
            {isMobile && (
              <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center space-y-4 z-50">
                {/* Navigation Controls */}
                {images.length > 1 && (
                  <div className="flex items-center space-x-6 bg-black/70 rounded-full px-6 py-3">
                    <button
                      onClick={() => navigateImage('prev')}
                      className="w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300"
                    >
                      <ChevronLeft className="w-7 h-7" />
                    </button>
                    <button
                      onClick={() => navigateImage('next')}
                      className="w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300"
                    >
                      <ChevronRight className="w-7 h-7" />
                    </button>
                  </div>
                )}
                
                {/* Zoom Controls */}
                <div className="flex items-center space-x-3 bg-black/70 rounded-full px-6 py-3">
                  <button
                    onClick={() => handleZoom(-0.3)}
                    disabled={zoom <= 0.5}
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-all duration-300"
                  >
                    <ZoomOut className="w-6 h-6" />
                  </button>
                  <span className="text-white text-sm font-medium min-w-[4rem] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={() => handleZoom(0.3)}
                    disabled={zoom >= 5}
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-all duration-300"
                  >
                    <ZoomIn className="w-6 h-6" />
                  </button>
                  <button
                    onClick={resetZoom}
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      if (document.fullscreenElement) {
                        document.exitFullscreen()
                      } else {
                        modalRef.current?.requestFullscreen()
                      }
                    }}
                    className="w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300"
                  >
                    <Maximize2 className="w-7 h-7" />
                  </button>
                  <button
                    onClick={closeModal}
                    className="w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300"
                  >
                    <X className="w-7 h-7" />
                  </button>
                </div>
              </div>
            )}

            {/* Desktop Modal Navigation */}
            {images.length > 1 && !isMobile && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-40"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-40"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Modal Image Counter */}
            {images.length > 1 && (
              <div className={`absolute bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium z-40 ${
                isMobile 
                  ? 'top-6 left-1/2 -translate-x-1/2' 
                  : 'bottom-6 left-1/2 -translate-x-1/2'
              }`}>
                {selectedImage + 1} / {images.length}
              </div>
            )}

            {/* Zoomable Image */}
            <div 
              className="relative flex items-center justify-center"
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
              }}
            >
              <img
                ref={imageRef}
                src={images[selectedImage].url}
                alt={images[selectedImage].alt}
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl select-none transition-transform duration-200 ease-out touch-none"
                style={{
                  transform: `scale(${zoom})`,
                  transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
