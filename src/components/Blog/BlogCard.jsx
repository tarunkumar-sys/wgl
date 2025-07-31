import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <div className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition">
      <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{blog.title}</h2>
        <p className="text-gray-600 line-clamp-2">{blog.description}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {blog.tags.map((tag, i) => (
            <span key={i} className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
              #{tag}
            </span>
          ))}
        </div>
        <Link
          to={`/blogs/${blog.id}`}
          className="block text-center mt-3 bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
