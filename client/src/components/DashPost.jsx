import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation

const DashPost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        if (res.ok) {
          const data = await res.json();
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  return (
    <div className="container mx-auto p-6">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full shadow-md">
            <thead className="bg-gray-200 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 sm:py-3">Date updated</th>
                <th className="px-4 py-2 sm:py-3">Post image</th>
                <th className="px-4 py-2 sm:py-3">Post title</th>
                <th className="px-4 py-2 sm:py-3">Category</th>
                <th className="px-4 py-2 sm:py-3">Delete</th>
                <th className="px-4 py-2 sm:py-3">Edit</th>
              </tr>
            </thead>
            <tbody>
              {userPosts.map((post) => (
                <tr
                  key={post._id}
                  className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-2 sm:py-3">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 sm:py-3">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </td>
                  <td className="px-4 py-2 sm:py-3">
                    <Link
                      className="font-medium text-gray-900 dark:text-white hover:underline"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-4 py-2 sm:py-3">{post.category}</td>
                  <td className="px-4 py-2 sm:py-3">
                    <span className="font-medium text-red-500 hover:underline cursor-pointer">
                      Delete
                    </span>
                  </td>
                  <td className="px-4 py-2 sm:py-3">
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">You have no posts yet!</p>
      )}
    </div>
  );
};

export default DashPost;
