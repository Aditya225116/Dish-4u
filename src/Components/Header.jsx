import React from "react";
import { assets } from "../assets/assets";
import { Carousel } from "react-responsive-carousel";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        interval={5000}
        className="h-full"
      >
        <div>
          <img
            src={assets.pic1}
            alt="Slide 1"
            className="h-screen w-full object-cover"
          />
        </div>
        <div>
          <img
            src={assets.pic2}
            alt="Slide 2"
            className="h-screen w-full object-cover"
          />
        </div>
        <div>
          <img
            src={assets.pic3}
            alt="Slide 3"
            className="h-screen w-full object-cover"
          />
        </div>
      </Carousel>

      <div className="absolute inset-0 flex items-center">
        <div className="w-full md:w-[42%] h-full flex items-center px-6 md:px-20 bg-black/60">
          <motion.div
            className="text-white max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Dish 4U
            </motion.h1>

            <motion.p
              className="text-lg mb-8 leading-relaxed text-gray-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Experience culinary bliss with hand-picked ingredients, unique
              flavors, and heart-warming ambiance.
            </motion.p>

            <motion.button
              className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded hover:bg-red-500 hover:text-white transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              onClick={() => navigate("/reservation")}
            >
              <span className="text-red-500">●</span> Reservation
            </motion.button>
          </motion.div>
        </div>

        <div className="hidden md:block w-[45%] h-full" />
      </div>

      <motion.div
        className="hidden md:flex flex-col gap-6 absolute top-1/2 right-8 transform -translate-y-1/2 text-white z-10"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <a href="#">
          <FaFacebookF className="hover:text-red-500 transition" />
        </a>
        <a href="#">
          <FaInstagram className="hover:text-red-500 transition" />
        </a>
        <a href="#">
          <FaTwitter className="hover:text-red-500 transition" />
        </a>
      </motion.div>
    </div>
  );
};

export default Header;
