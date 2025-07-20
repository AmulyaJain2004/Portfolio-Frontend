import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import config from "../config";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${config.apiBaseUrl}/api/blog/`)
      .then((res) => res.json())
      .then(setPosts)
      .catch(() => setError("Failed to load blog posts."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center bg-black pt-24 pb-12 relative">
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-3xl z-0 flex">
          <div
            className="border-l border-gray-700 h-full"
            style={{ width: 0 }}
          ></div>
          <div className="flex-1"></div>
          <div
            className="border-r border-gray-700 h-full"
            style={{ width: 0 }}
          ></div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-300 mb-8 text-center z-10 relative">
          Blog
        </h1>
        <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col gap-0 mt-4 relative px-4 sm:px-8 z-10">
          <motion.div className="relative z-10">
            {loading ? (
              <div className="w-full flex justify-center items-center py-8">
                <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400 mr-2"></span>{" "}
                <span>Loading...</span>
              </div>
            ) : error ? (
              <div className="w-full text-center text-red-400 py-4">
                {error}
              </div>
            ) : !posts || posts.length === 0 ? (
              <div className="w-full text-center text-gray-400 py-4">
                No blog posts found.
              </div>
            ) : (
              <div className="w-full flex flex-col gap-6">
                {posts.map((post) =>
                  post ? (
                    <div
                      key={post?.id || Math.random()}
                      className="bg-black border border-gray-700 rounded-xl shadow p-6 flex flex-col gap-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                        <span className="font-semibold text-indigo-200 text-lg">
                          {post?.title || "Untitled Post"}
                        </span>
                        <span className="text-gray-500 text-xs ml-2">
                          {post?.author || "Unknown Author"} &middot;{" "}
                          {post?.date
                            ? new Date(post.date).toLocaleDateString()
                            : "Date unknown"}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-3">
                        {post?.summary || "No summary available"}
                      </p>
                      {post?.slug && (
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-block mt-2 px-6 py-3 rounded-full bg-black text-yellow-300 font-bold shadow border-2 border-yellow-300 hover:text-indigo-700 hover:border-indigo-700 transition-colors text-base text-center"
                        >
                          Read More
                        </Link>
                      )}
                    </div>
                  ) : null
                )}
              </div>
            )}
          </motion.div>
          <div className="my-4 w-full flex justify-center relative z-10">
            <div
              className="border-t border-gray-700 w-screen absolute left-1/2 -translate-x-1/2"
              style={{ zIndex: 1 }}
            ></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
