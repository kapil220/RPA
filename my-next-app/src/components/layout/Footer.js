import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="relative h-12 w-48 mb-6">
              <Image 
                src="/images/logo-white.svg" 
                alt="Horizon Architecture" 
                layout="fill" 
                objectFit="contain"
              />
            </div>
            <p className="text-gray-400 mb-6">
              Creating innovative and sustainable architectural spaces that inspire and endure.
            </p>
            <div className="flex space-x-4">
              {['instagram', 'twitter', 'linkedin', 'pinterest'].map((social) => (
                <a 
                  key={social}
                  href={`https://${social}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={`Visit our ${social} page`}
                >
                  <div className="w-6 h-6 relative">
                    <Image 
                      src={`/images/icons/${social}.svg`} 
                      alt={social} 
                      layout="fill" 
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Navigation</h3>
            <ul className="space-y-4">
              {[
                { label: 'Home', path: '/' },
                { label: 'About', path: '/about' },
                { label: 'Projects', path: '/projects' },
                { label: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Contact</h3>
            <address className="not-italic text-gray-400 space-y-4">
              <p>123 Design Avenue</p>
              <p>New York, NY 10001</p>
              <p>
                <a href="mailto:info@horizonarchitecture.com" className="hover:text-white transition-colors">
                  info@horizonarchitecture.com
                </a>
              </p>
              <p>
                <a href="tel:+12125550123" className="hover:text-white transition-colors">
                  +1 (212) 555-0123
                </a>
              </p>
            </address>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Subscribe</h3>
            <p className="text-gray-400 mb-4">
              Join our newsletter to stay updated on our latest projects and news.
            </p>
            <form className="space-y-4">
              <div>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-gray-800 border-none rounded-none py-3 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-white"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="bg-white text-black py-3 px-6 uppercase text-sm tracking-wider hover:bg-gray-200 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Horizon Architecture. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy">
              <span className="text-gray-500 hover:text-white text-sm transition-colors cursor-pointer">
                Privacy Policy
              </span>
            </Link>
            <Link href="/terms-of-service">
              <span className="text-gray-500 hover:text-white text-sm transition-colors cursor-pointer">
                Terms of Service
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}