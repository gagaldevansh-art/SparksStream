
import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, User } from 'lucide-react';

interface LoginProps {
  onLogin: (role: 'GUEST' | 'ADMIN') => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isPulled, setIsPulled] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handlePull = () => {
    setIsPulled(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdminMode) {
      if (username === 'admin' && password === 'admin') {
        onLogin('ADMIN');
      } else {
        alert('Invalid admin credentials (try admin/admin)');
      }
    } else {
      onLogin('GUEST');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#fdf2f8] overflow-hidden flex flex-col items-center justify-center">
      
      {/* The String */}
      <div 
        className={`absolute top-0 right-20 z-50 flex flex-col items-center transition-transform duration-1000 ease-in-out cursor-pointer hover:translate-y-2 ${isPulled ? '-translate-y-full' : 'translate-y-0'}`}
        onClick={handlePull}
      >
        <div className="w-1 h-64 bg-rose-300"></div>
        <div className="w-6 h-6 rounded-full bg-rose-500 shadow-lg shadow-rose-300 animate-bounce"></div>
        <div className="bg-white px-3 py-1 rounded-full shadow-md mt-2 text-xs font-bold text-rose-500">
          Pull to Login
        </div>
      </div>

      {/* Intro Text (Visible before pull) */}
      <div className={`text-center space-y-6 transition-all duration-700 ${isPulled ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <div className="inline-block p-4 bg-white rounded-full shadow-xl shadow-rose-100 mb-4 animate-pulse">
           <Sparkles className="w-16 h-16 text-rose-500" />
        </div>
        <h1 className="text-6xl font-black text-gray-900 tracking-tight">
          Spark<span className="text-rose-500">Stream</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-md mx-auto">
          The ultimate AI toolkit for student content creators.
        </p>
      </div>

      {/* Login Form (Slides down after pull) */}
      <div 
        className={`absolute top-0 w-full h-full flex items-center justify-center bg-white/80 backdrop-blur-md transition-all duration-1000 transform ${isPulled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-rose-100 m-4 relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-50 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isAdminMode ? 'Admin Portal' : 'Welcome Back'}
            </h2>
            <p className="text-gray-500 mb-8">
              {isAdminMode ? 'Manage the platform' : 'Login to start creating viral content.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isAdminMode && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none" 
                      placeholder="admin"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none" 
                      placeholder="••••••"
                    />
                  </div>
                </>
              )}

              <button 
                type="submit"
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg shadow-rose-200 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 ${isAdminMode ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
              >
                {isAdminMode ? 'Access Dashboard' : 'Guest Login'}
                <ArrowRight size={20} />
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <button 
                onClick={() => setIsAdminMode(!isAdminMode)}
                className="text-sm text-gray-400 hover:text-gray-600 font-medium flex items-center justify-center gap-2 mx-auto"
              >
                {isAdminMode ? <User size={14} /> : <ShieldCheck size={14} />}
                {isAdminMode ? 'Switch to Creator Login' : 'Admin Access'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
