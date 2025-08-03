import React, { useState, useEffect } from 'react';
import { ref, set, onValue, remove, push } from "firebase/database";
import { blogsDatabase } from './firebase2';
import { ChevronRight, Leaf, Zap, Sun, X, Plus, Heart, MessageCircle, Trash2 } from 'lucide-react';

const predefinedImages = [
  'https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2175&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=2015&auto=format&fit=crop'
];

const BlogCard = ({ post, onDeleteClick, isDeleteMode }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-neutral-900 text-white shadow-2xl duration-500 ease-in-out transform hover:scale-105 hover:shadow-green-400/40 flex flex-col">
      <div className="flex-grow">
        <img src={post.imageUrl} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-30 duration-500 ease-in-out group-hover:opacity-50 group-hover:scale-110" />
        <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2">
            {post.category === 'REFORESTATION' && <Leaf size={20} className="text-green-400" />}
            {post.category === 'RENEWABLE ENERGY' && <Zap size={20} className="text-yellow-400" />}
            {post.category === 'OCEAN CONSERVATION' && <Sun size={20} className="text-orange-400" />}
            {post.category === 'URBAN ECOLOGY' && <Leaf size={20} className="text-teal-400" />}
            <p className="font-syne text-sm font-bold uppercase tracking-widest text-green-400">{post.category}</p>
          </div>
          <h3 className="font-syne text-2xl md:text-3xl font-extrabold leading-tight mb-4">{post.title}</h3>
          <div className="border-t border-green-400/30 pt-4 text-sm opacity-80">
            <span>By {post.author}</span>
            <span className="mx-2">|</span>
            <span>{post.date}</span>
          </div>
        </div>
      </div>
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-sm border-t border-green-500/20 p-3 flex justify-between items-center">
        <div className="flex items-center gap-4 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <MessageCircle size={18} />
            <span>{post.comments ? post.comments.length : 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart size={18} className={post.isLiked ? 'fill-current text-pink-500' : ''} />
            <span>{post.likes || 0}</span>
          </div>
        </div>
        {isDeleteMode && (
          <button 
            onClick={onDeleteClick} 
            className="text-white bg-red-600 px-3 py-1 rounded-full flex items-center gap-2 hover:bg-red-500 transition-colors"
          >
            <Trash2 size={18} /> Delete
          </button>
        )}
      </div>
    </div>
  );
};

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

export default function AdminBlogs() {
  const [posts, setPosts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      })
      .catch(error => {
        console.error("Error deleting post:", error);
      });
  };

  if (isLoading) {
    return (
      <div className="bg-neutral-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-800 min-h-screen font-inter text-gray-300 p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Inter:wght@400;500;700&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="container mx-auto">
        <header className="mb-12 p-6 flex justify-between">
          <h1 className="text-2xl font-extrabold text-white mb-4">Blog <span className="text-green-400">Management</span></h1>
        

        <div className="flex gap-4">
          <button 
            onClick={() => setIsAddModalOpen(true)} 
            className="font-syne bg-green-500 text-gray-900 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-green-400 transition-colors flex items-center gap-2"
          >
            <Plus size={20} /> Add New Post
          </button>
          <button 
            onClick={() => setIsDeleteMode(!isDeleteMode)} 
            className={`font-syne font-bold px-6 py-3 rounded-full shadow-lg transition-colors flex items-center gap-2 ${
              isDeleteMode 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Trash2 size={20} /> {isDeleteMode ? 'Cancel Delete' : 'Delete Posts'}
          </button>
        </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post}
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