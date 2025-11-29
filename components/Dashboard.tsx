import React from 'react';
import { SocialPost } from '../types';
import { Plus, Calendar, Clock, TrendingUp } from 'lucide-react';

interface DashboardProps {
  posts: SocialPost[];
  onCreateNew: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ posts, onCreateNew }) => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="flex justify-between items-end bg-rose-500 rounded-3xl p-8 text-white shadow-xl shadow-rose-200">
        <div>
          <h2 className="text-3xl font-bold mb-2">Welcome back, Creator! 👋</h2>
          <p className="opacity-90 max-w-lg">
            Ready to empower your peers? You have <span className="font-bold underline">2 drafts</span> pending review and <span className="font-bold underline">1 post</span> scheduled for today.
          </p>
        </div>
        <button
          onClick={onCreateNew}
          className="bg-white text-rose-600 px-6 py-3 rounded-xl font-bold hover:bg-rose-50 transition-colors flex items-center space-x-2 shadow-sm"
        >
          <Plus size={20} />
          <span>Create New</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Scheduled</p>
            <p className="text-2xl font-bold text-gray-900">3 Posts</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full text-green-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Avg Virality</p>
            <p className="text-2xl font-bold text-gray-900">88/100</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-purple-100 rounded-full text-purple-600">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Streak</p>
            <p className="text-2xl font-bold text-gray-900">12 Days</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Projects</h3>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {posts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No posts yet. Start creating!</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {posts.map((post) => (
                <div key={post.id} className="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${
                        post.platform === 'Instagram' ? 'bg-pink-100 text-pink-700' :
                        post.platform === 'TikTok' ? 'bg-black text-white' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {post.platform}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        post.status === 'Posted' ? 'bg-green-100 text-green-700' :
                        post.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {post.status}
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium truncate max-w-md">{post.content}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {post.status === 'Scheduled' ? `Scheduled for ${post.scheduledDate}` : `Virality Score: ${post.viralityScore}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <button className="text-sm font-semibold text-rose-600 hover:text-rose-700">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};