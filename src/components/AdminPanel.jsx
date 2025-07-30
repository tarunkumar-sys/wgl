import { useState } from "react";

export default function AdminPanel({ addBlog }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");

  const handleAdd = () => {
    if (!title || !description || !image) return;
    addBlog({
      id: Date.now(),
      title,
      description,
      image,
      tags: tags.split(",").map(t => t.trim()),
      comments: [],
    });
    setTitle("");
    setDescription("");
    setImage("");
    setTags("");
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-3">Create Blog</h2>
      <input className="border p-2 w-full mb-2 rounded" placeholder="Title"
        value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="border p-2 w-full mb-2 rounded" placeholder="Description"
        value={description} onChange={(e) => setDescription(e.target.value)} />
      <input className="border p-2 w-full mb-2 rounded" placeholder="Image URL"
        value={image} onChange={(e) => setImage(e.target.value)} />
      <input className="border p-2 w-full mb-3 rounded" placeholder="Tags (comma separated)"
        value={tags} onChange={(e) => setTags(e.target.value)} />
      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Blog
      </button>
    </div>
  );
}
