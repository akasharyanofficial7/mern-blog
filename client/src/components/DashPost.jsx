import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashPost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [postIdToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        if (res.ok) {
          const data = await res.json();
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prevPosts) => [...prevPosts, ...data.posts]);
        if (data.posts.length < 7) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleShowLess = () => {
    setUserPosts(userPosts.slice(0, 7));
    setShowMore(true);
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
                  <td className="px-8 py-2 sm:py-3">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 sm:py-3 h-8">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20  h-8 object-cover bg-gray-500"
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
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
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
          {showMore ? (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          ) : (
            <button
              onClick={handleShowLess}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show less
            </button>
          )}
        </div>
      ) : (
        <p className="text-center">You have no posts yet!</p>
      )}
      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete thi post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashPost;
