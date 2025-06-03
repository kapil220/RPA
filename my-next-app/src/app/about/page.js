"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

function AboutUsPage() {
  // Timeline data for company history
  const timelineData = [
    { 
      year: '2015', 
      title: 'Company Founded', 
      description: 'Our journey began with a vision to revolutionize the industry.',
      icon: '🚀'
    },
    { 
      year: '2017', 
      title: 'First Major Project', 
      description: 'Successfully completed our first landmark project, establishing our reputation.',
      icon: '🎯'
    },
    { 
      year: '2019', 
      title: 'International Expansion', 
      description: 'Expanded operations to serve clients across global markets.',
      icon: '🌍'
    },
    { 
      year: '2021', 
      title: 'Innovation Award', 
      description: 'Recognized for our cutting-edge solutions and commitment to excellence.',
      icon: '🏆'
    },
    { 
      year: '2023', 
      title: 'Sustainability Initiative', 
      description: 'Launched our commitment to environmentally sustainable practices.',
      icon: '🌱'
    },
    { 
      year: '2025', 
      title: 'Industry Leadership', 
      description: 'Positioned as industry leaders with unparalleled expertise and innovation.',
      icon: '💡'
    }
  ];

  const [visibleItems, setVisibleItems] = useState(new Set());
  const [progressHeight, setProgressHeight] = useState(0);
  const timelineRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
    
    if (!timelineItems) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, index]));
            // Update progress bar
            const progress = ((index + 1) / timelineItems.length) * 100;
            setProgressHeight(progress);
          }
        });
      },
      { threshold: 0.3 }
    );

    timelineItems.forEach((item) => observerRef.current.observe(item));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="font-sans ">
      {/* Hero Section - Full screen */}
      <section id="hero" className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/Hero.jpg" 
            alt="Company headquarters" 
            className="w-full h-full object-cover opacity-40"
          />
         
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#E8E2D8]">About Our Company</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-[#A6B5A3]">
            Were dedicated to excellence, innovation, and creating value for our clients through transformative solutions.
          </p>
        </div>
      </section>

      {/* Our Story Section - Full screen */}
      <section id="our-story" className="max-h-screen flex items-center py-24 ">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <div className="relative">
                <img 
                  src="/images/services/2.jpg" 
                  alt="Our story" 
                  className="rounded-lg shadow-xl w-full border border-[#483C32]"
                />
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#b17949] rounded-full opacity-80"></div>
                <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-[#A6B5A3] rounded-full opacity-60"></div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-16">
              <h2 className="text-4xl font-bold mb-6 text-[#E8E2D8]">Our Story</h2>
              <p className="text-lg mb-6 text-[#A6B5A3]">
                Founded with a vision to redefine industry standards, our company has grown from humble beginnings to become a trusted partner for clients worldwide.
              </p>
              <p className="text-lg mb-6 text-[#A6B5A3]">
                Throughout our journey, weve maintained an unwavering commitment to innovation, quality, and client satisfaction. Our team of experts brings together diverse perspectives and specialized knowledge to deliver exceptional results.
              </p>
              <p className="text-lg text-[#A6B5A3]">
                Today, we continue to push boundaries and explore new frontiers, driven by our passion for excellence and desire to make a positive impact in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section - Full screen */}
      <section id="our-approach" className="max-h-screen flex items-center py-24 ">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pl-16">
              <div className="relative">
                <img 
                  src="/images/Hero.jpg" 
                  alt="Our approach" 
                  className="rounded-lg shadow-xl w-full border border-[#483C32]"
                />
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#b17949] rounded-full opacity-80"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#A6B5A3] rounded-full opacity-60"></div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-[#E8E2D8]">Our Approach</h2>
              <p className="text-lg mb-6 text-[#A6B5A3]">
                We believe in a collaborative and holistic approach that puts our clients at the center of everything we do. By understanding your unique challenges and goals, we develop tailored solutions that drive meaningful results.
              </p>
              <p className="text-lg mb-6 text-[#A6B5A3]">
                Our methodology combines proven strategies with innovative thinking, ensuring we deliver not just whats expected, but whats truly transformative.
              </p>
              <p className="text-lg text-[#A6B5A3]">
                We prioritize transparent communication, agile processes, and meticulous attention to detail at every stage, from initial concept to final implementation and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company History Section - Creative Timeline */}
      <section id="history" className="min-h-screen flex items-center py-24  relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-12 h-12 bg-[#b17949] rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-8 h-8 bg-[#A6B5A3] rounded-full opacity-15 animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-[#483C32] rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-6 h-6 bg-[#b17949] rounded-full opacity-20 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-[#E8E2D8]">
              Our Journey
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#b17949] to-[#A6B5A3] mx-auto rounded-full"></div>
            <p className="text-[#A6B5A3] mt-4 text-lg">Discover the milestones that shaped our story</p>
          </div>
          
          <div className="relative max-w-6xl mx-auto" ref={timelineRef}>
            {/* Enhanced Timeline Line with Progress */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#483C32] rounded-full">
              <div 
                className="w-full bg-gradient-to-b from-[#b17949] to-[#A6B5A3] rounded-full transition-all duration-700 ease-out shadow-lg"
                style={{ height: `${progressHeight}%` }}
              ></div>
            </div>
            
            {/* Timeline Items */}
            <div className="relative">
              {timelineData.map((item, index) => {
                const isLeft = index % 2 === 0;
                const isVisible = visibleItems.has(index);
                
                return (
                  <div 
                    key={index} 
                    className={`timeline-item mb-16 flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} transition-all duration-700 ${
                      isVisible 
                        ? 'opacity-100 transform translate-y-0' 
                        : 'opacity-0 transform translate-y-8'
                    }`}
                    data-index={index}
                    style={{ 
                      transitionDelay: `${index * 200}ms`,
                      transform: isVisible 
                        ? 'translateY(0)' 
                        : `translateY(50px) ${isLeft ? 'translateX(-50px)' : 'translateX(50px)'}`
                    }}
                  >
                    <div className={`relative backdrop-blur-sm bg-[#1F1F1F]/90 border border-[#483C32] p-8 rounded-2xl shadow-2xl md:w-5/12 ${
                      isLeft ? 'md:mr-12' : 'md:ml-12'
                    } hover:bg-[#1F1F1F]/95 hover:border-[#b17949]/50 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 group`}>
                      
                      {/* Connection Dot */}
                      <div 
                        className="absolute top-8 w-6 h-6 rounded-full bg-gradient-to-r from-[#b17949] to-[#A6B5A3] shadow-lg border-4 border-[#1F1A17] z-10 transition-all duration-300 group-hover:scale-125"
                        style={{ [isLeft ? 'right' : 'left']: '-39px' }}
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#b17949] to-[#A6B5A3] animate-ping opacity-20"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="relative">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-3xl">{item.icon}</span>
                          <span className="bg-gradient-to-r from-[#b17949] to-[#A6B5A3] text-[#E8E2D8] px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                            {item.year}
                          </span>
                        </div>
                        <h4 className="text-2xl font-bold mb-3 text-[#E8E2D8] group-hover:text-[#b17949] transition-colors duration-300">
                          {item.title}
                        </h4>
                        <p className="text-[#A6B5A3] leading-relaxed">
                          {item.description}
                        </p>
                        
                        {/* Decorative corner accents */}
                        <div className={`absolute -top-2 ${isLeft ? '-right-2' : '-left-2'} w-4 h-4 bg-[#b17949] rounded-full opacity-30`}></div>
                        <div className={`absolute -bottom-2 ${isLeft ? '-left-2' : '-right-2'} w-3 h-3 bg-[#A6B5A3] rounded-full opacity-40`}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Direction Section - Full screen */}
      <section id="direction" className="max-h-screen flex items-center py-24 bg-[#1F1F1F]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <div className="relative">
                <img 
                  src="/images/Hero.jpg" 
                  alt="Our direction" 
                  className="rounded-lg shadow-xl w-full border border-[#483C32]"
                />
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#b17949] rounded-full opacity-80"></div>
                <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-[#A6B5A3] rounded-full opacity-60"></div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-16">
              <h2 className="text-4xl font-bold mb-6 text-[#E8E2D8]">Our Direction</h2>
              <p className="text-lg mb-6 text-[#A6B5A3]">
                Looking ahead, were focused on pioneering innovations that address tomorrows challenges while delivering value today. Our strategic vision encompasses expanding into emerging markets, developing cutting-edge solutions, and deepening our expertise.
              </p>
              <p className="text-lg mb-6 text-[#A6B5A3]">
                Were committed to sustainable growth that benefits our clients, employees, and communities alike. By investing in research and development, we continue to push the boundaries of whats possible.
              </p>
              <p className="text-lg text-[#A6B5A3]">
                Our aim is not just to adapt to the future but to shape it, establishing new benchmarks for excellence and innovation that inspire our industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section - Full screen */}
      <section id="advantages" className="min-h-screen flex items-center py-24 ">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pl-16">
              <div className="relative">
                <img 
                  src="/images/Hero.jpg" 
                  alt="Our advantages" 
                  className="rounded-lg shadow-xl w-full border border-[#483C32]"
                />
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#b17949] rounded-full opacity-80"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#A6B5A3] rounded-full opacity-60"></div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-[#E8E2D8]">Our Advantages</h2>
              <div className="space-y-6">
                <div className="group hover:bg-[#1F1F1F]/50 p-4 rounded-lg transition-all duration-300 border border-transparent hover:border-[#483C32]">
                  <h3 className="text-2xl font-semibold mb-2 text-[#b17949] group-hover:text-[#E8E2D8] transition-colors duration-300">Expertise & Experience</h3>
                  <p className="text-lg text-[#A6B5A3]">Our team brings decades of combined experience and specialized knowledge to every project, ensuring solutions that are both innovative and practical.</p>
                </div>
                <div className="group hover:bg-[#1F1F1F]/50 p-4 rounded-lg transition-all duration-300 border border-transparent hover:border-[#483C32]">
                  <h3 className="text-2xl font-semibold mb-2 text-[#b17949] group-hover:text-[#E8E2D8] transition-colors duration-300">Client-Centered Approach</h3>
                  <p className="text-lg text-[#A6B5A3]">We prioritize understanding your unique needs and goals, tailoring our approach to deliver maximum value and impact for your specific situation.</p>
                </div>
                <div className="group hover:bg-[#1F1F1F]/50 p-4 rounded-lg transition-all duration-300 border border-transparent hover:border-[#483C32]">
                  <h3 className="text-2xl font-semibold mb-2 text-[#b17949] group-hover:text-[#E8E2D8] transition-colors duration-300">Innovative Solutions</h3>
                  <p className="text-lg text-[#A6B5A3]">Our commitment to research and development allows us to offer cutting-edge solutions that give our clients a competitive edge in rapidly evolving markets.</p>
                </div>
                <div className="group hover:bg-[#1F1F1F]/50 p-4 rounded-lg transition-all duration-300 border border-transparent hover:border-[#483C32]">
                  <h3 className="text-2xl font-semibold mb-2 text-[#b17949] group-hover:text-[#E8E2D8] transition-colors duration-300">Long-Term Partnership</h3>
                  <p className="text-lg text-[#A6B5A3]">We view our client relationships as partnerships, providing ongoing support and strategic guidance beyond project completion.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUsPage;