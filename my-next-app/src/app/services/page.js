"use client"

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Services() {
  const [visibleCardIndex, setVisibleCardIndex] = useState(null);
  const serviceRefs = useRef([]);
  
  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom websites built with cutting-edge technologies that deliver exceptional user experiences tailored to your business needs.",
      icon: "💻"
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that bring your ideas to life on iOS and Android platforms.",
      icon: "📱"
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "User-centered design solutions that enhance usability and create visually appealing interfaces that engage your audience.",
      icon: "🎨"
    },
    {
      id: 4,
      title: "Digital Marketing",
      description: "Strategic marketing campaigns to increase your online presence and reach your target audience effectively.",
      icon: "📈"
    }
  ];

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-100px 0px',
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setVisibleCardIndex(index);
        }
      });
    }, options);

    serviceRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      serviceRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Heading Section First */}
      <section className=" py-32 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">Our Services</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover how we can transform your business with our premium services
          </p>
        </div>
      </section>

      {/* Full Screen Image Section */}
      <section className="h-screen w-full relative">
        <div className="relative w-full h-full">
          <Image
            src="/images/Hero.jpg" // Replace with your actual image path
            alt="Services Hero Image"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* Services Cards Section */}
      {/* Services Cards Section */}
<section className="py-20 bg-gray-100 relative min-h-screen">
  <div className="container mx-auto px-4 relative h-[200vh]">
    <h2 className="text-4xl font-bold text-center mb-16 sticky top-10 z-20">What We Offer</h2>

    <div className="sticky top-32 h-[400px] w-full mx-auto flex items-center justify-center">
      <div className="relative w-[90%] h-64">
        {services.map((service, index) => (
          <div
            key={service.id}
            ref={(el) => (serviceRefs.current[index] = el)}
            className={`absolute top-0 left-0 w-full h-64 transition-all duration-700 ease-out transform
              ${visibleCardIndex === index ? 'opacity-100 scale-100 z-10' :
                visibleCardIndex < index ? 'opacity-0 scale-50 z-0' : 'opacity-0 scale-125 z-0'}`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <div className="bg-white rounded-xl shadow-xl p-6 h-full flex items-start gap-4">
              <div className="text-4xl">{service.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* Call to Action */}
      <section className="py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Contact us today to discuss how our services can help you achieve your business goals.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition duration-300">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}