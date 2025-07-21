import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import {
  FaCalendar,
  FaUser,
  FaClock,
  FaArrowRight,
  FaTags,
} from "react-icons/fa";
import config from "../config";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(
          "Fetching blogs from Django backend:",
          `${config.apiBaseUrl}/api/blog/`
        );

        const response = await fetch(`${config.apiBaseUrl}/api/blog/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors", // Explicitly set CORS mode
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Blog data fetched successfully:", data);

        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Expected array but got:", typeof data);
          setError("Invalid data format received from server");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(`Failed to load blog posts: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
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
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) =>
                  post ? (
                    <BlogCard key={post?.id || Math.random()} post={post} />
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

// BlogCard Component
const BlogCard = React.memo(({ post }) => {
  if (!post) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadTime = (content) => {
    if (!content) return "1 min";
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-black/90 via-gray-900/90 to-indigo-900/70 border border-gray-700 rounded-2xl shadow-xl overflow-hidden hover:border-indigo-400 transition-all duration-300 group"
    >
      {/* Header Image/Gradient */}
      <div className="h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Simple blog header without tags */}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xl font-bold text-indigo-200 group-hover:text-yellow-200 transition-colors duration-300 mb-3 line-clamp-2 leading-tight">
          {post?.title || "Untitled Post"}
        </h3>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <FaUser size={10} />
            <span>{post?.author || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaCalendar size={10} />
            <span>{formatDate(post?.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock size={10} />
            <span>{calculateReadTime(post?.content)} read</span>
          </div>
        </div>

        {/* Summary */}
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
          {post?.summary ||
            post?.excerpt ||
            "No summary available for this blog post."}
        </p>

        {/* Read More Button */}
        {post?.slug && (
          <Link
            to={`/api/blog/${post.slug}`}
            className="group/btn inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-sm"
          >
            <span>Read Full Article</span>
            <FaArrowRight
              size={12}
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </Link>
        )}
      </div>
    </motion.div>
  );
});

export default Blog;
