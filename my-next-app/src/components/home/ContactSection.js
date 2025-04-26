'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
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
  
  const inputClasses = "w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300";

  return (
    <section className="py-20 md:py-32  relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 ">Lets Discuss Your Project</h2>
            <p className=" text-lg max-w-2xl mx-auto">
              Wed love to hear about your architectural vision. Reach out to start a conversation about your next project.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch bg-neutral-900 min-h-[600px] md:min-h-[700px]">

            {/* Left column - Image */}
            <motion.div 
  className="h-full w-full rounded-lg overflow-hidden"
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  <img 
    src="/images/services/1.jpg" 
    alt="Architecture studio" 
    className="w-full h-full object-cover"
  />
</motion.div>

            
            {/* Right column - Contact form */}
            <motion.div 
              className=" backdrop-blur-sm p-8 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
              
              {isSubmitted ? (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-zinc-300">Thank you for reaching out. Well get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-zinc-300 mb-2">Your Name</label>
                      <motion.input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formState.name} 
                        onChange={handleChange} 
                        className={inputClasses}
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-zinc-300 mb-2">Email Address</label>
                      <motion.input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formState.email} 
                        onChange={handleChange} 
                        className={inputClasses}
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-zinc-300 mb-2">Phone Number</label>
                    <motion.input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formState.phone} 
                      onChange={handleChange} 
                      className={inputClasses}
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-zinc-300 mb-2">Your Message</label>
                    <motion.textarea 
                      id="message" 
                      name="message" 
                      rows="5" 
                      required 
                      value={formState.message} 
                      onChange={handleChange} 
                      className={inputClasses}
                      whileFocus={{ scale: 1.01 }}
                    ></motion.textarea>
                  </div>
                  
                  <motion.button 
                    type="submit" 
                    className="w-full bg-white text-black font-medium py-3 rounded-sm hover:bg-opacity-90 transition-all duration-300 relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}