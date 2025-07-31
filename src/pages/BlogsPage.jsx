import { useState } from "react";
import BlogCard from "../components/Blog/BlogCard";

export default function BlogsPage() {
  const [blogs] = useState([
    {
      id: 1,
      title: "React Blog Example",
      description: "Learn how to build blogs in React + Tailwind.",
      image: "https://source.unsplash.com/random/400x200?react",
      tags: ["React", "Tailwind"],
      comments: [],
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Blogs</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
