'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ArchitecturalDesignPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  
  // Refs
  const contentRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollStartPositionRef = useRef(0);
  const previousScrollYRef = useRef(0);
  const scrollDirectionRef = useRef(0);
  
  // Force complete animation before proceeding
  const forcingAnimationCompleteRef = useRef(false);
  const animationTimeoutRef = useRef(null);
  
  // Animation progress
  const animationProgress = useMotionValue(0);
  
  // Smoother spring with better parameters
  const smoothProgress = useSpring(animationProgress, {
    stiffness: 35,     // Lower for smoother movement
    damping: 12,       // Lower for smoother transitions
    restDelta: 0.0001,
    mass: 0.8
  });
  
  // Scroll tracking
  const { scrollY } = useScroll();
  
  // Transform definitions
  const imageWidth = useTransform(smoothProgress, [0, 1], ['100%', '60%']);
  const imageLeft = useTransform(smoothProgress, [0, 1], ['0%', '40%']);
  const imageHeight = useTransform(smoothProgress, [0, 1], ['100%', '70%']);
  const imageTop = useTransform(smoothProgress, [0, 1], ['0%', '15%']);
  const textX = useTransform(smoothProgress, [0, 0.3, 1], ['100%', '20%', '0%']);
  const textOpacity = useTransform(smoothProgress, [0, 0.2, 0.4], [0, 0.5, 1]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.3, 1], [1, 0.5, 0]);
  const scrollPromptOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  
  // Check if device is mobile
  useEffect(() => {
    const preloadImage = async () => {
      try {
        const img = new Image();
        img.src = '/images/services/1.jpg';
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setIsLoaded(true);
      } catch (error) {
        setIsLoaded(true);
      }
    };
    
    preloadImage();
    checkIfMobile();
    
    window.addEventListener('resize', checkIfMobile);
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);
  
  const checkIfMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  // CRITICAL: New function to intercept scrolling completely
  const blockScrollAndCompleteAnimation = () => {
    if (forcingAnimationCompleteRef.current) return;
    
    forcingAnimationCompleteRef.current = true;
    
    // Lock body scrolling completely
    document.body.style.overflow = 'hidden';
    
    // Force animation to complete gracefully
    const currentValue = animationProgress.get();
    const targetValue = 1;
    
    // Duration based on how much animation remains
    const remainingFraction = 1 - currentValue;
    const duration = Math.max(remainingFraction * 700, 300); // At least 300ms, max 700ms
    
    // Starting time for animation
    const startTime = performance.now();
    
    // Animation function with easing
    const animateToCompletion = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out-cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      // Calculate new value
      const newValue = currentValue + (targetValue - currentValue) * easedProgress;
      
      // Update animation progress
      animationProgress.set(newValue);
      
      // Continue animation until complete
      if (progress < 1) {
        requestAnimationFrame(animateToCompletion);
      } else {
        // Animation complete
        animationProgress.set(1);
        setAnimationComplete(true);
        
        // Release scroll lock after a brief delay
        animationTimeoutRef.current = setTimeout(() => {
          document.body.style.overflow = '';
          forcingAnimationCompleteRef.current = false;
          setScrollLocked(false);
        }, 100);
      }
    };
    
    // Start the animation
    requestAnimationFrame(animateToCompletion);
  };

  // Enhanced Intersection Observer
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const wasInView = sectionInView;
        
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          // Section coming into view
          setSectionInView(true);
          
          if (!wasInView) {
            // Just entered view - set starting position
            scrollStartPositionRef.current = window.scrollY;
            previousScrollYRef.current = window.scrollY;
            
            // If animation is at beginning, lock scroll
            if (animationProgress.get() < 0.1) {
              setScrollLocked(true);
            }
          }
        } else {
          // Section leaving view
          setSectionInView(false);
          
          // If we were forcing animation, release it
          if (forcingAnimationCompleteRef.current) {
            document.body.style.overflow = '';
            forcingAnimationCompleteRef.current = false;
          }
          
          // Reset animation if barely started
          if (!entry.isIntersecting && animationProgress.get() > 0 && animationProgress.get() < 0.05) {
            animationProgress.set(0);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.25, 0.5, 0.75, 1.0]
      }
    );
    
    observer.observe(sectionRef.current);
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionInView]);
  
  // IMPROVED: Wheel event handler with velocity detection
  const handleWheel = (e) => {
    if (isMobile || !sectionInView) return;
    
    // Get current animation state
    const currentProgress = animationProgress.get();
    
    // Allow normal scrolling at beginning/end when appropriate
    if (currentProgress <= 0.01 && e.deltaY < 0) {
      return;
    }
    
    if (animationComplete && currentProgress >= 0.99 && e.deltaY > 0) {
      return;
    }
    
    // Stop default scroll
    e.preventDefault();
    
    // Track scroll direction
    scrollDirectionRef.current = e.deltaY > 0 ? 1 : -1;
    
    // Check for fast scrolling by examining delta magnitude
    const isHighVelocityScroll = Math.abs(e.deltaY) > 100;
    
    // If scrolling down fast and animation is in progress but not near complete,
    // we should force animation to complete smoothly
    if (isHighVelocityScroll && e.deltaY > 0 && currentProgress > 0.1 && currentProgress < 0.9) {
      blockScrollAndCompleteAnimation();
      return;
    }
    
    // For normal scrolling, update animation progress proportionally
    let sensitivity = 0.002;
    // Reduce sensitivity for fast scrolls to make them more controlled
    if (Math.abs(e.deltaY) > 50) {
      sensitivity *= 0.7;
    }
    
    const newProgress = Math.min(Math.max(currentProgress + (e.deltaY * sensitivity), 0), 1);
    
    // Apply new progress
    animationProgress.set(newProgress);
    
    // Handle animation completion
    if (newProgress >= 0.98 && !animationComplete && scrollDirectionRef.current > 0) {
      setAnimationComplete(true);
      setScrollLocked(false);
    }
    
    // Handle animation reversal
    if (newProgress < 0.98 && animationComplete) {
      setAnimationComplete(false);
      setScrollLocked(true);
    }
  };
  
  // IMPROVED: Browser scroll handling with velocity detection
  useEffect(() => {
    if (isMobile) return;
    
    let lastScrollPosition = window.scrollY;
    let lastScrollTime = performance.now();
    let scrollVelocity = 0;
    
    const handleScroll = () => {
      if (!sectionRef.current || !sectionInView) return;
      
      // Calculate scroll velocity
      const now = performance.now();
      const scrollDelta = window.scrollY - lastScrollPosition;
      const timeDelta = now - lastScrollTime;
      scrollVelocity = Math.abs(scrollDelta / timeDelta) * 100; // Scale for easier comparison
      
      lastScrollPosition = window.scrollY;
      lastScrollTime = now;
      
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Check if section is prominently in view
      const sectionInViewport = sectionTop <= window.scrollY + viewportHeight * 0.3;
      
      // Track scroll direction
      scrollDirectionRef.current = scrollDelta > 0 ? 1 : -1;
      
      // CRITICAL: Detect fast scrolling through the section
      if (sectionInViewport && scrollVelocity > 15 && !forcingAnimationCompleteRef.current) {
        // User is scrolling fast through our section
        const currentProgress = animationProgress.get();
        
        // If scrolling down fast and animation not near complete, force it to complete
        if (scrollDelta > 0 && currentProgress > 0.1 && currentProgress < 0.9) {
          blockScrollAndCompleteAnimation();
          return;
        }
      }
      
      // For locked scrolling during animation
      if (scrollLocked && sectionInViewport) {
        // Calculate animation progress
        const scrollDelta = window.scrollY - previousScrollYRef.current;
        const maxScrollForAnimation = viewportHeight * 0.4;
        
        // Apply progress change
        const progressDelta = scrollDelta / maxScrollForAnimation;
        const newProgress = Math.min(Math.max(animationProgress.get() + progressDelta, 0), 1);
        
        animationProgress.set(newProgress);
        previousScrollYRef.current = window.scrollY;
        
        // Ensure we stay on section during animation
        if (newProgress > 0.01 && newProgress < 0.98) {
          window.scrollTo({ top: sectionTop, behavior: 'auto' });
        }
        
        // Complete animation if needed
        if (newProgress >= 0.98 && !animationComplete && scrollDirectionRef.current > 0) {
          setAnimationComplete(true);
          setScrollLocked(false);
        }
        
        // Reverse animation if needed
        if (scrollDelta < 0 && animationComplete && newProgress < 0.95) {
          setAnimationComplete(false);
          setScrollLocked(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollLocked, animationComplete, sectionInView, isMobile]);
  
  // Set up wheel event handler
  useEffect(() => {
    if (isMobile) return;
    
    const sectionElement = sectionRef.current;
    
    if (sectionElement) {
      sectionElement.addEventListener('wheel', handleWheel, { passive: false });
      
      // Touch support
      let touchStartY = 0;
      
      const touchStartHandler = (e) => {
        touchStartY = e.touches[0].clientY;
      };
      
      const touchMoveHandler = (e) => {
        if (!sectionInView) return;
        
        const currentY = e.touches[0].clientY;
        const deltaY = touchStartY - currentY;
        
        // Prevent default only when animation is in progress
        if (animationProgress.get() > 0 && animationProgress.get() < 1) {
          e.preventDefault();
          
          const wheelEvent = new WheelEvent('wheel', {
            deltaY: deltaY * 2,
            bubbles: true,
            cancelable: true
          });
          
          handleWheel(wheelEvent);
        }
        
        touchStartY = currentY;
      };
      
      sectionElement.addEventListener('touchstart', touchStartHandler, { passive: true });
      sectionElement.addEventListener('touchmove', touchMoveHandler, { passive: false });
      
      return () => {
        sectionElement.removeEventListener('wheel', handleWheel);
        sectionElement.removeEventListener('touchstart', touchStartHandler);
        sectionElement.removeEventListener('touchmove', touchMoveHandler);
      };
    }
  }, [scrollLocked, animationComplete, sectionInView, isMobile]);

  // Card data
  const cardData = [
    {
      id: 0,
      title: "Our Approach",
      content: "We believe in collaborative design processes that integrate client vision, site context, and sustainable practices. Our architecture responds to the environment while creating memorable spaces."
    },
    {
      id: 1,
      title: "Services Include",
      content: [
        "Conceptual Design & Feasibility Studies",
        "Schematic Design & Development",
        "Construction Documentation",
        "Construction Administration"
      ]
    },
    {
      id: 2,
      title: "Project Specialties",
      content: "We specialize in residential, commercial, and institutional architecture with a focus on sustainable design principles and innovative use of materials."
    }
  ];

  return (
    <section id="architectural-design" className="min-h-screen will-change-transform" ref={sectionRef}>
      {/* Loading indicator */}
      {!isLoaded && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-zinc-900 bg-opacity-80 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            <p className="mt-4 font-medium text-white">Loading...</p>
          </div>
        </div>
      )}
      
      {/* Mobile Layout */}
      {isMobile && (
        <div className="flex flex-col w-full">
          <div className="px-8 pt-8">
            <h2 className="text-3xl font-bold">Architectural Design</h2>
          </div>
          
          {/* Image section */}
          <div className="w-full h-64 md:h-72 overflow-hidden -bottom-4 relative px-4 mt-4">
            <img 
              src="/images/services/1.jpg" 
              alt="Architectural Design" 
              className="w-full h-full object-cover rounded-lg"
              loading="eager"
            />
          </div>
          
          {/* Text content with cards */}
          <div className="p-6 bg-zinc-900/40 mx-4 
                  border border-white/10 rounded-xl shadow-xl overflow-hidden backdrop-blur-lg">
            <p className="text-lg mb-4">
              From concept to completion, we create innovative architectural designs that balance form, function, and context.
            </p>
            
            {/* Expandable Cards */}
            <div className="space-y-3 mb-4 rounded-xl shadow-xl overflow-hidden backdrop-blur-lg"
                 style={{ backgroundColor: 'rgba(31, 26, 23, 0.8)' }}>
              {cardData.map((card, index) => (
                <div 
                  key={card.id}
                  className={`rounded-md overflow-hidden transition-all duration-300 ${activeCard === index ? 'bg-zinc-800' : 'bg-zinc-800'}`}
                >
                  <div 
                    className={`px-4 py-3 flex justify-between items-center cursor-pointer ${activeCard === index ? 'bg-zinc-800' : 'hover:bg-zinc-800'}`}
                    onClick={() => setActiveCard(index)}
                  >
                    <h4 className="text-xl font-semibold text-zinc-200">{card.title}</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                      className={`w-5 h-5 transition-transform ${activeCard === index ? 'rotate-180' : ''}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                  
                  {/* Card Content */}
                  <div 
                    className={`px-4 overflow-hidden transition-all duration-300 ${
                      activeCard === index ? 'max-h-96 py-4' : 'max-h-0 py-0'
                    }`}
                  >
                    {Array.isArray(card.content) ? (
                      <ul className="space-y-2 text-zinc-300">
                        {card.content.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-white mt-1">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-zinc-300">{card.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Desktop Layout with optimized animation */}
      {!isMobile && (
        <div className="h-screen w-full sticky top-0 will-change-transform" ref={contentRef}>
          <div className="absolute inset-0">
            <div className="flex h-full will-change-transform">
              {/* Text panel with hardware acceleration */}
              <motion.div 
                className="absolute left-0 top-0 w-full md:w-2/5 h-full z-10 will-change-transform"
                style={{ 
                  x: textX,
                  opacity: textOpacity,
                  willChange: 'transform, opacity'
                }}
              >
                <div className="h-full p-8 md:p-12 flex flex-col justify-center">
                  <h1 className="text-4xl font-bold mb-4 text-zinc-100">Architectural Design</h1>
                  <p className="text-lg text-zinc-300 mb-8">
                    From concept to completion, we create innovative architectural designs that balance form, function, and context.
                  </p>
                  
                  {/* Expandable Cards */}
                  <div className="space-y-3 mb-8 rounded-xl shadow-xl overflow-hidden backdrop-blur-lg">
                    {cardData.map((card, index) => (
                      <div 
                        key={card.id}
                        className={`rounded-md overflow-hidden transition-all duration-300 ${activeCard === index ? 'bg-zinc-800' : 'bg-zinc-800'}`}
                      >
                        <div 
                          className={`px-4 py-3 flex justify-between items-center cursor-pointer ${activeCard === index ? 'bg-zinc-800' : 'hover:bg-zinc-800'}`}
                          onClick={() => setActiveCard(index)}
                        >
                          <h4 className="text-xl font-semibold text-zinc-200">{card.title}</h4>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                            className={`w-5 h-5 transition-transform ${activeCard === index ? 'rotate-180' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>
                        
                        {/* Card Content */}
                        <div 
                          className={`px-4 overflow-hidden transition-all duration-300 ${
                            activeCard === index ? 'max-h-96 py-4' : 'max-h-0 py-0'
                          }`}
                        >
                          {Array.isArray(card.content) ? (
                            <ul className="space-y-2 text-zinc-300">
                              {card.content.map((item, i) => (
                                <li key={i} className="flex items-start">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-white mt-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                  </svg>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-zinc-300">{card.content}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Image with hardware acceleration */}
              <div className="absolute inset-0 h-full overflow-hidden will-change-transform">
                <motion.div 
                  className="absolute inset-0 h-full will-change-transform"
                  style={{ 
                    width: imageWidth,
                    left: imageLeft,
                    height: imageHeight,
                    top: imageTop,
                    willChange: 'transform, width, height, left, top'
                  }}
                >
                  {/* Optimized image loading */}
                  <img 
                    src="/images/services/1.jpg" 
                    alt="Architectural Design" 
                    className="w-full h-full object-cover"
                    style={{willChange: 'transform'}}
                    loading="eager"
                  />
                  
                  {/* Simplified overlay with scroll prompt */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ opacity: overlayOpacity, willChange: 'opacity' }}
                  >
                    <div className="text-white text-center bg-black bg-opacity-30 p-6 rounded-lg backdrop-blur-sm">
                      <motion.div style={{ opacity: scrollPromptOpacity }}>
                        <p className="text-lg">Scroll to explore</p>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Visual indicator */}
          {sectionInView && (
            <div className="fixed bottom-4 left-4 w-3 h-3 rounded-full bg-white opacity-50 z-30 animate-pulse" />
          )}
        </div>
      )}
    </section>
  );
}