import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaArrowLeft,
  FaCalendar,
  FaUser,
  FaClock,
  FaTags,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import config from "../config";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(
          "Fetching blog detail from Django backend:",
          `${config.apiBaseUrl}/api/blog/${slug}/`
        );

        // Fetch blog metadata from Django backend
        const blogResponse = await fetch(`${config.apiBaseUrl}/api/blog/${slug}/`);

        if (!blogResponse.ok) {
          throw new Error(`HTTP error! status: ${blogResponse.status}`);
        }

        const blogData = await blogResponse.json();
        console.log("Blog detail fetched successfully:", blogData);

        setBlog(blogData);

        // Fetch markdown content from public folder if content_path is provided
        if (blogData.content_path) {
          try {
            console.log(
              "Fetching markdown content from:",
              `/blogs/${blogData.content_path}`
            );
            const contentResponse = await fetch(
              `/blogs/${blogData.content_path}`
            );

            if (!contentResponse.ok) {
              throw new Error(
                `Content file not found: ${blogData.content_path}`
              );
            }

            const contentText = await contentResponse.text();
            setContent(contentText);
            console.log("Markdown content loaded successfully");
          } catch (contentError) {
            console.error("Content fetch error:", contentError);
            setContent(
              `# ${blogData.title}\n\n*Content file could not be loaded.*\n\n${
                blogData.summary || "No summary available."
              }`
            );
          }
        } else {
          // If no content_path, create content from summary
          setContent(
            `# ${blogData.title}\n\n${
              blogData.summary || "No content available for this blog post."
            }`
          );
        }
      } catch (error) {
        console.error("Error fetching blog detail:", error);
        setError(`Failed to load blog post: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogDetail();
    } else {
      setError("No blog slug provided");
      setLoading(false);
    }
  }, [slug]);

  // Helper functions
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

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex flex-col items-center bg-black pt-24 pb-12 relative">
          <div className="w-full flex justify-center items-center py-12">
            <div className="flex items-center gap-3">
              <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></span>
              <span className="text-gray-300 text-lg">
                Loading blog post...
              </span>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex flex-col items-center bg-black pt-24 pb-12 relative">
          <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col gap-0 mt-4 relative px-4 sm:px-8 z-10">
            <Link
              to="/blog"
              className="flex items-center gap-2 text-indigo-300 hover:text-yellow-300 mb-4 text-sm font-bold"
            >
              <FaArrowLeft /> Back to Blog
            </Link>
            <div className="w-full text-center text-red-400 py-12">
              <div className="text-6xl mb-4">😔</div>
              <h2 className="text-2xl font-bold mb-2">Blog Post Not Found</h2>
              <p className="text-gray-400">{error}</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex flex-col items-center bg-black pt-24 pb-12 relative">
          <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col gap-0 mt-4 relative px-4 sm:px-8 z-10">
            <Link
              to="/blog"
              className="flex items-center gap-2 text-indigo-300 hover:text-yellow-300 mb-4 text-sm font-bold"
            >
              <FaArrowLeft /> Back to Blog
            </Link>
            <div className="w-full text-center text-gray-400 py-12">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold mb-2">No Blog Post Found</h2>
              <p>The requested blog post could not be located.</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center bg-black pt-24 pb-12 relative">
        {/* Background borders */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-4xl z-0 flex">
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

        <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col gap-0 mt-4 relative px-4 sm:px-8 z-10">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-indigo-300 hover:text-yellow-300 mb-6 text-sm font-semibold transition-colors duration-300 group"
            >
              <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Back to Blog</span>
            </Link>
          </motion.div>

          {/* Blog header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 mb-6 text-center leading-tight">
              {blog?.title || "Untitled Post"}
            </h1>

            {/* Meta information */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <FaUser className="text-indigo-400" size={14} />
                <span>{blog?.author || "Unknown Author"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendar className="text-indigo-400" size={14} />
                <span>{formatDate(blog?.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-indigo-400" size={14} />
                <span>{calculateReadTime(content)} read</span>
              </div>
            </div>

            {/* Summary */}
            {blog?.summary && (
              <div className="text-center text-gray-300 text-lg italic max-w-3xl mx-auto leading-relaxed mb-6">
                "{blog.summary}"
              </div>
            )}
          </motion.div>

          {/* Blog content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-black/90 via-gray-900/90 to-indigo-900/20 border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 mb-8"
          >
            <div className="prose prose-lg prose-invert max-w-none markdown-content">
              <ReactMarkdown
                components={{
                  // Custom heading styles
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-indigo-200 mb-6 mt-8 first:mt-0 border-b border-gray-600 pb-2">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-indigo-300 mb-4 mt-8 border-b border-gray-700 pb-1">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-indigo-400 mb-3 mt-6">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-lg font-semibold text-indigo-400 mb-2 mt-4">
                      {children}
                    </h4>
                  ),

                  // Custom paragraph styles
                  p: ({ children }) => (
                    <p className="text-gray-100 leading-relaxed mb-4 text-base">
                      {children}
                    </p>
                  ),

                  // Custom list styles
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-gray-100 mb-4 ml-4 space-y-1">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-gray-100 mb-4 ml-4 space-y-1">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-100 leading-relaxed">
                      {children}
                    </li>
                  ),

                  // Custom link styles
                  a: ({ children, href }) => (
                    <a
                      href={href}
                      className="text-indigo-400 hover:text-yellow-300 underline font-medium transition-colors duration-300"
                      target={href?.startsWith("http") ? "_blank" : "_self"}
                      rel={
                        href?.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {children}
                    </a>
                  ),

                  // Custom blockquote styles
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-indigo-400 pl-4 italic text-gray-300 my-6 bg-gray-800/30 py-3 rounded-r-lg">
                      {children}
                    </blockquote>
                  ),

                  // Custom code styles
                  code: ({ children, inline, className }) => {
                    const isCodeBlock = !inline;
                    return isCodeBlock ? (
                      <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4 border border-gray-600">
                        <code className={className}>{children}</code>
                      </pre>
                    ) : (
                      <code className="bg-gray-800 text-indigo-300 px-2 py-1 rounded text-sm font-mono border border-gray-600">
                        {children}
                      </code>
                    );
                  },

                  // Custom strong/bold styles
                  strong: ({ children }) => (
                    <strong className="font-bold text-indigo-100">
                      {children}
                    </strong>
                  ),

                  // Custom emphasis/italic styles
                  em: ({ children }) => (
                    <em className="italic text-yellow-200">{children}</em>
                  ),

                  // Custom horizontal rule
                  hr: () => <hr className="border-gray-600 my-8" />,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </motion.article>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              <FaArrowLeft size={14} />
              <span>Back to All Posts</span>
            </Link>

            {/* Share buttons could be added here */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Share this post:</span>
              {/* Social media share buttons can be added here */}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogDetail;
