'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Home, Search, Bell, User, PlusSquare, Send } from 'lucide-react';

interface Post {
  id: number;
  username: string;
  userAvatar: string;
  image?: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
  bookmarked: boolean;
}

export default function SocialMediaApp() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      username: 'sarah_designs',
      userAvatar: '👩‍🎨',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
      content: 'Beautiful sunset at the mountains! Nature never disappoints. 🌄',
      likes: 234,
      comments: 18,
      timestamp: '2h ago',
      liked: false,
      bookmarked: false,
    },
    {
      id: 2,
      username: 'tech_explorer',
      userAvatar: '👨‍💻',
      content: 'Just launched my new app! Check it out and let me know what you think. Excited to share this with everyone! 🚀',
      likes: 567,
      comments: 43,
      timestamp: '4h ago',
      liked: true,
      bookmarked: false,
    },
    {
      id: 3,
      username: 'foodie_adventures',
      userAvatar: '👨‍🍳',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
      content: 'Homemade pasta from scratch! Recipe coming soon on my blog 🍝',
      likes: 892,
      comments: 67,
      timestamp: '6h ago',
      liked: false,
      bookmarked: true,
    },
    {
      id: 4,
      username: 'fitness_journey',
      userAvatar: '💪',
      content: 'Day 100 of my fitness journey! Consistency is key. Never give up on your goals! 💯',
      likes: 445,
      comments: 29,
      timestamp: '8h ago',
      liked: false,
      bookmarked: false,
    },
  ]);

  const [newPostContent, setNewPostContent] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const toggleBookmark = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, bookmarked: !post.bookmarked }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newPost: Post = {
        id: posts.length + 1,
        username: 'you',
        userAvatar: '😊',
        content: newPostContent,
        likes: 0,
        comments: 0,
        timestamp: 'Just now',
        liked: false,
        bookmarked: false,
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            SocialHub
          </h1>
          <div className="flex items-center gap-6">
            <Bell className="w-6 h-6 text-gray-700 cursor-pointer hover:text-purple-600 transition" />
            <Send className="w-6 h-6 text-gray-700 cursor-pointer hover:text-purple-600 transition" />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Create Post */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-xl">
              😊
            </div>
            <div className="flex-1">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleCreatePost}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-xl">
                    {post.userAvatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{post.username}</h3>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <p className="text-gray-800">{post.content}</p>
              </div>

              {/* Post Image */}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-96 object-cover"
                />
              )}

              {/* Post Actions */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-2 group"
                    >
                      <Heart
                        className={`w-6 h-6 transition ${
                          post.liked
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-700 group-hover:text-red-500'
                        }`}
                      />
                      <span className="text-sm font-medium text-gray-700">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 group">
                      <MessageCircle className="w-6 h-6 text-gray-700 group-hover:text-blue-500 transition" />
                      <span className="text-sm font-medium text-gray-700">{post.comments}</span>
                    </button>
                    <button className="group">
                      <Share2 className="w-6 h-6 text-gray-700 group-hover:text-green-500 transition" />
                    </button>
                  </div>
                  <button onClick={() => toggleBookmark(post.id)}>
                    <Bookmark
                      className={`w-6 h-6 transition ${
                        post.bookmarked
                          ? 'fill-yellow-500 text-yellow-500'
                          : 'text-gray-700 hover:text-yellow-500'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'home' ? 'text-purple-600' : 'text-gray-600'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'search' ? 'text-purple-600' : 'text-gray-600'
            }`}
          >
            <Search className="w-6 h-6" />
            <span className="text-xs font-medium">Search</span>
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'create' ? 'text-purple-600' : 'text-gray-600'
            }`}
          >
            <PlusSquare className="w-6 h-6" />
            <span className="text-xs font-medium">Create</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'profile' ? 'text-purple-600' : 'text-gray-600'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>

      {/* Bottom padding for fixed nav */}
      <div className="h-20"></div>
    </div>
  );
}
