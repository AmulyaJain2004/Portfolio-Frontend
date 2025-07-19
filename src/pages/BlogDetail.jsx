import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaArrowLeft } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/blog/${slug}/`)
      .then(res => {
        if (!res.ok) throw new Error('Blog not found');
        return res.json();
      })
      .then(data => {
        setBlog(data);
        // Fetch markdown content from public/blogs/{content_path}
        fetch(`/blogs/${data.content_path}`)
          .then(res => {
            if (!res.ok) throw new Error('Content file not found');
            return res.text();
          })
          .then(setContent)
          .catch(() => setContent('Content not found.'));
      })
      .catch(() => setError('Blog not found.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="w-full flex justify-center items-center py-8"><span className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400 mr-2"></span> <span>Loading...</span></div>;
  }
  if (error) {
    return <div className="w-full text-center text-red-400 py-4">{error}</div>;
  }
  if (!blog) {
    return <div className="w-full text-center text-gray-400 py-4">Blog not found.</div>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center bg-black pt-24 pb-12 relative">
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-3xl z-0 flex">
          <div className="border-l border-gray-700 h-full" style={{width: 0}}></div>
          <div className="flex-1"></div>
          <div className="border-r border-gray-700 h-full" style={{width: 0}}></div>
        </div>
        <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col gap-0 mt-4 relative px-4 sm:px-8 z-10">
          <Link to="/blog" className="flex items-center gap-2 text-indigo-300 hover:text-yellow-300 mb-4 text-sm font-bold">
            <FaArrowLeft /> Back to Blog
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-200 mb-2 text-center z-10 relative">{blog.title}</h1>
          <div className="text-gray-400 text-xs text-center mb-6">By {blog.author} &middot; {new Date(blog.date).toLocaleDateString()}</div>
          <div className="bg-black border border-gray-700 rounded-xl shadow p-6 flex flex-col gap-4">
            <ReactMarkdown className="prose prose-invert max-w-none text-gray-100">{content}</ReactMarkdown>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogDetail; 