import React from "react";
import { FaHeart, FaCode, FaLaptopCode } from "react-icons/fa";

const About = () => {
  return (
    <>
      {/* First About Us Section - Image on Left */}
      <section className="relative py-16 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Heading */}
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12 animate__animated animate__fadeInDown">
            About Us
          </h2>

          {/* About Content */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left Side - Image */}
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <img
                src="https://img.freepik.com/free-photo/technology-communication-icons-symbols-concept_53876-120314.jpg?ga=GA1.1.1139437995.1723613942&semt=ais_hybrid"
                alt="About Us"
                className="rounded-lg shadow-lg transform transition-transform duration-700 hover:scale-105 animate__animated animate__fadeInLeft"
              />
            </div>

            {/* Right Side - Text */}
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 animate__animated animate__fadeInRight">
                Welcome to our blog! We are passionate about coding and
                technology. Our mission is to share valuable insights,
                tutorials, and stories to help developers of all levels enhance
                their skills and stay updated with the latest trends.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 animate__animated animate__fadeInRight animate__delay-1s">
                Our blog covers a wide range of topics, including JavaScript,
                React, Node.js, CSS, and much more. Whether you're a beginner or
                an experienced developer, you'll find something here that sparks
                your interest.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 animate__animated animate__fadeInRight animate__delay-2s">
                Join us on this journey of learning and growth. Let's code,
                create, and innovate together!
              </p>

              {/* Icons */}
              <div className="flex mt-8 gap-6">
                <FaHeart className="text-teal-600 text-4xl animate__animated animate__fadeInUp" />
                <FaCode className="text-teal-600 text-4xl animate__animated animate__fadeInUp animate__delay-1s" />
                <FaLaptopCode className="text-teal-600 text-4xl animate__animated animate__fadeInUp animate__delay-2s" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second About Us Section - Image on Right */}
      <section className="relative py-16 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Heading */}

          {/* About Content */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Right Side - Text */}
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 animate__animated animate__fadeInRight">
                Welcome to our blog! We are passionate about coding and
                technology. Our mission is to share valuable insights,
                tutorials, and stories to help developers of all levels enhance
                their skills and stay updated with the latest trends.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 animate__animated animate__fadeInRight animate__delay-1s">
                Our blog covers a wide range of topics, including JavaScript,
                React, Node.js, CSS, and much more. Whether you're a beginner or
                an experienced developer, you'll find something here that sparks
                your interest.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 animate__animated animate__fadeInRight animate__delay-2s">
                Join us on this journey of learning and growth. Let's code,
                create, and innovate together!
              </p>

              {/* Icons */}
              <div className="flex mt-8 gap-6">
                <FaHeart className="text-teal-600 text-4xl animate__animated animate__fadeInUp" />
                <FaCode className="text-teal-600 text-4xl animate__animated animate__fadeInUp animate__delay-1s" />
                <FaLaptopCode className="text-teal-600 text-4xl animate__animated animate__fadeInUp animate__delay-2s" />
              </div>
            </div>

            {/* Left Side - Image */}
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <img
                src="https://img.freepik.com/premium-photo/word-blog-is-written-wooden-cubes-blocks-are-placed-old-wooden-board-illuminated-by-sun-background-is-brightly-blooming-shrub_384017-3037.jpg?ga=GA1.1.1139437995.1723613942&semt=ais_hybrid"
                alt="About Us"
                className="rounded-lg shadow-lg transform transition-transform duration-700 hover:scale-105 animate__animated animate__fadeInRight"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
