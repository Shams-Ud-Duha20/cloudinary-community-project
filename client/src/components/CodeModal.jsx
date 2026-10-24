import React, { useState } from 'react';
import { X, Check, Copy, Terminal, Code2, Globe } from 'lucide-react';
import { generateCodeSnippets } from '../lib/cloudinary';

export default function CodeModal({ isOpen, onClose, publicId, options, resourceType = 'image' }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('react');
  const [copied, setCopied] = useState(false);

  const snippets = generateCodeSnippets(publicId, options, resourceType);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'react', label: 'React SDK', icon: Code2, code: snippets.react, lang: 'javascript' },
    { id: 'node', label: 'Node.js', icon: Terminal, code: snippets.node, lang: 'javascript' },
    { id: 'python', label: 'Python', icon: Code2, code: snippets.python, lang: 'python' },
    { id: 'url', label: 'Direct URL', icon: Globe, code: snippets.url, lang: 'text' },
    { id: 'curl', label: 'cURL', icon: Terminal, code: snippets.curl, lang: 'bash' },
  ];

  const currentCode = tabs.find((t) => t.id === activeTab)?.code || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl glass-panel rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              Generated Cloudinary Code
            </h3>
            <p className="text-xs text-slate-400">
              Integrate this transformation directly into your production application
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center px-6 pt-3 border-b border-slate-800 bg-slate-950/50 space-x-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
                  isActive
                    ? 'border-cyan-400 text-cyan-300 bg-slate-800/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Code Content View */}
        <div className="relative flex-1 p-6 overflow-auto bg-slate-950 font-mono text-xs text-slate-300">
          <button
            onClick={() => copyToClipboard(currentCode)}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 shadow transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>

          <pre className="pr-20 overflow-x-auto whitespace-pre-wrap leading-relaxed">
            <code>{currentCode}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-900/80 text-xs text-slate-400">
          <span>Target Cloud: <strong className="text-cyan-300">egpyibpx</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
