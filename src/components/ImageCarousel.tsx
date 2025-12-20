import { useState, useEffect } from 'react';

const images = [
  'https://placehold.co/800x600/E6195F/FFFFFF?text=Reklamni+Panoji',
  'https://placehold.co/800x600/00CED1/FFFFFF?text=Tisk+Majic',
  'https://placehold.co/800x600/991E66/FFFFFF?text=Personalizirani+Izdelki',
  'https://placehold.co/800x600/373A36/FFFFFF?text=HP+Latex+365',
  'https://placehold.co/800x600/E6195F/FFFFFF?text=Visoka+Kakovost',
  'https://placehold.co/800x600/00CED1/FFFFFF?text=Hitro+Tiskanje',
  'https://placehold.co/800x600/991E66/FFFFFF?text=Po+Meri',
  'https://placehold.co/800x600/373A36/FFFFFF?text=Profesionalno',
  'https://placehold.co/800x600/E6195F/FFFFFF?text=Zanesljivo',
  'https://placehold.co/800x600/00CED1/FFFFFF?text=Inovativno'
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsAnimating(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentIndex
                ? 'opacity-100 scale-100 rotate-0'
                : index === (currentIndex - 1 + images.length) % images.length
                ? 'opacity-0 scale-95 -rotate-12'
                : 'opacity-0 scale-95 rotate-12'
            }`}
            style={{
              zIndex: index === currentIndex ? 10 : 1
            }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={() => goToSlide((currentIndex - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full p-2 transition-all duration-200 z-20"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => goToSlide((currentIndex + 1) % images.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full p-2 transition-all duration-200 z-20"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
