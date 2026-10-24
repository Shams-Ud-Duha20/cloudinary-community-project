import React from 'react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Video, 
  FolderGit2, 
  Zap, 
  Award, 
  Upload, 
  ExternalLink,
  Cloud
} from 'lucide-react';
import { CLOUD_NAME } from '../lib/cloudinary';

export default function Navbar({ activeTab, setActiveTab, onOpenUpload, cloudStatus }) {
  const navItems = [
    { id: 'image-studio', label: 'AI Image Studio', icon: ImageIcon },
    { id: 'video-studio', label: 'AI Video Studio', icon: Video },
    { id: 'gallery', label: 'Asset Library', icon: FolderGit2 },
    { id: 'bandwidth', label: 'Speed & Savings', icon: Zap },
    { id: 'creator-pitch', label: 'Creators Submission', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-[#0B0F19]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[2px] flex items-center justify-center glow-blue">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  MediaForge
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                  Creator Edition
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <Cloud className="w-3 h-3 text-cyan-400" />
                Cloud: <span className="font-mono text-cyan-300 font-semibold">{CLOUD_NAME}</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" title="Connected" />
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenUpload}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Upload className="w-4 h-4" />
              <span>Upload to Cloud</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation row */}
      <div className="flex md:hidden overflow-x-auto px-4 py-2 border-t border-slate-800/60 space-x-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
                isActive ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/40' : 'text-slate-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
