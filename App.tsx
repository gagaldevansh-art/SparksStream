
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { IdeaGenerator } from './components/IdeaGenerator';
import { ContentCreator } from './components/ContentCreator';
import { Analytics } from './components/Analytics';
import { CollabHub } from './components/CollabHub';
import { Login } from './components/Login';
import { AdminPanel } from './components/AdminPanel';
import { SocialPost, ViewState, MOCK_POSTS, Idea, User } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [posts, setPosts] = useState<SocialPost[]>(MOCK_POSTS);
  const [draftContent, setDraftContent] = useState<string>('');

  const handleLogin = (role: 'GUEST' | 'ADMIN') => {
    setUser({
      id: '1',
      name: role === 'ADMIN' ? 'Admin User' : 'Guest Creator',
      role: role
    });
    setCurrentView(role === 'ADMIN' ? ViewState.ADMIN : ViewState.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(ViewState.DASHBOARD);
  };

  const handleSavePost = (newPost: SocialPost) => {
    setPosts([newPost, ...posts]);
    setCurrentView(ViewState.DASHBOARD);
  };

  const handleSelectIdea = (idea: Idea) => {
    setDraftContent(`${idea.title}\n\n${idea.description}`);
    setCurrentView(ViewState.CREATOR);
  };

  const handleCreateNew = () => {
    setDraftContent('');
    setCurrentView(ViewState.IDEATION);
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.ADMIN:
        return <AdminPanel />;
      case ViewState.DASHBOARD:
        return <Dashboard posts={posts} onCreateNew={handleCreateNew} />;
      case ViewState.IDEATION:
        return <IdeaGenerator onSelectIdea={handleSelectIdea} />;
      case ViewState.CREATOR:
        return <ContentCreator initialContent={draftContent} onSave={handleSavePost} />;
      case ViewState.ANALYTICS:
        return <Analytics />;
      case ViewState.COLLAB:
        return <CollabHub />;
      default:
        return <Dashboard posts={posts} onCreateNew={handleCreateNew} />;
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      currentView={currentView} 
      setView={setCurrentView} 
      isAdmin={user.role === 'ADMIN'}
      onLogout={handleLogout}
    >
      {renderView()}
    </Layout>
  );
}
