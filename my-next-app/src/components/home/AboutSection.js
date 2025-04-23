'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const textElements = textRef.current.querySelectorAll('.fade-in');
    
    gsap.fromTo(
      textElements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
        },
      }
    );
    
    // Video parallax
    gsap.to(videoRef.current, {
      scrollTrigger: {
        trigger: videoRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      y: -50,
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="about-us" ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden bg-stone-900">
      {/* Background video */}
      <div ref={videoRef} className="absolute inset-0 z-0 opacity-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/about-background.mp4" type="video/mp4" />
        </video>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div ref={textRef} className="text-white">
            <h2 className="fade-in text-3xl md:text-4xl font-bold mb-8 tracking-tight font-playfair">
              Our Vision & Approach
            </h2>
            <p className="fade-in text-lg mb-6 text-zinc-300 leading-relaxed font-inter">
              Founded on principles of sustainable innovation and contextual design, our firm creates spaces that respond to both human needs and environmental concerns.
            </p>
            <p className="fade-in text-lg mb-8 text-zinc-300 leading-relaxed font-inter">
              We believe architecture should be a harmonious dialogue between form, function, and the surrounding environment, resulting in spaces that inspire and endure.
            </p>
            
            <motion.div 
              className="fade-in grid grid-cols-2 gap-6 mt-12"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div>
                <h3 className="text-4xl font-bold text-white mb-2 font-inter stat-number">15+</h3>
                <p className="text-zinc-400 font-playfair stat-label">Years Experience</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-white mb-2 font-inter stat-number">120+</h3>
                <p className="text-zinc-400 font-playfair stat-label">Projects Completed</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-white mb-2 font-inter stat-number">38</h3>
                <p className="text-zinc-400 font-playfair stat-label">Design Awards</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-white mb-2 font-inter stat-number">24</h3>
                <p className="text-zinc-400 font-playfair stat-label">Team Members</p>
              </div>
            </motion.div>
          </div>
          
          {/* Right column - Team image grid */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-3">
              <div className="overflow-hidden rounded-lg h-64">
                <motion.img 
                  src="/images/team/1.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="overflow-hidden rounded-lg h-40">
                <motion.img 
                  src="/images/team/2.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
            <div className="space-y-3 mt-12">
              <div className="overflow-hidden rounded-lg h-40">
                <motion.img 
                  src="/images/team/3.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="overflow-hidden rounded-lg h-64">
                <motion.img 
                  src="/images/team/4.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}