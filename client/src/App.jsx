import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ImageStudio from './components/ImageStudio';
import VideoStudio from './components/VideoStudio';
import AssetGallery from './components/AssetGallery';
import BandwidthCalculator from './components/BandwidthCalculator';
import CreatorDossier from './components/CreatorDossier';
import UploaderModal from './components/UploaderModal';
import { checkHealth } from './lib/api';
import { CLOUD_NAME } from './lib/cloudinary';
import { Sparkles, Heart, ExternalLink, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('image-studio');
  const [selectedAsset, setSelectedAsset] = useState('main-sample');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [cloudStatus, setCloudStatus] = useState('checking');

  useEffect(() => {
    checkHealth().then((res) => {
      if (res.status === 'online') {
        setCloudStatus('online');
      } else {
        setCloudStatus('error');
      }
    });
  }, []);

  const handleUploadSuccess = (uploadedData) => {
    if (uploadedData && uploadedData.public_id) {
      setSelectedAsset(uploadedData.public_id);
      if (uploadedData.resource_type === 'video') {
        setActiveTab('video-studio');
      } else {
        setActiveTab('image-studio');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenUpload={() => setIsUploadOpen(true)}
        cloudStatus={cloudStatus}
      />

      {/* Main Tab View */}
      <main className="flex-1 pb-16">
        {activeTab === 'image-studio' && (
          <ImageStudio
            initialAsset={selectedAsset}
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        )}
        {activeTab === 'video-studio' && <VideoStudio />}
        {activeTab === 'gallery' && (
          <AssetGallery
            onSelectAsset={(id, type) => {
              setSelectedAsset(id);
              setActiveTab(type === 'video' ? 'video-studio' : 'image-studio');
            }}
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        )}
        {activeTab === 'bandwidth' && <BandwidthCalculator />}
        {activeTab === 'creator-pitch' && <CreatorDossier />}
      </main>

      {/* Upload Modal */}
      <UploaderModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#080B12] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">MediaForge</span>
            <span>•</span>
            <span>Cloudinary Creators Showcase</span>
            <span>•</span>
            <span className="font-mono text-cyan-300">Cloud: {CLOUD_NAME}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://cloudinary.com/documentation"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <span>Cloudinary Docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <span className="flex items-center gap-1">
              Built for <span className="text-white font-semibold">Cloudinary Creators</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
