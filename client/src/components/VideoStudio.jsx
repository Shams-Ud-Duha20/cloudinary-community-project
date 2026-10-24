import React, { useState } from 'react';
import { 
  Video, 
  Sparkles, 
  Smartphone, 
  Zap, 
  RotateCcw, 
  Code2, 
  Download, 
  Copy, 
  Check, 
  Film,
  Play,
  Gauge,
  Sliders
} from 'lucide-react';
import CodeModal from './CodeModal';
import { 
  CLOUD_NAME, 
  buildCloudinaryUrl, 
  getOriginalUrl 
} from '../lib/cloudinary';

const SAMPLE_VIDEOS = [
  { id: 'samples/dance-2', name: 'Dynamic Dance', desc: 'Fast subject motion tracking with g_auto' },
  { id: 'samples/cld-sample-video', name: 'City & Drone 4K', desc: 'Ultra HD landscape transcoding' },
  { id: 'samples/sea-turtle', name: 'Sea Turtle Wildlife', desc: 'Underwater color grading & slow-motion' },
  { id: 'samples/elephants', name: 'Elephants Nature', desc: '16:9 cinematic re-framing to vertical' },
];

export default function VideoStudio() {
  const [selectedVideo, setSelectedVideo] = useState('samples/dance-2');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Video Options
  const [options, setOptions] = useState({
    crop: 'fill',
    gravity: 'auto',
    aspectRatio: '9:16', // default to smart vertical
    width: 720,
    height: 1280,
    speed: 0, // 0 = normal, 50 = fast, -50 = slow
    previewDuration: 0, // 0 = full, 5 = 5s snippet
    asAnimatedWebp: false,
    asAnimatedGif: false,
    watermarkText: '',
    format: 'f_auto',
    quality: 'q_auto'
  });

  const originalUrl = getOriginalUrl(selectedVideo, 'video');
  const transformedUrl = buildCloudinaryUrl(selectedVideo, options, 'video');

  const copyUrl = () => {
    navigator.clipboard.writeText(transformedUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const resetTransforms = () => {
    setOptions({
      crop: 'fill',
      gravity: 'auto',
      aspectRatio: '9:16',
      width: 720,
      height: 1280,
      speed: 0,
      previewDuration: 0,
      asAnimatedWebp: false,
      asAnimatedGif: false,
      watermarkText: '',
      format: 'f_auto',
      quality: 'q_auto'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0F172A]/70 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 glow-cyan" />
              <h1 className="text-xl font-extrabold text-white">AI Video Studio</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              AI Subject-Aware Re-framing (Shorts / Reels / TikTok), dynamic 5s teasers, and automated video transcoding
            </p>
          </div>

          <button
            onClick={resetTransforms}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Settings</span>
          </button>
        </div>

        {/* Video Selector */}
        <div className="pt-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
            Select Video Asset from Cloud ({CLOUD_NAME}):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SAMPLE_VIDEOS.map((video) => {
              const isSelected = selectedVideo === video.id;
              return (
                <button
                  key={video.id}
                  onClick={() => setSelectedVideo(video.id)}
                  className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-600/20 border-cyan-400 shadow-md shadow-blue-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Film className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className={`text-xs font-bold truncate ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                      {video.name}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-2">
                    {video.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-2xl border border-slate-800 bg-[#0F172A]/80 p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Creator Video Tools
            </h3>

            {/* Smart 9:16 Vertical Video */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white">Smart 9:16 Vertical Reframe</span>
                </div>
                <input
                  type="checkbox"
                  checked={options.aspectRatio === '9:16'}
                  onChange={(e) => setOptions({
                    ...options,
                    aspectRatio: e.target.checked ? '9:16' : '',
                    width: e.target.checked ? 720 : '',
                    height: e.target.checked ? 1280 : '',
                    crop: 'fill',
                    gravity: 'auto'
                  })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-800 border-slate-700"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Uses Cloudinary AI content tracking (<code className="text-cyan-300">g_auto</code>) to dynamically follow subjects across video frames.
              </p>
            </div>

            {/* AI 5-Second Teaser Snippet */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">5-Second Dynamic Teaser</span>
                </div>
                <input
                  type="checkbox"
                  checked={options.previewDuration === 5}
                  onChange={(e) => setOptions({ ...options, previewDuration: e.target.checked ? 5 : 0 })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-800 border-slate-700"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Extracts the opening 5-second teaser clip (<code className="text-cyan-300">so_0,du_5</code>) for fast hero banners and previews.
              </p>
            </div>

            {/* Convert to Animated WebP/GIF */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-white">Export as Animated WebP</span>
                </div>
                <input
                  type="checkbox"
                  checked={options.asAnimatedWebp}
                  onChange={(e) => setOptions({
                    ...options,
                    asAnimatedWebp: e.target.checked,
                    asAnimatedGif: false
                  })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-800 border-slate-700"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Converts video to lightweight animated WebP (<code className="text-cyan-300">fl_awebp,f_webp</code>) saving up to 85% bandwidth over GIF.
              </p>
            </div>

            {/* Speed Multiplier */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">Speed Adjustment</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { label: '0.5x Slow', val: -50 },
                  { label: '1x Normal', val: 0 },
                  { label: '1.5x Fast', val: 50 },
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setOptions({ ...options, speed: s.val })}
                    className={`py-1.5 text-xs font-semibold rounded-lg border text-center transition-colors ${
                      options.speed === s.val
                        ? 'bg-blue-600/30 border-cyan-400 text-cyan-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Watermark Branding */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-slate-300">
                Video Watermark Overlay:
              </label>
              <input
                type="text"
                placeholder="e.g. Created with Cloudinary"
                value={options.watermarkText}
                onChange={(e) => setOptions({ ...options, watermarkText: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Actions Bar */}
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => setIsCodeModalOpen(true)}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export Code</span>
              </button>
              <a
                href={transformedUrl}
                download={`cloudinary-video-${selectedVideo.replace('/', '_')}.mp4`}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Viewport (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Original Video */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                Original Source (16:9 Landscape)
              </span>
              <div className="aspect-[9/16] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl flex items-center justify-center">
                <video
                  key={originalUrl}
                  src={originalUrl}
                  controls
                  loop
                  muted
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Transformed Video */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Cloudinary AI Smart Vertical (9:16)
              </span>
              <div className="aspect-[9/16] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/30 shadow-xl flex items-center justify-center">
                {options.asAnimatedWebp ? (
                  <img
                    key={transformedUrl}
                    src={transformedUrl}
                    alt="Animated Preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <video
                    key={transformedUrl}
                    src={transformedUrl}
                    controls
                    loop
                    muted
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Dynamic Video URL Card */}
          <div className="glass-panel rounded-2xl p-4 border border-slate-800 bg-[#0F172A]/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Dynamic Video Delivery URL:
              </span>
              <button
                onClick={copyUrl}
                className="flex items-center gap-1 text-[11px] font-semibold text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                {copiedUrl ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-300 break-all select-all border border-slate-800">
              {transformedUrl}
            </div>
          </div>
        </div>
      </div>

      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        publicId={selectedVideo}
        options={options}
        resourceType="video"
      />
    </div>
  );
}
