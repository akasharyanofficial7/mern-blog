import React, { useEffect, useState } from "react";
import moment from "moment";

const Comment = ({ comment }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("An error occurred while fetching user data", error);
        setError(error.message);
      }
    };

    getUser();
  }, [comment.userId]);

  return (
    <section className="bg-white dark:bg-gray-900 p-4 rounded-lg   mb-2 ">
      <div className="flex items-start space-x-4">
        <img
          src={user.profilePicture || "/default-profile.png"}
          alt={`${user.name}'s profile`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2 lg:text-sm text-xs">
            <span className="font-semibold text-gray-900 dark:text-white">
              {user.username}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 lg:text-sm lg:pr-12 pl-2">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>
          <p className="text-gray-800 dark:text-gray-300 font-sans  text-xs lg:text-sm">
            {comment.content}
          </p>
        </div>
        <div className="relative">
          <button className="p-2 text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-gray-200">
            •••
          </button>
        </div>
      </div>
      <hr className=" my-4" />
    </section>
  );
};

export default Comment;
