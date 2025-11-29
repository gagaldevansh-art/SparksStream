
import React, { useState } from 'react';
import { findCollaborators } from '../services/geminiService';
import { Collaborator } from '../types';
import { Users, Search, Loader2, Sparkles, MessageCircle, Zap, Lock, DollarSign, CheckCircle } from 'lucide-react';

export const CollabHub: React.FC = () => {
  const [niche, setNiche] = useState('StudyTok');
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(false);
  const [connectedIds, setConnectedIds] = useState<Set<string>>(new Set());

  const handleSearch = async () => {
    if (!niche) return;
    setLoading(true);
    const results = await findCollaborators(niche);
    setCollaborators(results);
    setLoading(false);
  };

  const handleConnect = (collab: Collaborator) => {
    if (collab.tier !== 'Free') {
      const confirm = window.confirm(`This collaboration requires a ${collab.tier} connection fee of $${collab.price}. Proceed to payment?`);
      if (!confirm) return;
    }
    
    // Simulate payment/connection API call
    setTimeout(() => {
      setConnectedIds(prev => new Set(prev).add(collab.id || collab.name));
      if (collab.tier !== 'Free') {
        alert('Payment successful! Connection request sent.');
      }
    }, 500);
  };

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="text-rose-500" />
          <span>SparkSynergy Collab Hub</span>
        </h2>
        <p className="text-gray-500 mt-2">Find your perfect content partner. Unlock premium growth opportunities.</p>
      </div>

      {/* Search Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Content Niche</label>
            <div className="relative">
              <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g. Study Hacks, Dorm Cooking, Fitness..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none transition"
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !niche}
            className="w-full md:w-auto px-8 py-3 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="w-5 h-5" />}
            <span>Find Partners</span>
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading && (
          <div className="col-span-full py-20 text-center">
            <Loader2 className="w-12 h-12 text-rose-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Analyzing engagement metrics & compatibility...</p>
          </div>
        )}

        {!loading && collaborators.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
            <Users className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">Enter your niche to find collaboration opportunities</p>
          </div>
        )}

        {collaborators.map((collab, index) => {
           const isConnected = connectedIds.has(collab.id || collab.name);
           const isPremium = collab.tier !== 'Free';

           return (
            <div key={index} className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group relative ${isPremium ? 'border-2 border-yellow-400' : 'border border-rose-50'}`}>
              
              {isPremium && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-xl z-10">
                  PREMIUM
                </div>
              )}

              {/* Header Card */}
              <div className="p-6 pb-4 flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-gradient-to-br from-rose-100 to-orange-100 border-2 border-white shadow-sm`}>
                    {['🎓', '🎸', '💪', '🎨', '🍳'][index % 5]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{collab.name}</h3>
                    <p className="text-rose-500 text-sm font-medium">{collab.handle}</p>
                    <p className="text-gray-400 text-xs mt-1">{collab.niche}</p>
                  </div>
                </div>
                <div className="mt-8 text-right">
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 border border-green-100">
                    <Zap size={12} />
                    {collab.matchScore}% Synergy
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-px bg-gray-50 border-y border-gray-100">
                <div className="p-3 text-center">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Followers</p>
                  <p className="text-gray-900 font-bold">{collab.followerCount}</p>
                </div>
                <div className="p-3 text-center">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Engagement</p>
                  <p className="text-gray-900 font-bold">{collab.engagementRate}</p>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-purple-500" />
                    Why you match
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed bg-purple-50 p-3 rounded-lg border border-purple-100">
                    {collab.reason}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
                    <Zap size={14} className="text-yellow-500" />
                    Collab Idea
                  </h4>
                  <div className="text-sm text-gray-800 font-medium italic bg-yellow-50 p-3 rounded-lg border border-yellow-100 border-l-4 border-l-yellow-400">
                    "{collab.collabIdea}"
                  </div>
                </div>

                <div className="pt-2">
                  {isConnected ? (
                     <button disabled className="w-full bg-green-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-default opacity-90">
                       <CheckCircle size={18} />
                       Connected
                     </button>
                  ) : (
                    <button 
                      onClick={() => handleConnect(collab)}
                      className={`w-full py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 
                      ${isPremium 
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:from-yellow-600 hover:to-amber-700 shadow-lg shadow-yellow-200' 
                        : 'bg-gray-900 text-white hover:bg-rose-600'}`}
                    >
                      {isPremium ? (
                        <>
                          <Lock size={16} />
                          Unlock for ${collab.price}
                        </>
                      ) : (
                        <>
                          <MessageCircle size={16} />
                          Connect for Free
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
           );
        })}
      </div>
    </div>
  );
};
