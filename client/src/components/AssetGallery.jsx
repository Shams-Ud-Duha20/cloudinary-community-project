import React, { useState, useEffect } from 'react';
import { 
  FolderGit2, 
  Image as ImageIcon, 
  Video, 
  Search, 
  RefreshCw, 
  Trash2, 
  ExternalLink, 
  Copy, 
  Check, 
  Wand2, 
  Upload, 
  Loader2, 
  AlertCircle,
  Database
} from 'lucide-react';
import { getAssets, deleteAsset, getAccountUsage } from '../lib/api';
import { CLOUD_NAME, buildCloudinaryUrl } from '../lib/cloudinary';

export default function AssetGallery({ onSelectAsset, onOpenUpload }) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all'); // 'all', 'image', 'video'
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [usageData, setUsageData] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      const [assetsRes, usageRes] = await Promise.all([
        getAssets(filterType, 40),
        getAccountUsage()
      ]);

      if (assetsRes.success) {
        setAssets(assetsRes.resources || []);
      } else {
        throw new Error(assetsRes.message || 'Failed to fetch assets');
      }

      if (usageRes.success) {
        setUsageData(usageRes.data);
      }
    } catch (err) {
      setError(err.message || 'Error loading assets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [filterType]);

  const handleDelete = async (publicId, resourceType) => {
    if (!window.confirm(`Are you sure you want to delete asset "${publicId}" from Cloudinary?`)) {
      return;
    }
    setDeletingId(publicId);
    try {
      await deleteAsset(publicId, resourceType);
      setAssets((prev) => prev.filter((a) => a.public_id !== publicId));
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const copyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredAssets = assets.filter((asset) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      asset.public_id.toLowerCase().includes(query) ||
      (asset.format && asset.format.toLowerCase().includes(query)) ||
      (asset.resource_type && asset.resource_type.toLowerCase().includes(query))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Banner with Usage Stats */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0F172A]/70 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 glow-cyan" />
              <h1 className="text-xl font-extrabold text-white">Cloudinary Asset Library</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Live explorer for all media stored in cloud <span className="font-mono text-cyan-300 font-semibold">{CLOUD_NAME}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchMedia}
              disabled={loading}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={onOpenUpload}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5 shadow-md shadow-blue-500/20"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload New</span>
            </button>
          </div>
        </div>

        {/* Account Usage Metrics */}
        {usageData && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Plan</span>
              <p className="text-sm font-extrabold text-cyan-300 mt-0.5">{usageData.plan || 'Free'} Tier</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Assets</span>
              <p className="text-sm font-extrabold text-white mt-0.5">{usageData.resources || assets.length} Objects</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cloud Storage</span>
              <p className="text-sm font-extrabold text-white mt-0.5">
                {((usageData.storage?.usage || 0) / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Credit Quota</span>
              <p className="text-sm font-extrabold text-emerald-400 mt-0.5">
                {usageData.credits?.used_percent || 0.68}% Used
              </p>
            </div>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Filter Pills */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Media' },
              { id: 'image', label: 'Images' },
              { id: 'video', label: 'Videos' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterType === tab.id
                    ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by public ID or format..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-400">Connecting to Cloudinary Admin API...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
          <p className="text-sm font-semibold text-rose-300">{error}</p>
          <button
            onClick={fetchMedia}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center border border-slate-800 space-y-3">
          <FolderGit2 className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Assets Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchQuery
              ? `No media matches your search "${searchQuery}".`
              : 'Upload images or videos to populate your cloud media library.'}
          </p>
          <button
            onClick={onOpenUpload}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white inline-flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload Asset
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => {
            const isVideo = asset.resource_type === 'video';
            const thumbUrl = isVideo
              ? buildCloudinaryUrl(asset.public_id, { width: 360, height: 240, crop: 'fill' }, 'video').replace(/\.[^/.]+$/, '.jpg')
              : buildCloudinaryUrl(asset.public_id, { width: 360, height: 240, crop: 'fill' }, 'image');

            return (
              <div
                key={asset.asset_id || asset.public_id}
                className="group glass-card rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-all shadow-lg flex flex-col"
              >
                {/* Thumbnail container */}
                <div className="relative aspect-video bg-slate-950 overflow-hidden flex items-center justify-center">
                  <img
                    src={thumbUrl}
                    alt={asset.public_id}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Resource type badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white border border-white/10">
                      {isVideo ? <Video className="w-3 h-3 text-cyan-400" /> : <ImageIcon className="w-3 h-3 text-blue-400" />}
                      {asset.format || (isVideo ? 'MP4' : 'IMG')}
                    </span>
                  </div>

                  {/* Quick actions overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => onSelectAsset(asset.public_id, isVideo ? 'video' : 'image')}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow-lg"
                    >
                      <Wand2 className="w-3 h-3" />
                      Studio
                    </button>
                    <a
                      href={asset.secure_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                      title="Open full size"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-slate-900/60">
                  <div>
                    <p className="text-xs font-bold text-white truncate" title={asset.public_id}>
                      {asset.display_name || asset.public_id}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-between font-mono">
                      <span>{asset.width} × {asset.height} px</span>
                      <span>{(asset.bytes / 1024).toFixed(0)} KB</span>
                    </p>
                  </div>

                  {/* Card bottom toolbar */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => copyUrl(asset.secure_url, asset.public_id)}
                      className="text-[11px] font-semibold text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                    >
                      {copiedId === asset.public_id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(asset.public_id, asset.resource_type)}
                      disabled={deletingId === asset.public_id}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      title="Delete asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
