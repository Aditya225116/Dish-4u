
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white backdrop-blur-sm shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-500 w-max pb-1">
              About Us
            </h3>
            <p className="text-gray-400 leading-relaxed">
              At <span className="text-white font-semibold">Dish 4U</span>, we serve more than food – we create memories. Join us to taste the difference.
            </p>
          </div>

          
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-500 w-max pb-1">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-400">
              {["Home", "About", "Services", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

         
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-500 w-max pb-1">
              Contact Info
            </h3>
            <div className="text-gray-400 space-y-2">
              <p>Email: <a href="mailto:contact@restaurant.com" className="hover:text-blue-400">contact@restaurant.com</a></p>
              <p>Phone: <a href="tel:+1234567890" className="hover:text-blue-400">+1 234 567 890</a></p>
              <p>Address: Muzaffarpur, Bihar</p>
            </div>
          </div>

          
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-500 w-max pb-1">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebook />, color: "from-blue-500 to-blue-300" },
                { icon: <FaTwitter />, color: "from-cyan-400 to-blue-500" },
                { icon: <FaInstagram />, color: "from-pink-500 to-yellow-500" },
                { icon: <FaLinkedin />, color: "from-blue-700 to-blue-400" },
              ].map(({ icon, color }, index) => (
                <a
                  key={index}
                  href="#"
                  className={`text-white bg-gradient-to-br ${color} p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-300`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        
        <div className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Dish 4u. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
