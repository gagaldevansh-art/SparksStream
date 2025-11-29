import React, { useState } from 'react';
import { generateIdeas } from '../services/geminiService';
import { Idea, ViewState } from '../types';
import { Lightbulb, Loader2, ArrowRight } from 'lucide-react';

interface IdeaGeneratorProps {
  onSelectIdea: (idea: Idea) => void;
}

export const IdeaGenerator: React.FC<IdeaGeneratorProps> = ({ onSelectIdea }) => {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('Student Life');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    const results = await generateIdeas(topic, niche);
    setIdeas(results);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-900">Idea Generator</h2>
        <p className="text-gray-500 mt-2">Stuck? Let AI brainstorm for you.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What's on your mind?</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Exam stress, Budget meals..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none transition bg-white"
            >
              <option>Student Life</option>
              <option>StudyTok / Academics</option>
              <option>Fitness & Health</option>
              <option>Tech & Coding</option>
              <option>Creative Arts</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading || !topic}
          className="mt-6 w-full bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex justify-center items-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Brainstorming...</span>
            </>
          ) : (
            <>
              <Lightbulb className="w-5 h-5" />
              <span>Generate Ideas</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.map((idea, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                idea.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                idea.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {idea.difficulty}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{idea.title}</h3>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{idea.description}</p>
            <button
              onClick={() => onSelectIdea(idea)}
              className="w-full py-2 px-4 rounded-lg border-2 border-rose-100 text-rose-600 font-semibold hover:bg-rose-50 hover:border-rose-200 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Create this Post</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};