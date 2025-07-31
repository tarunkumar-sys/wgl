import React, { useState, useEffect } from 'react';
import { ChevronRight, Leaf, Zap, Sun, X, Plus, Heart, MessageCircle, Trash2 } from 'lucide-react';
import { ref, set, onValue, remove, push } from "firebase/database";
import { blogsDatabase } from './firebase2'; // Make sure this points to your Firebase config file

// Predefined images for new posts
const predefinedImages = [
    'https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2175&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=2015&auto=format&fit=crop'
];

// BlogCard Component
const BlogCard = ({ post, onCardClick, onLikeClick, isDeleteMode, onDeleteClick }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gray-900 text-white shadow-2xl duration-500 ease-in-out transform hover:scale-105 hover:shadow-green-400/40 flex flex-col">
      <div onClick={onCardClick} className="cursor-pointer flex-grow">
        <img src={post.imageUrl} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-30 duration-500 ease-in-out group-hover:opacity-50 group-hover:scale-110" />
        <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2">
            {post.category === 'REFORESTATION' && <Leaf size={20} className="text-green-400" />}
            {post.category === 'RENEWABLE ENERGY' && <Zap size={20} className="text-yellow-400" />}
            {post.category === 'OCEAN CONSERVATION' && <Sun size={20} className="text-orange-400" />}
            {post.category === 'URBAN ECOLOGY' && <Leaf size={20} className="text-teal-400" />}
            {!['REFORESTATION', 'RENEWABLE ENERGY', 'OCEAN CONSERVATION', 'URBAN ECOLOGY'].includes(post.category) && 
              <Leaf size={20} className="text-blue-400" />}
            <p className="font-syne text-sm font-bold uppercase tracking-widest text-green-400">{post.category}</p>
          </div>
          <h3 className="font-syne text-2xl md:text-3xl font-extrabold leading-tight mb-4">{post.title}</h3>
          <div className="border-t border-green-400/30 pt-4 text-sm opacity-80">
            <span>By {post.author}</span>
            <span className="mx-2">|</span>
            <span>{post.date}</span>
          </div>
          <div className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-45">
              <ChevronRight size={24} className="transition-transform duration-500 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-sm border-t border-green-500/20 p-3 flex justify-end items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-300">
            <MessageCircle size={18} />
            <span>{post.comments ? post.comments.length : 0}</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onLikeClick(); }} className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full transition-colors ${post.isLiked ? 'text-pink-500 bg-pink-500/10' : 'text-gray-300 hover:bg-gray-700'}`}>
            <Heart size={18} className={`${post.isLiked ? 'fill-current' : ''}`} />
            <span>{post.likes || 0}</span>
        </button>
      </div>
      {isDeleteMode && (
          <div className="absolute inset-0 bg-red-900/70 flex items-center justify-center z-20">
              <button onClick={(e) => { e.stopPropagation(); onDeleteClick(); }} className="flex flex-col items-center justify-center text-white bg-red-600 rounded-full w-24 h-24 hover:bg-red-500 transition-colors transform hover:scale-110">
                  <Trash2 size={32} />
                  <span className="text-sm font-bold mt-1">Delete</span>
              </button>
          </div>
      )}
    </div>
  );
};

// Read Article Modal
const ReadArticleModal = ({ post, onClose, onAddComment }) => {
    const [commentText, setCommentText] = useState('');

    if (!post) return null;

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            onAddComment(post.id, commentText);
            setCommentText('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-green-500/20 border border-green-500/20 flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="relative">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded-t-2xl opacity-50" />
                    <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-green-500 transition-colors z-10">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8 md:p-10 flex-grow overflow-y-auto">
                    <div className="flex items-center gap-2 mb-4">
                        {post.category === 'REFORESTATION' && <Leaf size={20} className="text-green-400" />}
                        {post.category === 'RENEWABLE ENERGY' && <Zap size={20} className="text-yellow-400" />}
                        {post.category === 'OCEAN CONSERVATION' && <Sun size={20} className="text-orange-400" />}
                        {post.category === 'URBAN ECOLOGY' && <Leaf size={20} className="text-teal-400" />}
                        {!['REFORESTATION', 'RENEWABLE ENERGY', 'OCEAN CONSERVATION', 'URBAN ECOLOGY'].includes(post.category) && 
                          <Leaf size={20} className="text-blue-400" />}
                        <p className="font-syne text-sm font-bold uppercase tracking-widest text-green-400">{post.category}</p>
                    </div>
                    <h2 className="font-syne text-3xl md:text-4xl font-extrabold text-white mb-4">{post.title}</h2>
                    <div className="text-sm text-gray-400 mb-6 border-b border-green-400/20 pb-4">
                        <span>By {post.author}</span><span className="mx-2">|</span><span>{post.date}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap mb-10">{post.content}</p>

                    <h3 className="font-syne text-2xl font-bold text-white mb-6 border-t border-green-400/20 pt-6">Comments ({post.comments ? post.comments.length : 0})</h3>
                    <div className="space-y-4 mb-6">
                        {post.comments && post.comments.length > 0 ? post.comments.map(comment => (
                            <div key={comment.id} className="bg-gray-800/50 p-4 rounded-lg">
                                <p className="font-bold text-green-400 text-sm">{comment.author}</p>
                                <p className="text-gray-300">{comment.text}</p>
                            </div>
                        )) : <p className="text-gray-500">Be the first to comment.</p>}
                    </div>
                </div>
                <div className="p-8 border-t border-green-500/20 bg-gray-900/50 sticky bottom-0">
                    <form onSubmit={handleCommentSubmit} className="flex gap-2">
                        <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Add a comment..." className="w-full bg-gray-800 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                        <button type="submit" className="font-syne bg-green-500 text-gray-900 font-bold px-6 py-2 rounded-lg hover:bg-green-400 transition-colors">Post</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Add Blog Modal
const AddBlogModal = ({ onClose, onAddPost, postCount }) => {
    const [formData, setFormData] = useState({ 
        title: '', 
        author: '', 
        category: 'NEW TOPIC', 
        content: '' 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            ...formData,
            date: new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
            }),
            imageUrl: predefinedImages[postCount % predefinedImages.length],
            likes: 0,
            isLiked: false,
            comments: []
        };
        onAddPost(newPost);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-syne text-3xl font-bold text-white">Add New Article</h2>
                        <button type="button" onClick={onClose} className="text-white bg-black/50 rounded-full p-2 hover:bg-red-500 transition-colors"><X size={24} /></button>
                    </div>
                    <div className="space-y-4">
                        <input type="text" name="title" placeholder="Article Title" value={formData.title} onChange={handleChange} required className="w-full bg-gray-900 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                        <input type="text" name="author" placeholder="Author Name" value={formData.author} onChange={handleChange} required className="w-full bg-gray-900 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                        <input type="text" name="category" placeholder="Category (e.g., SUSTAINABILITY)" value={formData.category} onChange={handleChange} required className="w-full bg-gray-900 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                        <textarea name="content" placeholder="Full article content..." value={formData.content} onChange={handleChange} required rows="5" className="w-full bg-gray-900 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
                    </div>
                    <div className="mt-8 text-right">
                        <button type="submit" className="font-syne bg-green-500 text-gray-900 font-bold text-lg px-8 py-3 rounded-full shadow-lg hover:bg-green-400 transform hover:scale-105 transition-all duration-300 ease-in-out">Publish Article</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Main App Component
export default function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load posts from Firebase
  useEffect(() => {
    const postsRef = ref(blogsDatabase, 'posts');
    
    const unsubscribe = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setPosts(postsArray);
      } else {
        setPosts([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLikeToggle = (postId) => {
    const postRef = ref(blogsDatabase, `posts/${postId}`);
    const currentPost = posts.find(post => post.id === postId);
    if (!currentPost) return;

    const updatedPost = {
      ...currentPost,
      isLiked: !currentPost.isLiked,
      likes: currentPost.isLiked ? currentPost.likes - 1 : currentPost.likes + 1
    };

    set(postRef, updatedPost)
      .then(() => {
        setPosts(posts.map(post => post.id === postId ? updatedPost : post));
      })
      .catch(error => {
        console.error("Error updating like status:", error);
      });
  };

  const handleAddComment = (postId, commentText) => {
    const postRef = ref(blogsDatabase, `posts/${postId}`);
    const currentPost = posts.find(post => post.id === postId);
    if (!currentPost) return;

    const newComment = {
      id: Date.now().toString(),
      author: 'Visitor',
      text: commentText
    };

    const updatedPost = {
      ...currentPost,
      comments: [...(currentPost.comments || []), newComment]
    };

    set(postRef, updatedPost)
      .then(() => {
        setPosts(posts.map(post => post.id === postId ? updatedPost : post));
        if (selectedPost && selectedPost.id === postId) {
          setSelectedPost(updatedPost);
        }
      })
      .catch(error => {
        console.error("Error adding comment:", error);
      });
  };

  const handleAddPost = (newPost) => {
    const postsRef = ref(blogsDatabase, 'posts');
    const newPostRef = push(postsRef);
    
    set(newPostRef, newPost)
      .then(() => {
        setIsAddModalOpen(false);
      })
      .catch(error => {
        console.error("Error adding new post:", error);
      });
  };

  const handleDeletePost = (postId) => {
    const postRef = ref(blogsDatabase, `posts/${postId}`);
    
    remove(postRef)
      .then(() => {
        setPosts(posts.filter(post => post.id !== postId));
        if (selectedPost && selectedPost.id === postId) {
          setSelectedPost(null);
        }
      })
      .catch(error => {
        console.error("Error deleting post:", error);
      });
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen font-inter text-gray-300">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Inter:wght@400;500;700&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="container mx-auto px-4 py-16 sm:py-24">
        <header className="text-center mb-16 md:mb-20">
          <h1 className="font-syne text-5xl md:text-7xl font-extrabold text-white mb-4">my <span className="text-green-400">Wired</span></h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">Unconventional stories and radical ideas for a planet in flux.</p>
        </header>

        <div className="flex justify-center items-center gap-4 mb-12">
            <button onClick={() => setIsAddModalOpen(true)} className="font-syne bg-gray-800 border border-green-500/50 text-green-400 font-bold text-md px-6 py-3 rounded-full shadow-lg hover:bg-green-500 hover:text-gray-900 transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center gap-2">
                <Plus size={20} /> Add New Blog
            </button>
            <button 
                onClick={() => setIsDeleteMode(!isDeleteMode)} 
                className={`font-syne border font-bold text-md px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center gap-2 ${
                    isDeleteMode 
                    ? 'bg-red-600 border-red-500 text-white' 
                    : 'bg-gray-800 border-red-500/50 text-red-400 hover:bg-red-600 hover:text-white'
                }`}
            >
                <Trash2 size={20} /> {isDeleteMode ? 'Exit Delete Mode' : 'Delete Blog'}
            </button>
        </div>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogCard 
                  key={post.id} 
                  post={post} 
                  onCardClick={() => !isDeleteMode && setSelectedPost(post)} 
                  onLikeClick={() => handleLikeToggle(post.id)}
                  isDeleteMode={isDeleteMode}
                  onDeleteClick={() => handleDeletePost(post.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-16">
              No blog posts found. Add your first post!
            </div>
          )}
        </main>
      </div>

      <ReadArticleModal 
        post={selectedPost} 
        onClose={() => setSelectedPost(null)} 
        onAddComment={handleAddComment} 
      />
      
      {isAddModalOpen && (
        <AddBlogModal 
          onClose={() => setIsAddModalOpen(false)} 
          onAddPost={handleAddPost} 
          postCount={posts.length} 
        />
      )}
    </div>
  );
}