import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { blogsDatabase } from './firebase2';
import { ChevronRight, Leaf, Zap, Sun, Heart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  return (
    <Link to={`/blogs/${post.id}`} className="group relative overflow-hidden rounded-2xl bg-gray-900 text-white shadow-2xl duration-500 ease-in-out transform hover:scale-105 hover:shadow-green-400/40 flex flex-col">
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
        <div className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full ${post.isLiked ? 'text-pink-500 bg-pink-500/10' : 'text-gray-300'}`}>
          <Heart size={18} className={`${post.isLiked ? 'fill-current' : ''}`} />
          <span>{post.likes || 0}</span>
        </div>
      </div>
    </Link>
  );
};

export default function BlogList() {
  const [posts, setPosts] = useState([]);
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

  if (isLoading) {
    return (
      <div className="bg-neutral-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading posts...</div>
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

      <div className="container mx-auto px-4 py-16 sm:py-24">
          <h1 className="text-2xl md:text-4xl mb-8 font-extrabold text-white">Our <span className="text-green-400">Blog</span></h1>
       
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-16">
              No blog posts available yet. Check back soon!
            </div>
          )}
        </main>
      </div>
    </div>
  );
}