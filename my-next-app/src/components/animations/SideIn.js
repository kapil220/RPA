import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function ScrollAnimation({ 
  children, 
  animation = 'fadeIn', 
  duration = 0.8, 
  delay = 0,
  threshold = 0.2,
  className = ''
}) {
  const elementRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    const element = elementRef.current;
    
    let tl;
    
    // Different animation types
    switch (animation) {
      case 'fadeIn':
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: `top ${threshold * 100}%`,
            toggleActions: 'play none none none'
          }
        });
        tl.fromTo(
          element,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration, delay }
        );
        break;
        
      case 'slideInLeft':
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: `top ${threshold * 100}%`,
            toggleActions: 'play none none none'
          }
        });
        tl.fromTo(
          element,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration, delay }
        );
        break;
        
      case 'slideInRight':
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: `top ${threshold * 100}%`,
            toggleActions: 'play none none none'
          }
        });
        tl.fromTo(
          element,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration, delay }
        );
        break;
        
      case 'scaleUp':
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: `top ${threshold * 100}%`,
            toggleActions: 'play none none none'
          }
        });
        tl.fromTo(
          element,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration, delay }
        );
        break;
        
      default:
        break;
    }
    
    return () => {
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animation, duration, delay, threshold]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}