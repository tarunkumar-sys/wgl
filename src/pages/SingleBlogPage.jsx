import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import CommentSection from "../components/Blog/CommentSection";

export default function SingleBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState({
    id: 1,
    title: "React Blog Example",
    description: "Full blog content goes here...",
    image: "https://source.unsplash.com/random/400x200?blog",
    tags: ["React", "Tailwind"],
    comments: ["Nice post!"],
  });

  const addComment = (comment) => {
    setBlog({ ...blog, comments: [...blog.comments, comment] });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back
      </Link>
      <div className="bg-white p-6 rounded-2xl shadow mt-4">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-60 object-cover rounded"
        />
        <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>
        <p className="text-gray-700 mt-2">{blog.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {blog.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
        <CommentSection comments={blog.comments} addComment={addComment} />
      </div>
    </div>
  );
}
