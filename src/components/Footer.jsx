import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { resourcesLinks, platformLinks, communityLinks } from "../constants";
import logo from "/images/logo.svg";

const Footer = () => {
  return (
    <footer className="no-cursor bg-green-950 text-white pt-12 px-4 sm:px-16 border-t border-lime-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="logo" className="w-18 h-8 scale-[1.5]" />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Making sustainability smarter with AI. Clean, green, and connected — that’s our mission.
          </p>
          <div className="flex gap-3 mt-2">
            <a href="#" className="hover:text-lime-400 transition-all duration-200"><Facebook size={18} /></a>
            <a href="#" className="hover:text-lime-400 transition-all duration-200"><Twitter size={18} /></a>
            <a href="#" className="hover:text-lime-400 transition-all duration-200"><Instagram size={18} /></a>
            <a href="#" className="hover:text-lime-400 transition-all duration-200"><Linkedin size={18} /></a>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-lg font-semibold text-lime-400 mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            {resourcesLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful Link */}
        <div>
          <h3 className="text-lg font-semibold text-lime-400 mb-4">Useful Link</h3>
          <ul className="space-y-2 text-sm">
            {platformLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold text-lime-400 mb-4">Address</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            B Block, Safal Mondeal Business Park-2,<br />
            Near Gurudwara, Bodakdev,<br />
            S.G. Highway, Ahmedabad-380054,<br />
            Gujarat, India
          </p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10 border-t border-neutral-700 pt-6">
        © {new Date().getFullYear()} World Green Line. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
