import React, { useState, useRef } from 'react';
import { X, Upload, Link2, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { uploadAsset, uploadUrl } from '../lib/api';

export default function UploaderModal({ isOpen, onClose, onUploadSuccess }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('file'); // 'file' or 'url'
  const [file, setFile] = useState(null);
  const [remoteUrl, setRemoteUrl] = useState('');
  const [tags, setTags] = useState('creator-showcase');
  const [folder, setFolder] = useState('creator-studio');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);

    try {
      let result;
      if (activeTab === 'file') {
        if (!file) throw new Error('Please select a file to upload');
        const resourceType = file.type.startsWith('video/') ? 'video' : 'image';
        result = await uploadAsset(file, { folder, tags, resourceType });
      } else {
        if (!remoteUrl) throw new Error('Please enter a valid remote media URL');
        result = await uploadUrl(remoteUrl, { folder, tags });
      }

      setSuccessData(result.data);
      if (onUploadSuccess) {
        onUploadSuccess(result.data);
      }
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const resetModal = () => {
    setFile(null);
    setRemoteUrl('');
    setError(null);
    setSuccessData(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-cyan-400" />
              Upload Asset to Cloudinary
            </h3>
            <p className="text-xs text-slate-400">
              Directly stream to cloud: <span className="font-mono text-cyan-300">egpyibpx</span>
            </p>
          </div>
          <button
            onClick={() => { resetModal(); onClose(); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        {!successData && (
          <div className="flex border-b border-slate-800 bg-slate-950/40">
            <button
              onClick={() => setActiveTab('file')}
              className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border-b-2 ${
                activeTab === 'file'
                  ? 'border-cyan-400 text-cyan-300 bg-slate-800/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Upload File
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border-b-2 ${
                activeTab === 'url'
                  ? 'border-cyan-400 text-cyan-300 bg-slate-800/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              Import from URL
            </button>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6">
          {successData ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Upload Successful!</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Public ID: <span className="font-mono text-cyan-300">{successData.public_id}</span>
                </p>
                <p className="text-xs text-slate-400">
                  Size: {(successData.bytes / 1024).toFixed(1)} KB • {successData.format.toUpperCase()}
                </p>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => { resetModal(); onClose(); }}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/30"
                >
                  Open in Studio
                </button>
                <button
                  onClick={resetModal}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Upload Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {activeTab === 'file' ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-cyan-400/70 rounded-xl p-8 text-center cursor-pointer transition-colors bg-slate-950/40 group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                    className="hidden"
                  />
                  <div className="w-12 h-12 mx-auto rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  {file ? (
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white truncate max-w-xs mx-auto">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • Click or drag to change
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-200">
                        Drag & drop image or video here
                      </p>
                      <p className="text-xs text-slate-500">
                        Supports PNG, JPG, WebP, GIF, MP4, MOV up to 100MB
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Remote Media URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={remoteUrl}
                    onChange={(e) => setRemoteUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <p className="text-[11px] text-slate-500">
                    Cloudinary will fetch and ingest the file directly from the URL.
                  </p>
                </div>
              )}

              {/* Folder & Tag Config */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-xs font-medium text-slate-400">Folder</label>
                  <input
                    type="text"
                    value={folder}
                    onChange={(e) => setFolder(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400">Tags</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={uploading || (activeTab === 'file' ? !file : !remoteUrl)}
                  className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading to Cloudinary...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Start Upload</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
