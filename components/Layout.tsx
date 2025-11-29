
import React from 'react';
import { ViewState } from '../types';
import { Sparkles, PenTool, LayoutDashboard, BarChart3, Menu, X, Users, Shield, LogOut } from 'lucide-react';

interface LayoutProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isAdmin: boolean;
  onLogout: () => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, setView, isAdmin, onLogout, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavItem = ({ view, icon: Icon, label, disabled = false }: { view: ViewState; icon: any; label: string; disabled?: boolean }) => (
    <button
      onClick={() => {
        if (!disabled) {
          setView(view);
          setIsMobileMenuOpen(false);
        }
      }}
      disabled={disabled}
      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
        currentView === view
          ? 'bg-rose-500 text-white shadow-lg shadow-rose-200'
          : disabled 
            ? 'opacity-50 cursor-not-allowed text-gray-400'
            : 'text-gray-600 hover:bg-rose-50'
      }`}
    >
      <Icon size={20} />
      <span className="font-semibold">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-rose-50/50">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-rose-100 p-6 h-screen sticky top-0">
        <div className="flex items-center space-x-2 mb-10 text-rose-600">
          <Sparkles className="w-8 h-8 fill-rose-600" />
          <h1 className="text-2xl font-bold tracking-tight">SparkStream</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          {isAdmin ? (
            <>
              <NavItem view={ViewState.ADMIN} icon={Shield} label="Admin Panel" />
              <div className="my-4 border-t border-gray-100 mx-2"></div>
              <NavItem view={ViewState.DASHBOARD} icon={LayoutDashboard} label="Dashboard" disabled />
              <NavItem view={ViewState.IDEATION} icon={Sparkles} label="Idea Generator" disabled />
            </>
          ) : (
            <>
              <NavItem view={ViewState.DASHBOARD} icon={LayoutDashboard} label="Dashboard" />
              <NavItem view={ViewState.IDEATION} icon={Sparkles} label="Idea Generator" />
              <NavItem view={ViewState.CREATOR} icon={PenTool} label="Content Creator" />
              <NavItem view={ViewState.COLLAB} icon={Users} label="Collab Hub" />
              <NavItem view={ViewState.ANALYTICS} icon={BarChart3} label="Analytics" />
            </>
          )}
        </nav>

        <div className="mt-auto pt-6 border-t border-rose-100 space-y-4">
          {!isAdmin && (
            <div className="p-4 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl text-white shadow-md">
              <p className="text-sm font-medium opacity-90">Daily Streak</p>
              <p className="text-2xl font-bold">🔥 12 Days</p>
            </div>
          )}
          <button 
            onClick={onLogout}
            className="flex items-center space-x-3 w-full px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <LogOut size={18} />
            <span className="font-semibold">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 flex justify-between items-center border-b border-rose-100 sticky top-0 z-20">
        <div className="flex items-center space-x-2 text-rose-600">
          <Sparkles className="w-6 h-6 fill-rose-600" />
          <span className="text-xl font-bold">SparkStream</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-white pt-20 px-6">
          <nav className="space-y-4">
            {isAdmin ? (
               <NavItem view={ViewState.ADMIN} icon={Shield} label="Admin Panel" />
            ) : (
              <>
                <NavItem view={ViewState.DASHBOARD} icon={LayoutDashboard} label="Dashboard" />
                <NavItem view={ViewState.IDEATION} icon={Sparkles} label="Idea Generator" />
                <NavItem view={ViewState.CREATOR} icon={PenTool} label="Content Creator" />
                <NavItem view={ViewState.COLLAB} icon={Users} label="Collab Hub" />
                <NavItem view={ViewState.ANALYTICS} icon={BarChart3} label="Analytics" />
              </>
            )}
            <div className="pt-4 border-t border-gray-100">
               <button onClick={onLogout} className="flex items-center gap-2 text-gray-600 font-semibold">
                 <LogOut size={18} /> Logout
               </button>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
};
