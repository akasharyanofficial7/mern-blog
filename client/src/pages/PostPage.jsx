import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import Home from "./Home";

const PostPage = () => {
  const { postSlug } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentposts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        setPost(data.posts[0]);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        setRecentPosts(data.posts);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner aria-label="Loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading post. Please try again later.
      </div>
    );
  }

  if (!post) {
    return <div className="text-center">No post found.</div>;
  }

  return (
    <>
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          {post && post.title}
        </h1>
        <Link
          to={`/search?category=${post && post.category}`}
          className="self-center mt-5"
        >
          <Button color="gray" pill size="xs">
            {post && post.category}
          </Button>
        </Link>
        <img
          src={post && post.image}
          alt={post && post.title}
          className="mt-10 p-3 max-h-[600px] w-full object-cover"
        />
        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="italic">
            {post && (post.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>
        <div
          className="p-3 max-w-2xl mx-auto w-full post-content"
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></div>
      </main>

      <div>
        <CommentSection postId={post._id} />
      </div>

      <section className="p-3">
        <h1 className="text-xl mt-5">Recent articles</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {recentposts &&
            recentposts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </section>
    </>
  );
};

export default PostPage;
