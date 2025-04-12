import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ParallaxEffect({ imageUrl, height = '50vh', children }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    
    if (!container || !image) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      
      // Only apply effect when container is in view
      if (
        scrollPosition + window.innerHeight >= containerTop &&
        scrollPosition <= containerTop + containerHeight
      ) {
        const relativeScroll = scrollPosition - containerTop;
        const translateY = relativeScroll * 0.4;
        
        image.style.transform = `translateY(${translateY}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ height }}
    >
      <div 
        ref={imageRef}
        className="absolute inset-0 h-[120%] w-full -top-[10%]"
      >
        <Image
          src={imageUrl}
          alt="Parallax background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      {children}
    </div>
  );
}