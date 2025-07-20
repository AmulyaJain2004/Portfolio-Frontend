import React from "react";
import staticBlogPosts from "../data/blogPosts";

const BlogDebug = () => {
  console.log("BlogDebug component loaded");
  console.log("Static blog posts:", staticBlogPosts);

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl mb-4">Blog Debug Component</h1>
      <div className="mb-4">
        <p>Static blog posts loaded: {staticBlogPosts ? "YES" : "NO"}</p>
        <p>Posts count: {staticBlogPosts?.length || 0}</p>
        <p>First post title: {staticBlogPosts?.[0]?.title || "N/A"}</p>
      </div>

      {staticBlogPosts && staticBlogPosts.length > 0 ? (
        <div>
          <h2 className="text-xl mb-2">Posts:</h2>
          {staticBlogPosts.map((post, index) => (
            <div
              key={post.id || index}
              className="mb-2 p-2 bg-gray-800 rounded"
            >
              <p className="font-bold">{post.title}</p>
              <p className="text-sm text-gray-300">{post.summary}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-red-400">No posts found or posts is undefined</div>
      )}
    </div>
  );
};

export default BlogDebug;
