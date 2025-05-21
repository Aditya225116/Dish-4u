import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
        About <span className="text-red-500">Us</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="text-2xl font-bold mb-4">Our Journey</h3>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Our passion for food and hospitality brought us together in 2020 to create a restaurant that feels like home.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Today, we proudly serve dishes crafted with love and locally sourced ingredients, creating unforgettable moments for our guests.
          </p>
        </div>
        <div>
          <img
            src={assets.about}
            alt="About us"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
      <div className="mt-20 text-center">
        <h4 className="text-2xl font-semibold mb-2">Founded in 2020</h4>
        <p className="text-gray-600 text-lg">4+ years of creating culinary magic & memorable experiences</p>
      </div>
      <div className="mt-20 text-center max-w-3xl mx-auto">
        <h3 className="text-3xl font-bold mb-6 text-red-500">Our Mission</h3>
        <p className="text-gray-700 text-lg mb-10">
          To bring people together through authentic, flavorful dishes and a welcoming atmosphere that celebrates community, culture, and comfort.
        </p>

        <h3 className="text-3xl font-bold mb-6 text-red-500">Our Values</h3>
        <ul className="text-gray-700 text-lg space-y-3 list-disc list-inside text-left">
          <li>🍽️ Fresh, locally-sourced ingredients</li>
          <li>👨‍👩‍👧‍👦 Community-first hospitality</li>
          <li>🌱 Sustainability and mindful cooking</li>
          <li>❤️ Passion, integrity, and culinary creativity</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
