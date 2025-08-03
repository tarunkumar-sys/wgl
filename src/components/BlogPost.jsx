import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, set, onValue } from "firebase/database";
import { blogsDatabase } from './firebase2';
import { Leaf, Zap, Sun, Heart, MessageCircle, Share2, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const postRef = ref(blogsDatabase, `posts/${id}`);
    
    const unsubscribe = onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPost({
          id: id,
          ...data
        });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  const handleLikeToggle = () => {
    if (!post) return;
    
    const postRef = ref(blogsDatabase, `posts/${id}`);
    const updatedPost = {
      ...post,
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1
    };

    set(postRef, updatedPost)
      .then(() => {
        setPost(updatedPost);
      })
      .catch(error => {
        console.error("Error updating like status:", error);
      });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !post) return;

    const postRef = ref(blogsDatabase, `posts/${id}`);
    const newComment = {
      id: Date.now().toString(),
      author: 'Visitor',
      text: commentText
    };

    const updatedPost = {
      ...post,
      comments: [...(post.comments || []), newComment]
    };

    set(postRef, updatedPost)
      .then(() => {
        setPost(updatedPost);
        setCommentText('');
      })
      .catch(error => {
        console.error("Error adding comment:", error);
      });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: `Check out this article: ${post.title}`,
        url: window.location.href,
      })
      .catch(console.error);
    } else {
      setIsSharing(true);
      navigator.clipboard.writeText(window.location.href);
      setTimeout(() => setIsSharing(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-neutral-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-neutral-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Post not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Inter:wght@400;500;700&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="container mx-auto px-4 py-12">
        <Link to="/blogs" className="flex items-center mb-8 text-2xl hover:text-green-300 transition-colors">
          <ChevronLeft size={20} className="mr-2" />
          Back to all articles
        </Link>

        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {post.category === 'REFORESTATION' && <Leaf size={20} className="text-green-400" />}
              {post.category === 'RENEWABLE ENERGY' && <Zap size={20} className="text-yellow-400" />}
              {post.category === 'OCEAN CONSERVATION' && <Sun size={20} className="text-orange-400" />}
              {post.category === 'URBAN ECOLOGY' && <Leaf size={20} className="text-teal-400" />}
              <p className="text-sm font-bold uppercase tracking-widest text-green-400">{post.category}</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="text-sm text-gray-400">
                <span>By {post.author}</span><span className="mx-2">|</span><span>{post.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleLikeToggle}
                  className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-colors ${post.isLiked ? 'text-pink-500 bg-pink-500/10' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <Heart size={18} className={`${post.isLiked ? 'fill-current' : ''}`} />
                  <span>{post.likes || 0}</span>
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 text-sm px-4 py-2 rounded-full text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <Share2 size={18} />
                  <span>{isSharing ? 'Link copied!' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="relative h-64 md:h-96 w-full mb-10 rounded-2xl overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
          </div>

          <div className="prose prose-invert max-w-none mb-16">
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          <div className="border-t border-green-500/20 pt-8 mb-8">
            <h2 className="font-syne text-2xl font-bold text-white mb-6">Comments ({post.comments ? post.comments.length : 0})</h2>
            <div className="space-y-4 mb-8">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map(comment => (
                  <div key={comment.id} className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="font-bold text-green-400 text-sm">{comment.author}</p>
                    <p className="text-gray-300">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Be the first to comment.</p>
              )}
            </div>

            <form onSubmit={handleAddComment} className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="font-syne text-xl font-bold text-white mb-4">Add a comment</h3>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full bg-gray-900 p-4 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                rows="4"
              />
              <button 
                type="submit" 
                className="font-syne bg-green-500 text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-green-400 transition-colors"
              >
                Post Comment
              </button>
            </form>
          </div>
        </article>
      </div>
    </div>
  );
}