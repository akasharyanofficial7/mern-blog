import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="max-w-lg mx-auto my-10 p-6  bg-gray-200 dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transform transition duration-500 hover:scale-105 hover:border-blue-500 dark:hover:border-blue-300">
      <Link to={`/post/${post.slug}`}>
        <img
          className="w-[400px] h-48 rounded-t-lg object-cover"
          src={post.image}
          alt={post.title}
        />
      </Link>
      <div className="py-4">
        <h2 className="text-lg font-semibold text-gray-900  dark:text-white mb-2">
          {post.title.slice(0, 100) + ""}
        </h2>
      </div>
      <div className="flex justify-between items-center font-sans mt-2">
        <Link to={`/post/${post.slug}`}>
          <Button className="relative px-2 py-2 bg-gray-800  text-white rounded-lg shadow-lg transition-transform transform hover:scale-105  focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300 focus:ring-opacity-50">
            Read More
            <span className="absolute inset-0 border-2 border-transparent rounded-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500"></span>
          </Button>
        </Link>
        <div className="italic font-medium mt-2">{post.category}</div>
        <span className="italic flex  font-thin text-xs">
          {post && new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default PostCard;
