import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
  }>;
  title?: string;
  language?: 'eng' | 'ger';
}

const ImageGalleryComponent: React.FC<ImageGalleryProps> = ({ images, title, language = 'eng' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Memoize callbacks to prevent recreation
  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const nextLightboxImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevLightboxImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevLightboxImage();
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, prevLightboxImage, nextLightboxImage, closeLightbox]);

  // Memoize current image data
  const currentImage = useMemo(() => images?.[currentIndex], [images, currentIndex]);
  const lightboxImage = useMemo(() => images?.[lightboxIndex], [images, lightboxIndex]);

  // Show "Coming Soon" placeholder when no images
  if (!images || images.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-spice-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 md:p-8 transition-colors">
        {title && (
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">{title}</h3>
        )}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 border-2 border-dashed border-spice-200 dark:border-slate-700 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12">
            <div className="mb-4 sm:mb-6 p-4 sm:p-6 rounded-full bg-primary-50 dark:bg-primary-900/20">
              <ImageIcon className="h-8 w-8 sm:h-12 sm:w-12 text-primary-500 dark:text-primary-400" />
            </div>
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 dark:text-slate-300 mb-2">
              {language === 'eng' ? 'Coming Soon' : 'Demnächst verfügbar'}
            </h4>
            <p className="text-sm sm:text-base text-gray-500 dark:text-slate-400 max-w-md">
              {language === 'eng' 
                ? 'Images will be available soon. Please check back later.' 
                : 'Bilder werden in Kürze verfügbar sein. Bitte schauen Sie später noch einmal vorbei.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-spice-200 dark:border-slate-800 rounded-xl p-8 transition-colors">
        {title && (
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h3>
        )}
        
        {/* Main Carousel */}
        <div className="relative">
          {/* Main Image */}
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-800">
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              title={currentImage.title || currentImage.alt}
              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => openLightbox(currentIndex)}
            />
            
            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/70 dark:bg-slate-900/80 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-all hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-all hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                  currentIndex === index
                    ? 'border-primary-500 ring-2 ring-primary-500/20'
                    : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  title={image.title || image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}

        {/* Image Title */}
        {currentImage.title && (
          <p className="mt-4 text-center text-gray-600 dark:text-slate-400 text-sm font-medium">
            {currentImage.title}
          </p>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Lightbox Image */}
          <div className="relative max-w-7xl max-h-full">
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              title={lightboxImage.title || lightboxImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Lightbox Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevLightboxImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextLightboxImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Image Info */}
          {lightboxImage.title && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
              {lightboxImage.title}
            </div>
          )}

          {/* Lightbox Counter */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

// Memoize component
export const ImageGallery = React.memo(ImageGalleryComponent);
