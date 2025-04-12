import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export const initScrollAnimations = () => {
  gsap.registerPlugin(ScrollTrigger);
  
  // Fade in elements as they enter viewport
  gsap.utils.toArray('.fade-in-section').forEach(section => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
  
  // Stagger elements children
  gsap.utils.toArray('.stagger-section').forEach(section => {
    const elements = section.querySelectorAll('.stagger-item');
    
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
};

export const initParallaxEffects = () => {
  // This is a simplified version since we have a dedicated component for parallax
  // This would handle additional parallax elements not using the component
  gsap.utils.toArray('.parallax-bg').forEach(section => {
    const image = section.querySelector('img');
    
    gsap.to(image, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
};