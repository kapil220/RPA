"use client"

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/lib/data';
import { Share2, X, Copy, Instagram, Facebook, Send } from 'lucide-react';

export default function Portfolio() {
  const sectionRef = useRef(null);
  const projectsRef = useRef(null);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'interior', label: 'Interior Design' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'commercial', label: 'Commercial' }
  ];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  useEffect(() => {
    // Register GSAP plugins
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate projects on page load
      const projectElements = document.querySelectorAll('.project-card');
      
      gsap.set(projectElements, { 
        y: 50,
        opacity: 0
      });
      
      gsap.to(projectElements, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top bottom-=100",
          end: "bottom center",
          toggleActions: "play none none none"
        }
      });
      
      // Clean up
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [selectedCategory]); // Re-run when category changes

  const openShareModal = (e, project) => {
    e.preventDefault(); // Prevent navigating to project page
    e.stopPropagation(); // Stop event bubbling
    setSelectedProject(project);
    setShareModalOpen(true);
  };

  const closeShareModal = () => {
    setShareModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
      setCopySuccess(false);
    }, 300);
  };

  const copyToClipboard = () => {
    if (!selectedProject) return;
    
    const url = `${window.location.origin}/portfolio/${selectedProject.slug}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  const shareToSocial = (platform) => {
    if (!selectedProject) return;
    
    const url = `${window.location.origin}/portfolio/${selectedProject.slug}`;
    const text = `Check out this amazing project: ${selectedProject.title}`;
    
    let shareUrl;
    
    switch(platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct share URL, but we can open Instagram
        shareUrl = `https://instagram.com`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="h-screen w-full relative">
        <div className="relative w-full h-full">
          <Image
            src="/images/Hero.jpg"
            alt="Portfolio Hero Image"
            fill
            priority
            className="object-cover z-0"
          />
          <div className="absolute inset-0 z-5 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
          <div className="absolute bottom-20 left-20 z-10 text-left text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Crafting Digital Experiences</h2>
            <p className="text-xl max-w-xl">
              From concept to completion, we build solutions that inspire and perform
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Filter and Projects */}
      <section ref={sectionRef} className="py-20 bg-stone-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 font-medium transition duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-white text-blue-600'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          <div 
            ref={projectsRef} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map(project => (
              <div key={project.id} className="relative">
                <Link 
                  href={`/portfolio/${project.slug}`}
                  className="project-card block bg-black border border-amber-50 overflow-hidden shadow-xl transition duration-300 hover:transform hover:scale-105"
                >
                  <div className="relative h-64">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 2).map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span>{project.location}</span>
                      <span>{project.area}</span>
                    </div>
                  </div>
                </Link>
                {/* Share Button */}
                <button 
                  onClick={(e) => openShareModal(e, project)}
                  className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-black rounded-full shadow-md transition duration-300 z-10"
                  aria-label="Share project"
                >
                  <Share2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 border border-zinc-800 rounded-xl">
              <span className="block text-4xl font-bold mb-2">120+</span>
              <span className="text-gray-400">Projects Completed</span>
            </div>
            <div className="p-6 border border-zinc-800 rounded-xl">
              <span className="block text-4xl font-bold mb-2">95%</span>
              <span className="text-gray-400">Client Satisfaction</span>
            </div>
            <div className="p-6 border border-zinc-800 rounded-xl">
              <span className="block text-4xl font-bold mb-2">15+</span>
              <span className="text-gray-400">Industry Awards</span>
            </div>
            <div className="p-6 border border-zinc-800 rounded-xl">
              <span className="block text-4xl font-bold mb-2">8</span>
              <span className="text-gray-400">Years of Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-white bg-stone-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Lets Work Together</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Have a project in mind? Wed love to bring your vision to life.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition duration-300">
            Start a Project
          </button>
        </div>
      </section>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-xl shadow-xl max-w-sm w-full p-6 relative animate-fade-in">
            <button 
              onClick={closeShareModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-white mb-6">
  Share &quot;{selectedProject?.title}&quot;
</h3>


            <div className="grid grid-cols-2 gap-4 mb-6">
              <button 
                onClick={() => shareToSocial('instagram')}
                className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:opacity-90 transition"
              >
                <Instagram size={20} />
                <span>Instagram</span>
              </button>

              <button 
                onClick={() => shareToSocial('facebook')}
                className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Facebook size={20} />
                <span>Facebook</span>
              </button>

              <button 
                onClick={() => shareToSocial('telegram')}
                className="flex items-center justify-center gap-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                <Send size={20} />
                <span>Telegram</span>
              </button>

              <button 
                onClick={() => shareToSocial('whatsapp')}
                className="flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path>
                  <path d="M5.339 21.32l.477-1.732C4.003 17.79 3 15.493 3 13c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10a9.956 9.956 0 01-5.03-1.36l-2.631.68zM12 4c-4.971 0-9 4.029-9 9 0 2.225.81 4.272 2.156 5.852l-.508 1.842 1.903-.494A8.961 8.961 0 0012 22c4.971 0 9-4.029 9-9s-4.029-9-9-9z"></path>
                </svg>
                <span>WhatsApp</span>
              </button>
            </div>

            <div className="relative">
              <button 
                onClick={copyToClipboard}
                className="w-full flex items-center justify-center gap-2 p-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition"
              >
                <Copy size={20} />
                <span>{copySuccess ? "Copied!" : "Copy Link"}</span>
              </button>
              {copySuccess && (
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-green-400 text-sm">
                  Link copied!
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}