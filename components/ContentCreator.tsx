
import React, { useState, useEffect } from 'react';
import { performVibeCheck } from '../services/geminiService';
import { SocialPost, VibeCheckResult } from '../types';
import { Wand2, Save, Loader2, TrendingUp, Image as ImageIcon, Copy, Check } from 'lucide-react';

interface ContentCreatorProps {
  initialContent?: string;
  onSave: (post: SocialPost) => void;
}

interface VibeCardProps {
  result: VibeCheckResult;
  platform: string;
  onSaveVariation: (caption: string, hashtags: string[], score: number) => void;
  onCopyToEditor: (caption: string) => void;
}

// Sub-component for individual Vibe Card to manage its own edit state
const VibeCard: React.FC<VibeCardProps> = ({ 
  result, 
  platform, 
  onSaveVariation,
  onCopyToEditor 
}) => { 
  const [caption, setCaption] = useState(result.optimizedCaption);
  const [hashtags, setHashtags] = useState(result.suggestedHashtags.join(' '));
  const [isCopied, setIsCopied] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const handleCopy = () => {
    onCopyToEditor(caption);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-rose-100 overflow-hidden mb-6 flex-shrink-0 w-full animate-in slide-in-from-right duration-500">
      {/* Score Header */}
      <div className="p-4 bg-gray-900 text-white relative overflow-hidden flex justify-between items-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"></div>
        <div>
          <h4 className="font-bold text-lg">{result.persona}</h4>
          <p className="text-xs text-gray-400">{result.sentiment} • {result.tone}</p>
        </div>
        <div className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
           <TrendingUp size={14} className={getScoreColor(result.viralityScore)} />
           <span className="font-bold text-lg">{result.viralityScore}</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Editorial Section */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Caption (Editable)</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full text-sm p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none resize-none h-24"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Hashtags</label>
          <input
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            className="w-full text-sm p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none text-blue-600"
          />
        </div>

        {/* Feedback & Image */}
        <div className="bg-rose-50 p-3 rounded-lg border border-rose-100">
           <p className="text-xs text-rose-800 leading-relaxed">
             <strong>AI Tip:</strong> {result.constructiveFeedback}
           </p>
        </div>
        
        <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg flex gap-3 items-start">
           <ImageIcon size={16} className="text-indigo-500 mt-1 flex-shrink-0" />
           <p className="text-xs text-indigo-800 italic leading-relaxed">
             "{result.visualPrompt}"
           </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center space-x-2 py-2 px-4 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-semibold transition"
          >
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
            <span>{isCopied ? 'Copied' : 'Copy Text'}</span>
          </button>
          <button
            onClick={() => onSaveVariation(caption, hashtags.split(' '), result.viralityScore)}
            className="flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-rose-600 text-white hover:bg-rose-700 text-sm font-semibold transition shadow-md shadow-rose-200"
          >
            <Save size={16} />
            <span>Save Draft</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const ContentCreator: React.FC<ContentCreatorProps> = ({ initialContent = '', onSave }) => {
  const [content, setContent] = useState(initialContent);
  const [platform, setPlatform] = useState('Instagram');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<VibeCheckResult[]>([]);

  // Update content if initialContent changes
  useEffect(() => {
    if (initialContent) setContent(initialContent);
  }, [initialContent]);

  const handleVibeCheck = async () => {
    if (!content) return;
    setLoading(true);
    setResults([]); // Clear previous results
    const analysisResults = await performVibeCheck(content, platform);
    setResults(analysisResults);
    setLoading(false);
  };

  const handleSaveMainDraft = () => {
    onSave({
      id: Date.now().toString(),
      content,
      platform,
      viralityScore: 0, // Not analyzed
      hashtags: [],
      status: 'Draft'
    });
  };

  const handleSaveVariation = (caption: string, hashtags: string[], score: number) => {
    onSave({
      id: Date.now().toString(),
      content: caption,
      platform,
      viralityScore: score,
      hashtags: hashtags,
      status: 'Draft'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* Editor Section - Left Side */}
      <div className="lg:col-span-7 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Content Studio</h2>
          <p className="text-gray-500 mt-1">Write, analyze, and optimize for maximum engagement.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[500px]">
          <div className="border-b border-gray-100 p-4 bg-gray-50 flex space-x-2 overflow-x-auto">
             {['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn'].map((p) => (
               <button
                 key={p}
                 onClick={() => setPlatform(p)}
                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                   platform === p ? 'bg-rose-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
                 }`}
               >
                 {p}
               </button>
             ))}
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing your viral masterpiece here..."
            className="flex-1 w-full p-6 outline-none text-lg resize-none leading-relaxed text-gray-800 placeholder:text-gray-300 font-sans"
          />
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            <span className="text-sm text-gray-400">{content.length} characters</span>
            <div className="flex space-x-3">
              <button
                onClick={handleSaveMainDraft}
                className="px-4 py-2 text-gray-600 font-semibold hover:bg-gray-200 rounded-lg flex items-center space-x-2 transition"
              >
                <Save size={18} />
                <span>Save Original</span>
              </button>
              <button
                onClick={handleVibeCheck}
                disabled={loading || !content}
                className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg hover:opacity-90 transition-all flex items-center space-x-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}
                <span>Vibe Check</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vibe Studio - Right Side */}
      <div className="lg:col-span-5 space-y-6 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="text-rose-500" />
          <span>Vibe Studio</span>
        </h3>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
          {!results.length && !loading && (
            <div className="bg-rose-50 border-2 border-dashed border-rose-200 rounded-2xl p-8 text-center text-rose-400 h-64 flex flex-col justify-center items-center">
              <Wand2 className="w-12 h-12 mb-3 opacity-50" />
              <p>Hit "Vibe Check" to generate persona variations!</p>
            </div>
          )}

          {loading && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-4 h-64">
              <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
              <p className="text-gray-500 font-medium">Brewing up some viral magic...</p>
            </div>
          )}

          {results.map((result, index) => (
            <VibeCard 
              key={index} 
              result={result} 
              platform={platform} 
              onSaveVariation={handleSaveVariation}
              onCopyToEditor={(text) => setContent(text)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
