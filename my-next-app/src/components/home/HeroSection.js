'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const heroImages = [
  '/images/Hero.jpg',
  '/images/portfolio/2.jpg',
  '/images/portfolio/3.jpg',
  '/images/portfolio/4.jpg',
];

export default function HeroSection() {
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      textRef.current?.querySelectorAll('.hero-text') || [],
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power3.out',
      }
    );

    gsap.to(videoRef.current, {
      scrollTrigger: {
        trigger: videoRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 200,
      scale: 1.1,
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Auto image slider every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Image container with manual opacity */}
      <div ref={videoRef} className="absolute inset-0 z-0">
        {heroImages.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Hero ${index}`}
            fill
            priority={index === 0}
            className={`object-cover absolute inset-0 transition-opacity duration-1000 ${
              currentImage === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            quality={100}
            sizes="100vw"
          />
        ))}
        <div className="absolute inset-0 bg-black/50 z-20" />
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImage(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentImage === idx ? 'bg-white/80' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-30 flex h-full w-full items-end justify-center text-white px-4 pb-12">
  <div ref={textRef} className="max-w-4xl text-center">
  
    <p className="hero-text text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
      Where vision meets precision and innovation transforms environments
    </p>
    <div>
      <button className="hero-text bg-white text-black px-8 py-3 rounded-sm text-lg font-medium hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
        Explore Our Work
      </button>
    </div>
  </div>
</div>

    </section>
  );
}
