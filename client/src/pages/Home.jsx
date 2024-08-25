import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaJs,
  FaReact,
  FaNodeJs,
  FaCss3Alt,
} from "react-icons/fa";
import PostCard from "../components/PostCard";
import ImageCard from "../components/ImageCard";

const categoryData = [
  {
    name: "JavaScript",
    path: "/category/javascript",
    icon: <FaJs className="text-orange-700" />,
    color:
      "bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-white p-5 rounded-lg shadow-md border border-teal-500 hover:bg-gray-900 dark:hover:bg-black transform transition-transform duration-300 hover:scale-105",
  },
  {
    name: "React",
    path: "/category/react",
    icon: <FaReact className="text-blue-500 " />,
    color:
      "bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-white p-5 rounded-lg shadow-md border border-teal-500 hover:bg-gray-900 dark:hover:bg-black transform transition-transform duration-300 hover:scale-105",
  },
  {
    name: "Node.js",
    path: "/category/nodejs",
    icon: <FaNodeJs className="text-green-600 " />,
    color:
      "bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-white p-5 rounded-lg shadow-md border border-teal-500 hover:bg-gray-900 dark:hover:bg-black transform transition-transform duration-300 hover:scale-105",
  },
  {
    name: "CSS",
    path: "/category/css",
    icon: <FaCss3Alt />,
    color:
      "bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-white p-5 rounded-lg shadow-md border border-teal-500 hover:bg-gray-900 dark:hover:bg-black transform transition-transform duration-300 hover:scale-105",
  },
];

const Home = () => {
  const [recentPosts, setRecentPosts] = useState(null);
  const [error, setError] = useState(false);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPosts();
  }, []);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        setRecentPosts(data.posts);
      } catch (error) {
        setError(true);
      }
    };

    fetchRecentPosts();
  }, []);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log("error");
      }
    };
    fetchAllPosts();
  }, []);
  return (
    <div>
      {/* First Section */}
      <div className="min-h-screen bg-slate-200   dark:bg-gray-900 flex items-center justify-center">
        <div className="relative z-10 max-w-5xl mx-auto p-6 flex flex-col md:flex-row items-center justify-between">
          {/* Left Side: Blog Content */}
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-bold text-teal-600 mb-6">
              Welcome to my Blog
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Discover the best developer blogs on any tech stack. The content
              Tech Twitter is talking about, minus the noise. Ranked by
              machines, curated by humans, updated hourly.
            </p>
            <Link
              to="/trends"
              className="inline-flex items-center px-8 py-4 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-500 transform transition-transform duration-300 hover:scale-105"
            >
              Discover Trends
              <FaArrowRight className="ml-2" />
            </Link>
          </div>

          {/* Right Side: Main Card */}
          <div className="mt-12 md:mt-0 w-full md:w-2/4 relative">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 relative">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Jack Franklin's Blog
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                In the last 2 days, Jack Franklin's Blog picked up 0 points 🔥
              </p>
              <Link
                to="/blog/jack-franklin"
                className="inline-flex items-center px-5 py-2 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-500 transform transition-transform duration-300 hover:scale-105"
              >
                Read More
              </Link>
              {/* Smaller Card */}
              <div className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg shadow-md">
                <h3 className="text-sm font-semibold mb-1">Quick Note</h3>
                <p className="text-xs">
                  Stay updated with the latest tech trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="min-h-screen bg-white flex flex-col items-center justify-center  dark:bg-gray-800">
        <ImageCard />
        {/* Categories and Recent Sections */}
        <div className="relative z-10 flex flex-col max-w-4xl mx-auto p-6 gap-6">
          {/* Categories Section */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-center mb-8">Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categoryData.map(({ name, path, icon, color }) => (
                <Link
                  key={name}
                  to={path}
                  className={`flex items-center h-12 gap-2 p-5 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300 ${color}`}
                >
                  {icon}
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Sections */}
        <div className="flex-2 mt-12 md:mt-0">
          <div className=" bg-slate-200 dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <section className="p-3">
              <h2 className="text-3xl font-semibold mb-8 text-center">
                Recent Articles
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {recentPosts &&
                  recentPosts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
              </div>
              {error && <p className="text-red-500">Failed to load posts.</p>}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
