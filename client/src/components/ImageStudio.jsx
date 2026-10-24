import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Scissors, 
  Palette, 
  Maximize2, 
  Copy, 
  Check, 
  Code2, 
  Download, 
  RotateCcw, 
  Sliders, 
  Layers, 
  Smartphone, 
  ShoppingBag, 
  Camera,
  Tv,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';
import CodeModal from './CodeModal';
import { 
  CLOUD_NAME, 
  buildCloudinaryUrl, 
  getOriginalUrl, 
  CREATOR_PRESETS 
} from '../lib/cloudinary';

const SAMPLE_ASSETS = [
  { id: 'main-sample', name: 'Portrait Fashion', desc: 'Ideal for AI background replace & facial cropping' },
  { id: 'cld-sample-4', name: 'Food & Culinary', desc: 'Great for color grading & e-commerce clarity' },
  { id: 'cld-sample-5', name: 'Sneakers & Streetwear', desc: 'Perfect for AI background removal & recolor' },
  { id: 'cld-sample-3', name: 'Sports & Basketball', desc: 'Dynamic subject tracking with g_auto' },
  { id: 'cld-sample-2', name: 'Mountain Sunset', desc: 'Landscape for AI Generative Fill & aspect ratios' },
];

export default function ImageStudio({ initialAsset, onOpenUpload }) {
  const [selectedAsset, setSelectedAsset] = useState(initialAsset || 'main-sample');
  const [viewMode, setViewMode] = useState('slider'); // 'slider' or 'side-by-side'
  const [activeTab, setActiveTab] = useState('presets'); // 'presets', 'ai', 'crop', 'filters'
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activePreset, setActivePreset] = useState(null);

  // Transform Options State
  const [options, setOptions] = useState({
    crop: 'fill',
    gravity: 'auto',
    aspectRatio: '',
    width: '',
    height: '',
    genFill: false,
    backgroundRemoval: false,
    genBgReplace: false,
    genBgPrompt: 'luxurious modern architectural villa patio with tropical palm trees at golden hour',
    genRecolor: false,
    recolorItem: 'shoes',
    recolorColor: '38bdf8',
    genReplace: false,
    replaceFrom: 'watch',
    replaceTo: 'gold bracelet',
    enhance: false,
    improve: false,
    filter: '',
    watermarkText: '',
    format: 'f_auto',
    quality: 'q_auto'
  });

  // If initialAsset changes from parent (e.g., from gallery)
  useEffect(() => {
    if (initialAsset) {
      setSelectedAsset(initialAsset);
    }
  }, [initialAsset]);

  const originalUrl = getOriginalUrl(selectedAsset, 'image');
  const transformedUrl = buildCloudinaryUrl(selectedAsset, options, 'image');

  const applyPreset = (preset) => {
    setActivePreset(preset.id);
    setOptions((prev) => ({
      ...prev,
      ...preset.options
    }));
  };

  const resetTransforms = () => {
    setActivePreset(null);
    setOptions({
      crop: 'fill',
      gravity: 'auto',
      aspectRatio: '',
      width: '',
      height: '',
      genFill: false,
      backgroundRemoval: false,
      genBgReplace: false,
      genBgPrompt: 'luxurious modern architectural villa patio with tropical palm trees at golden hour',
      genRecolor: false,
      recolorItem: 'shoes',
      recolorColor: '38bdf8',
      genReplace: false,
      replaceFrom: 'watch',
      replaceTo: 'gold bracelet',
      enhance: false,
      improve: false,
      filter: '',
      watermarkText: '',
      format: 'f_auto',
      quality: 'q_auto'
    });
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(transformedUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const getPresetIcon = (iconName) => {
    switch (iconName) {
      case 'Instagram': return Camera;
      case 'Smartphone': return Smartphone;
      case 'Youtube': return Tv;
      case 'ShoppingBag': return ShoppingBag;
      case 'Sparkles': return Sparkles;
      case 'Camera': return Camera;
      default: return Wand2;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Banner & Asset Picker */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0F172A]/70 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 glow-cyan" />
              <h1 className="text-xl font-extrabold text-white">AI Image Studio</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Test generative fill, background replacement, subject-aware cropping, and dynamic optimizations powered by Cloudinary
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto">
            <button
              onClick={() => setViewMode(viewMode === 'slider' ? 'side-by-side' : 'slider')}
              className="flex-1 md:flex-none px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{viewMode === 'slider' ? 'Side-by-Side View' : 'Slider View'}</span>
            </button>
            <button
              onClick={resetTransforms}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5"
              title="Reset all transformations"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Quick Sample Selector */}
        <div className="pt-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
            Select an Asset from your Cloud ({CLOUD_NAME}):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {SAMPLE_ASSETS.map((asset) => {
              const isSelected = selectedAsset === asset.id;
              const thumbUrl = buildCloudinaryUrl(asset.id, { width: 120, height: 120, crop: 'fill', gravity: 'auto' });
              return (
                <button
                  key={asset.id}
                  onClick={() => { setSelectedAsset(asset.id); setActivePreset(null); }}
                  className={`flex items-center gap-2.5 p-2 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'bg-blue-600/20 border-cyan-400 shadow-md shadow-blue-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <img
                    src={thumbUrl}
                    alt={asset.name}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="overflow-hidden">
                    <p className={`text-xs font-semibold truncate ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                      {asset.name}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono truncate">
                      {asset.id}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Studio Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Control Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-2xl border border-slate-800 bg-[#0F172A]/80 overflow-hidden shadow-xl">
            
            {/* Control Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/60">
              <button
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                  activeTab === 'presets'
                    ? 'border-cyan-400 text-cyan-300 bg-slate-800/30'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Presets</span>
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                  activeTab === 'ai'
                    ? 'border-cyan-400 text-cyan-300 bg-slate-800/30'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Gen AI</span>
              </button>
              <button
                onClick={() => setActiveTab('crop')}
                className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                  activeTab === 'crop'
                    ? 'border-cyan-400 text-cyan-300 bg-slate-800/30'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Crop</span>
              </button>
              <button
                onClick={() => setActiveTab('filters')}
                className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                  activeTab === 'filters'
                    ? 'border-cyan-400 text-cyan-300 bg-slate-800/30'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-5 max-h-[540px] overflow-y-auto space-y-4">
              
              {/* TAB 1: CREATOR PRESETS */}
              {activeTab === 'presets' && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-400 mb-2">
                    1-Click configurations designed for creators, social platforms, and e-commerce:
                  </div>
                  {CREATOR_PRESETS.map((preset) => {
                    const Icon = getPresetIcon(preset.icon);
                    const isApplied = activePreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => applyPreset(preset)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                          isApplied
                            ? 'bg-blue-600/20 border-cyan-400 text-white shadow-lg shadow-blue-500/10'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 text-slate-300'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${isApplied ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-cyan-400'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{preset.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                              {preset.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                            {preset.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* TAB 2: GENERATIVE AI */}
              {activeTab === 'ai' && (
                <div className="space-y-4">
                  {/* Generative Background Replace */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold text-white">AI Background Replace</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={options.genBgReplace}
                        onChange={(e) => setOptions({ ...options, genBgReplace: e.target.checked, backgroundRemoval: false })}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-0 focus:ring-offset-0 bg-slate-800 border-slate-700"
                      />
                    </div>
                    {options.genBgReplace && (
                      <div className="space-y-1.5 pt-1">
                        <label className="text-[11px] text-slate-400">Prompt:</label>
                        <textarea
                          rows={2}
                          value={options.genBgPrompt}
                          onChange={(e) => setOptions({ ...options, genBgPrompt: e.target.value })}
                          className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                          placeholder="e.g. cozy coffee shop with soft natural morning light"
                        />
                      </div>
                    )}
                  </div>

                  {/* Generative Fill */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-bold text-white">AI Generative Fill (b_gen_fill)</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Extends canvas seamlessly to fit new aspect ratios
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={options.genFill}
                      onChange={(e) => setOptions({ ...options, genFill: e.target.checked, crop: e.target.checked ? 'pad' : 'fill' })}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-800 border-slate-700"
                    />
                  </div>

                  {/* AI Background Removal */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Scissors className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white">AI Background Removal</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        High-accuracy foreground isolation for products and portraits
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={options.backgroundRemoval}
                      onChange={(e) => setOptions({ ...options, backgroundRemoval: e.target.checked, genBgReplace: false })}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-800 border-slate-700"
                    />
                  </div>

                  {/* AI Photo Enhance */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Wand2 className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-white">AI Enhance & Improve</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Automatic contrast, dynamic range, and edge restoration
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={options.enhance}
                      onChange={(e) => setOptions({ ...options, enhance: e.target.checked, improve: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-800 border-slate-700"
                    />
                  </div>

                  {/* Generative Recolor */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold text-white">Generative Recolor</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={options.genRecolor}
                        onChange={(e) => setOptions({ ...options, genRecolor: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-800 border-slate-700"
                      />
                    </div>
                    {options.genRecolor && (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div>
                          <label className="text-[10px] text-slate-400">Target Object:</label>
                          <input
                            type="text"
                            value={options.recolorItem}
                            onChange={(e) => setOptions({ ...options, recolorItem: e.target.value })}
                            placeholder="e.g. shoes, shirt"
                            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400">Hex Color:</label>
                          <input
                            type="text"
                            value={options.recolorColor}
                            onChange={(e) => setOptions({ ...options, recolorColor: e.target.value })}
                            placeholder="e.g. 38bdf8"
                            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: CROPPING & ASPECT RATIO */}
              {activeTab === 'crop' && (
                <div className="space-y-4">
                  {/* Aspect Ratio Shortcuts */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">
                      Target Aspect Ratio:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Original', val: '' },
                        { label: 'Square (1:1)', val: '1:1' },
                        { label: 'Portrait (4:5)', val: '4:5' },
                        { label: 'Vertical (9:16)', val: '9:16' },
                        { label: 'Cinema (16:9)', val: '16:9' },
                        { label: 'Banner (3:1)', val: '3:1' },
                      ].map((ar) => (
                        <button
                          key={ar.label}
                          onClick={() => setOptions({ ...options, aspectRatio: ar.val })}
                          className={`py-2 px-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                            options.aspectRatio === ar.val
                              ? 'bg-blue-600/30 border-cyan-400 text-cyan-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {ar.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Smart Gravity / Focus Mode */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">
                      Focus Gravity (Content Awareness):
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'g_auto (AI Saliency)', val: 'auto' },
                        { label: 'g_face (Face Detection)', val: 'face' },
                        { label: 'g_center', val: 'center' },
                        { label: 'g_north', val: 'north' },
                      ].map((grav) => (
                        <button
                          key={grav.val}
                          onClick={() => setOptions({ ...options, gravity: grav.val })}
                          className={`py-2 px-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                            options.gravity === grav.val
                              ? 'bg-blue-600/30 border-cyan-400 text-cyan-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {grav.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Dimensions */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-xs text-slate-400">Custom Width (px):</label>
                      <input
                        type="number"
                        placeholder="e.g. 1080"
                        value={options.width}
                        onChange={(e) => setOptions({ ...options, width: e.target.value })}
                        className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Custom Height (px):</label>
                      <input
                        type="number"
                        placeholder="e.g. 1350"
                        value={options.height}
                        onChange={(e) => setOptions({ ...options, height: e.target.value })}
                        className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: FILTERS & BRANDING */}
              {activeTab === 'filters' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">
                      Artistic Filters:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'None', val: '' },
                        { label: 'Grayscale', val: 'grayscale' },
                        { label: 'Sepia Vintage', val: 'sepia' },
                        { label: 'Vignette', val: 'vignette' },
                        { label: 'Cartoonify', val: 'cartoonify' },
                        { label: 'Glass Blur', val: 'blur' },
                      ].map((f) => (
                        <button
                          key={f.label}
                          onClick={() => setOptions({ ...options, filter: f.val })}
                          className={`py-2 px-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                            options.filter === f.val
                              ? 'bg-blue-600/30 border-cyan-400 text-cyan-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Watermark Branding */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-semibold text-slate-300">
                      Dynamic Watermark Overlay:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. @YourBrand • Cloudinary"
                      value={options.watermarkText}
                      onChange={(e) => setOptions({ ...options, watermarkText: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                    <p className="text-[11px] text-slate-500">
                      Renders dynamic text layer overlay (l_text) at 80% opacity on the bottom-right.
                    </p>
                  </div>

                  {/* Output Delivery format & Quality */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-xs text-slate-400">Format (f_auto):</label>
                      <select
                        value={options.format}
                        onChange={(e) => setOptions({ ...options, format: e.target.value })}
                        className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      >
                        <option value="f_auto">f_auto (Smart Best)</option>
                        <option value="f_avif">AVIF (Next-Gen)</option>
                        <option value="f_webp">WebP</option>
                        <option value="f_png">PNG (Lossless)</option>
                        <option value="f_jpg">JPEG</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Quality (q_auto):</label>
                      <select
                        value={options.quality}
                        onChange={(e) => setOptions({ ...options, quality: e.target.value })}
                        className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      >
                        <option value="q_auto">q_auto (Optimal)</option>
                        <option value="q_auto:best">q_auto:best (High)</option>
                        <option value="q_auto:good">q_auto:good</option>
                        <option value="q_auto:eco">q_auto:eco (Smallest)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions Bar inside Control Panel */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex gap-2">
              <button
                onClick={() => setIsCodeModalOpen(true)}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export Code</span>
              </button>
              <a
                href={transformedUrl}
                download={`cloudinary-asset-${selectedAsset}.jpg`}
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
          
          {/* Main Visual Comparison */}
          {viewMode === 'slider' ? (
            <BeforeAfterSlider
              originalUrl={originalUrl}
              transformedUrl={transformedUrl}
              originalLabel="Original Asset"
              transformedLabel="Cloudinary Transformed"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                  Original Raw Asset
                </span>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
                  <img
                    src={originalUrl}
                    alt="Original"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Cloudinary Transformed
                </span>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/30 shadow-xl">
                  <img
                    src={transformedUrl}
                    alt="Transformed"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Live Dynamic Cloudinary URL Card */}
          <div className="glass-panel rounded-2xl p-4 border border-slate-800 bg-[#0F172A]/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Live Generated Transformation URL:
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

      {/* Code Export Modal */}
      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        publicId={selectedAsset}
        options={options}
        resourceType="image"
      />
    </div>
  );
}
