import { useState } from "react";

export default function CommentSection({ comments, addComment }) {
  const [comment, setComment] = useState("");

  const handlePost = () => {
    if (!comment) return;
    addComment(comment);
    setComment("");
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Comments</h3>
      {comments.length === 0 && <p>No comments yet.</p>}
      <ul className="mt-2 space-y-2">
        {comments.map((c, i) => (
          <li key={i} className="bg-gray-100 p-2 rounded">{c}</li>
        ))}
      </ul>
      <div className="flex gap-2 mt-3">
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={handlePost}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Post
        </button>
      </div>
    </div>
  );
}
