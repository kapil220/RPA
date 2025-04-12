'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function UrbanPlanningPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const contentRef = useRef(null);
  
  // Page load animation
  useEffect(() => {
    const preloadImage = async () => {
      try {
        const img = new Image();
        img.src = '/images/services/3.jpg';
        img.onload = () => {
          setIsLoaded(true);
        };
        img.onerror = () => {
          setIsLoaded(true);
        };
      } catch (error) {
        console.error('Failed to preload image:', error);
        setIsLoaded(true);
      }
    };
    
    preloadImage();
  }, []);

  // Scroll animation logic
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end start"]
  });
  
  // Transform scrollYProgress (0-1) to our reveal percentage (0-100)
  const textRevealPercentage = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const imagePositionLeft = useTransform(scrollYProgress, [0, 0.3], [0, 40]);
  const imageWidth = useTransform(scrollYProgress, [0, 0.3], [100, 60]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="min-h-screen bg-zinc-900 py-16" ref={contentRef}>
      {/* Navigation */}
   
      
      {/* Loading indicator */}
      {!isLoaded && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-zinc-900">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            <p className="text-white mt-4 font-medium">Loading...</p>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="h-screen w-full sticky top-0">
        <div className="absolute inset-0">
          <div className="flex h-full">
            {/* Text panel */}
            <motion.div 
              className="absolute left-0 top-0 w-full md:w-2/5 h-full bg-zinc-900 z-10"
              style={{ 
                opacity: textRevealPercentage,
                x: useTransform(textRevealPercentage, [0, 100], ["-100%", "0%"])
              }}
            >
              <div className="h-full p-8 md:p-12 flex flex-col justify-center">
              
                <h1 className="text-4xl font-bold mb-4 text-zinc-900">Architectural Design</h1>
                <p className="text-lg text-zinc-600 mb-8">
                  From concept to completion, we create innovative architectural designs that balance form, function, and context.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-zinc-800">Our Approach</h3>
                    <p className="text-zinc-600">
                      We believe in collaborative design processes that integrate client vision, site context, and sustainable practices. Our architecture responds to the environment while creating memorable spaces.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-zinc-800">Services Include</h3>
                    <ul className="space-y-2 text-zinc-600">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-black mt-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Conceptual Design & Feasibility Studies
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-black mt-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Schematic Design & Development
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-black mt-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Construction Documentation
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-black mt-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Construction Administration
                      </li>
                    </ul>
                  </div>
                </div>
                
                <button className="flex items-center text-white bg-black px-6 py-3 rounded-md font-medium group hover:bg-zinc-800 transition-colors">
                  Contact Us
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
            
            {/* Image - Fixed initial position to always show at start */}
            <div className="absolute inset-0 h-full overflow-hidden">
              <motion.div 
                className="absolute inset-0 h-full w-full"
                style={{ 
                  width: useTransform(imageWidth, v => `${v}%`),
                  left: useTransform(imagePositionLeft, v => `${v}%`)
                }}
              >
                <img 
                  src="/images/services/3.jpg" 
                  alt="Architectural Design" 
                  className="w-full h-full object-cover rounded-4xl"
                />
                
                {/* Image overlay */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30"
                  style={{ opacity: overlayOpacity }}
                >
                  <img 
                  src="/images/services/3.jpg" 
                  alt="Architectural Design" 
                  className="w-full h-full object-cover rounded-4xl"
                />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
  
    </div>
  );
}