import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaTwitter, FaLinkedin, FaPinterest } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

const socialLinks = [
  { name: "instagram", url: "https://instagram.com", icon: <FaInstagram /> },
  { name: "twitter", url: "https://twitter.com", icon: <FaTwitter /> },
  { name: "linkedin", url: "https://linkedin.com", icon: <FaLinkedin /> },
  { name: "pinterest", url: "https://pinterest.com", icon: <FaPinterest /> },
];

  return (
    <footer className="bg-stone-950 text-stone-300 py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Top Section - Logo, Description, Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <div className="flex items-center justify-start mb-6">
              <Image
                src="/images/logo2.png"
                alt="Logo"
                height={50}
                width={50}
                className="w-24 h-12"
              />
              <div className="flex flex-col ml-2">
                <span className="text-3xl text-stone-300 font-serif">
                  RAVI PRAKASH ARCHITECTS
                </span>
              </div>
            </div>
            <p className="text-stone-600 mb-6 font-serif text-lg leading-relaxed">
              Creating timeless architectural spaces that honor tradition while embracing innovation.
            </p>
            <div className="flex space-x-4">
  {socialLinks.map(({ name, url, icon }) => (
    <a
      key={name}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-stone-600 hover:text-stone-300 transition-colors"
      aria-label={`Visit our ${name} page`}
    >
      <div className="w-6 h-6">{icon}</div>
    </a>
  ))}
</div>
          </div>

          {/* Newsletter */}
          <div className="lg:pl-12">
            <h3 className="text-xl font-serif font-medium mb-4 text-stone-200">Stay Updated</h3>
            <p className="text-stone-600 mb-6 font-serif">
              Subscribe to receive updates on our latest projects and architectural insights.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white border border-stone-300 py-3 px-4 text-stone-800 placeholder-stone-500 focus:ring-2 focus:ring-stone-600 focus:border-stone-600 transition-all"
                required
              />
              <button
                type="submit"
                className="bg-stone-800 text-white py-3 px-8 font-serif hover:bg-stone-700 transition-colors w-full sm:w-auto"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-800 mb-12"></div>

        {/* Middle Section - 4 Equal Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Navigation */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-6 text-stone-200">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Our Projects', path: '/projects' },
                { label: 'Services', path: '/services' },
                { label: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span className="text-stone-200 hover:text-stone-400 transition-colors cursor-pointer font-serif text-sm leading-relaxed">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-6 text-stone-200">Contact Info</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-stone-300 mb-2 text-sm font-serif">Email</p>
                <div className="space-y-1">
                  <p className="text-sm font-serif leading-relaxed">
                    <a href="mailto:ravi@rpa.international" className="text-stone-600 hover:text-stone-300 transition-colors">
                      ravi@rpa.international
                    </a>
                  </p>
                  <p className="text-sm font-serif leading-relaxed">
                    <a href="mailto:admin@rpa.international" className="text-stone-600 hover:text-stone-300 transition-colors">
                      admin@rpa.international
                    </a>
                  </p>
                  <p className="text-sm font-serif leading-relaxed">
                    <a href="mailto:office@rpa.international" className="text-stone-600 hover:text-stone-300 transition-colors">
                      office@rpa.international
                    </a>
                  </p>
                </div>
              </div>
              
              <div>
                <p className="font-medium text-stone-300 mb-2 text-sm font-serif">Business Details</p>
                <p className="text-stone-600 text-sm font-serif leading-relaxed">
                  GSTIN: <span className="font-mono">09AMYPP2023Q2Z4</span>
                </p>
              </div>
            </div>
          </div>

          {/* Office Locations - First Two */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-6 text-stone-200">Offices</h3>
            <div className="space-y-6">
              <address className="not-italic text-stone-600 font-serif">
                <div>
                  <p className="font-medium text-stone-300 mb-2 text-sm font-serif">CORPORATE Office</p>
                  <p className="text-sm font-serif leading-relaxed">2712, Tower A</p>
                  <p className="text-sm font-serif leading-relaxed">The Corenthum, Sector 62</p>
                  <p className="text-sm font-serif leading-relaxed">Noida, UP 201301</p>
                  <p className="text-sm font-serif leading-relaxed">
                    <a href="+91 81271 95541" className="text-stone-600 hover:text-stone-300 transition-colors">
                      +91 81271 95541
                    </a>
                  </p>
                </div>
              </address>
              
              <address className="not-italic text-stone-600 font-serif">
                <div>
                  <p className="font-medium text-stone-300 mb-2 text-sm font-serif">Interior Office</p>
                  <p className="text-sm font-serif leading-relaxed">Vibhuti Khand, 226010</p>
                  <p className="text-sm font-serif leading-relaxed">
                    <a href="+91 81271 95541" className="text-stone-600 hover:text-stone-300 transition-colors">
                      +91 81271 95541
                    </a>
                  </p>
                </div>
              </address>
            </div>
          </div>

          {/* Office Locations - Last Two */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-6 text-stone-200 opacity-0">Offices</h3>
            <div className="space-y-6">
              <address className="not-italic text-stone-600 font-serif">
                <div>
                  <p className="font-medium text-stone-300 mb-2 text-sm font-serif">Design & Build Office</p>
                  <p className="text-sm font-serif leading-relaxed">F 1/20, EMAAR GOMTI GREENS</p>
                  <p className="text-sm font-serif leading-relaxed">Shaheed Path, Gomti Nagar</p>
                  <p className="text-sm font-serif leading-relaxed">Lucknow 226010</p>
                  <p className="text-sm font-serif leading-relaxed">
                    <a href="+91 81271 95541" className="text-stone-600 hover:text-stone-300 transition-colors">
                      +91 81271 95541
                    </a>
                  </p>
                </div>
              </address>
              
              <address className="not-italic text-stone-600 font-serif">
                <div>
                  <p className="font-medium text-stone-300 mb-2 text-sm font-serif">GURUGRAM Associate</p>
                  <p className="text-sm font-serif leading-relaxed">C 97A, Shushant Lok III</p>
                  <p className="text-sm font-serif leading-relaxed">Sector 57, Gurugram 122003</p>
                  <p className="text-sm font-serif leading-relaxed">
                    <a href="tel:+91 81271 95541" className="text-stone-600 hover:text-stone-300 transition-colors">
                      +91 81271 95541
                    </a>
                  </p>
                </div>
              </address>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-stone-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-stone-500 text-sm font-serif">
              &copy; {currentYear} Ravi Prakash Architects. All rights reserved.
            </p>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/privacy-policy">
                <span className="text-stone-500 hover:text-stone-300 transition-colors cursor-pointer font-serif">
                  Privacy Policy
                </span>
              </Link>
              <span className="text-stone-600">•</span>
              <Link href="/terms-of-service">
                <span className="text-stone-500 hover:text-stone-300 transition-colors cursor-pointer font-serif">
                  Terms of Service
                </span>
              </Link>
              <span className="text-stone-600">•</span>
              <Link href="/faqs">
                <span className="text-stone-500 hover:text-stone-300 transition-colors cursor-pointer font-serif">
                  FAQs
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}