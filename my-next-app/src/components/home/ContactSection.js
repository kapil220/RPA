'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Building, FileText } from 'lucide-react';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      }, 3000);
    }, 1500);
  };
  
  const inputClasses = "w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 placeholder-zinc-500";

  const offices = [
    {
      title: "Corporate Office",
      address: "2712, Tower A, The Corenthum\nSector 62, Noida, UP 201301",
      phone: "+91-120-4567890"
    },
    {
      title: "Interior Office",
      address: "Vibhuti Khand\nLucknow 226010",
      phone: "+91-522-1234567"
    },
    {
      title: "Design & Build Office",
      address: "F 1/20, EMAAR GOMTI GREENS\nShaheed Path, Gomti Nagar, Lucknow 226010",
      phone: "+91-522-7654321"
    },
    {
      title: "Gurugram Associate",
      address: "C 97A, Shushant Lok III\nSector 57, Gurugram 122003",
      phone: "+91-124-9876543"
    }
  ];

  const emails = [
    "ravi@rpa.international",
    "admin@rpa.international",
    "office@rpa.international"
  ];

  return (
    <section className="py-20 md:py-32  relative">
      <div className="container mx-auto px-4">
        <div className="max-w-8xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Lets Discuss Your Project</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              We love to hear about your architectural vision. Reach out to start a conversation about your next project.
            </p>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-neutral-900">
            
            {/* Left Column - Contact Form */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-8">Send Us a Message</h3>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-zinc-400">Thank you for reaching out. We will get back to you shortly.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-zinc-300 mb-2 text-sm font-medium">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formState.name} 
                        onChange={handleChange} 
                        className={inputClasses}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-zinc-300 mb-2 text-sm font-medium">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formState.email} 
                        onChange={handleChange} 
                        className={inputClasses}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-zinc-300 mb-2 text-sm font-medium">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formState.phone} 
                      onChange={handleChange} 
                      className={inputClasses}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-zinc-300 mb-2 text-sm font-medium">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="5" 
                      required 
                      value={formState.message} 
                      onChange={handleChange} 
                      className={inputClasses}
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    onClick={handleSubmit}
                    className="w-full bg-white text-black font-medium py-3 rounded-sm hover:bg-zinc-200 transition-all duration-300 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Right Column - Contact Information */}
            <div className="p-8 md:p-12 border-l border-zinc-800 bg-zinc-900/50 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
              
              <div className="space-y-8">
                <div className='grid md:grid-cols-2  gap-6'>
                  <div>
                  <div className="flex items-center mb-4">
                    <Mail className="w-5 h-5 text-white mr-3" />
                    <h4 className="text-lg font-semibold text-white">Email</h4>
                  </div>
                  <div className="space-y-2 pl-8">
                    {emails.map((email, index) => (
                      <a 
                        key={index}
                        href={`mailto:${email}`} 
                        className="block text-zinc-400 hover:text-white transition-colors text-sm"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                  </div>

                  {/* Business Details */}
                  <div>
                  <div className="flex items-center mb-4">
                    <FileText className="w-5 h-5 text-white mr-3" />
                    <h4 className="text-lg font-semibold text-white">Business Details</h4>
                  </div>
                  <div className="pl-8">
                    <p className="text-zinc-400 text-sm">
                      <span className="text-zinc-300 font-medium">GSTIN:</span> 09AMYPP2023Q2Z4
                    </p>
                  </div>
                  </div>
                </div>
                
                {/* Email Section */}
                

                {/* Offices */}
                <div>
                  <div className="flex items-center mb-4">
                    <Building className="w-5 h-5 text-white mr-3" />
                    <h4 className="text-lg font-semibold text-white">Our Offices</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-2">
                    {offices.map((office, index) => (
                      <div key={index} className="bg-zinc-800/50 p-4 rounded-sm">
                        <h5 className="text-white font-medium mb-2 text-sm">{office.title}</h5>
                        <div className="flex items-start text-zinc-400 text-xs mb-2">
                          <MapPin className="w-3 h-3 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="whitespace-pre-line leading-relaxed">{office.address}</span>
                        </div>
                        <div className="flex items-center text-zinc-400 text-xs">
                          <Phone className="w-3 h-3 mr-2" />
                          <a href={`tel:${office.phone}`} className="hover:text-white transition-colors">
                            {office.phone}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}