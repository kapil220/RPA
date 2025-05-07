import React from 'react';
import { ChevronDown } from 'lucide-react';

function AboutUsPage() {
  // Timeline data for company history
  const timelineData = [
    { year: '2015', title: 'Company Founded', description: 'Our journey began with a vision to revolutionize the industry.' },
    { year: '2017', title: 'First Major Project', description: 'Successfully completed our first landmark project, establishing our reputation.' },
    { year: '2019', title: 'International Expansion', description: 'Expanded operations to serve clients across global markets.' },
    { year: '2021', title: 'Innovation Award', description: 'Recognized for our cutting-edge solutions and commitment to excellence.' },
    { year: '2023', title: 'Sustainability Initiative', description: 'Launched our commitment to environmentally sustainable practices.' },
    { year: '2025', title: 'Industry Leadership', description: 'Positioned as industry leaders with unparalleled expertise and innovation.' }
  ];

  return (
    <div className="font-sans">
      {/* Hero Section - Full screen */}
      <section id="hero" className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/Hero.jpg" 
            alt="Company headquarters" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Our Company</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12">
            Were dedicated to excellence, innovation, and creating value for our clients through transformative solutions.
          </p>
          
        </div>
      </section>

      {/* Our Story Section - Full screen */}
      <section id="our-story" className="min-h-screen flex items-center py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <div className="relative">
                <img 
                  src="/api/placeholder/800/600" 
                  alt="Our story" 
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-16">
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg mb-6">
                Founded with a vision to redefine industry standards, our company has grown from humble beginnings to become a trusted partner for clients worldwide.
              </p>
              <p className="text-lg mb-6">
                Throughout our journey, weve maintained an unwavering commitment to innovation, quality, and client satisfaction. Our team of experts brings together diverse perspectives and specialized knowledge to deliver exceptional results.
              </p>
              <p className="text-lg">
                Today, we continue to push boundaries and explore new frontiers, driven by our passion for excellence and desire to make a positive impact in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section - Full screen */}
      <section id="our-approach" className="min-h-screen flex items-center py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pl-16">
              <div className="relative">
                <img 
                  src="/api/placeholder/800/600" 
                  alt="Our approach" 
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6">Our Approach</h2>
              <p className="text-lg mb-6">
                We believe in a collaborative and holistic approach that puts our clients at the center of everything we do. By understanding your unique challenges and goals, we develop tailored solutions that drive meaningful results.
              </p>
              <p className="text-lg mb-6">
                Our methodology combines proven strategies with innovative thinking, ensuring we deliver not just whats expected, but whats truly transformative.
              </p>
              <p className="text-lg">
                We prioritize transparent communication, agile processes, and meticulous attention to detail at every stage, from initial concept to final implementation and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company History Section - Full screen */}
      <section id="history" className="min-h-screen flex items-center py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Journey</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500"></div>
            
            {/* Timeline Items */}
            <div className="relative">
              {timelineData.map((item, index) => (
                <div key={index} className={`mb-12 flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                  <div className={`relative p-6 rounded-lg shadow-lg md:w-5/12 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                    <div className="absolute top-6 w-4 h-4 rounded-full bg-blue-500 shadow-lg border-4" 
                         style={{ [index % 2 === 0 ? 'right' : 'left']: '-34px' }}></div>
                    <h3 className="text-xl font-bold text-blue-600">{item.year}</h3>
                    <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Direction Section - Full screen */}
      <section id="direction" className="min-h-screen flex items-center py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <div className="relative">
                <img 
                  src="/api/placeholder/800/600" 
                  alt="Our direction" 
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-16">
              <h2 className="text-4xl font-bold mb-6">Our Direction</h2>
              <p className="text-lg mb-6">
                Looking ahead, were focused on pioneering innovations that address tomorrows challenges while delivering value today. Our strategic vision encompasses expanding into emerging markets, developing cutting-edge solutions, and deepening our expertise.
              </p>
              <p className="text-lg mb-6">
                Were committed to sustainable growth that benefits our clients, employees, and communities alike. By investing in research and development, we continue to push the boundaries of whats possible.
              </p>
              <p className="text-lg">
                Our aim is not just to adapt to the future but to shape it, establishing new benchmarks for excellence and innovation that inspire our industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section - Full screen */}
      <section id="advantages" className="min-h-screen flex items-center py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pl-16">
              <div className="relative">
                <img 
                  src="/api/placeholder/800/600" 
                  alt="Our advantages" 
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6">Our Advantages</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Expertise & Experience</h3>
                  <p className="text-lg">Our team brings decades of combined experience and specialized knowledge to every project, ensuring solutions that are both innovative and practical.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Client-Centered Approach</h3>
                  <p className="text-lg">We prioritize understanding your unique needs and goals, tailoring our approach to deliver maximum value and impact for your specific situation.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Innovative Solutions</h3>
                  <p className="text-lg">Our commitment to research and development allows us to offer cutting-edge solutions that give our clients a competitive edge in rapidly evolving markets.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Long-Term Partnership</h3>
                  <p className="text-lg">We view our client relationships as partnerships, providing ongoing support and strategic guidance beyond project completion.</p>
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