import React, { useState } from 'react';
import { 
  Zap, 
  TrendingDown, 
  Leaf, 
  Clock, 
  DollarSign, 
  HardDrive, 
  Gauge, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function BandwidthCalculator() {
  const [monthlyVisitors, setMonthlyVisitors] = useState(50000);
  const [imagesPerPage, setImagesPerPage] = useState(8);
  const [avgOriginalImageSizeKB, setAvgOriginalImageSizeKB] = useState(1200); // 1.2 MB unoptimized

  // Calculations
  // Cloudinary f_auto + q_auto typically achieves 75% to 85% reduction by delivering AVIF/WebP
  const compressionRatio = 0.82; // 82% reduction
  const optimizedImageSizeKB = Math.round(avgOriginalImageSizeKB * (1 - compressionRatio)); // ~216 KB

  const totalPageViews = monthlyVisitors * 2.5; // avg 2.5 page views per visitor
  const totalImageRequests = totalPageViews * imagesPerPage;

  const rawBandwidthGB = Math.round((totalImageRequests * avgOriginalImageSizeKB) / (1024 * 1024));
  const optimizedBandwidthGB = Math.round((totalImageRequests * optimizedImageSizeKB) / (1024 * 1024));
  const savedBandwidthGB = rawBandwidthGB - optimizedBandwidthGB;

  // Estimated CDN egress cost ($0.08 per GB standard cloud egress)
  const estimatedCostSavingsUSD = Math.round(savedBandwidthGB * 0.08);

  // Carbon emission saved (approx 0.2g CO2 per MB transferred)
  const co2SavedKg = Math.round((savedBandwidthGB * 1024 * 0.2) / 1000);

  // LCP speed improvement estimate (on 4G mobile)
  const lcpImprovementSeconds = (
    ((avgOriginalImageSizeKB - optimizedImageSizeKB) * 8) / (15 * 1000)
  ).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0F172A]/70 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 glow-cyan" />
          <h1 className="text-xl font-extrabold text-white">Speed & Bandwidth Savings Engine</h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Calculate real-world bandwidth reductions, Core Web Vitals speedups, and cloud egress savings achieved via Cloudinary <code className="text-cyan-300">f_auto,q_auto</code>
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sliders Input Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0F172A]/80 shadow-xl space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Gauge className="w-4 h-4 text-cyan-400" />
              Traffic & Asset Parameters
            </h3>

            {/* Slider 1: Monthly Visitors */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Monthly Active Visitors</span>
                <span className="font-mono font-bold text-cyan-300 text-sm">
                  {monthlyVisitors.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={monthlyVisitors}
                onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>5K</span>
                <span>250K</span>
                <span>500K</span>
              </div>
            </div>

            {/* Slider 2: Images per Page */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Media Assets per Page</span>
                <span className="font-mono font-bold text-cyan-300 text-sm">{imagesPerPage} assets</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                step="1"
                value={imagesPerPage}
                onChange={(e) => setImagesPerPage(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>2 assets</span>
                <span>15 assets</span>
                <span>30 assets</span>
              </div>
            </div>

            {/* Slider 3: Average Raw Image Size */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Original Unoptimized Image Size</span>
                <span className="font-mono font-bold text-cyan-300 text-sm">
                  {(avgOriginalImageSizeKB / 1024).toFixed(1)} MB ({avgOriginalImageSizeKB} KB)
                </span>
              </div>
              <input
                type="range"
                min="400"
                max="4000"
                step="100"
                value={avgOriginalImageSizeKB}
                onChange={(e) => setAvgOriginalImageSizeKB(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>400 KB</span>
                <span>2.0 MB</span>
                <span>4.0 MB</span>
              </div>
            </div>

            {/* Benchmark Pill */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
              <span className="text-slate-200 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Cloudinary Automatic Negotiation:
              </span>
              <p className="text-[11px] leading-relaxed">
                Cloudinary detects browser capabilities on the fly, delivering AVIF to Chrome/Safari and WebP to older clients at perceptual quality without pixel degradation.
              </p>
            </div>
          </div>
        </div>

        {/* Output Metrics Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Main Hero Card: Bandwidth Saved */}
          <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 bg-gradient-to-br from-blue-900/30 via-[#0F172A] to-slate-950 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-cyan-400" />
                Monthly Bandwidth Reduction
              </span>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {savedBandwidthGB > 1000 ? `${(savedBandwidthGB / 1024).toFixed(1)} TB` : `${savedBandwidthGB.toLocaleString()} GB`}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  -82% Payload
                </span>
              </div>

              {/* Progress Bar Comparison */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-rose-400 flex items-center gap-1">
                    Without Cloudinary: {rawBandwidthGB.toLocaleString()} GB
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    With Cloudinary: {optimizedBandwidthGB.toLocaleString()} GB
                  </span>
                </div>
                <div className="h-3 w-full bg-rose-500/30 rounded-full overflow-hidden flex p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full shadow-lg transition-all duration-500"
                    style={{ width: `${Math.max(18, 100 - compressionRatio * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Metric 1: Cost Savings */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-[#0F172A]/80 shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <DollarSign className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Egress Savings</span>
              </div>
              <p className="text-2xl font-extrabold text-white">
                ${estimatedCostSavingsUSD.toLocaleString()}
              </p>
              <p className="text-[11px] text-slate-400">
                Estimated monthly CDN cloud egress costs eliminated
              </p>
            </div>

            {/* Metric 2: Speedup */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-[#0F172A]/80 shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-cyan-400">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">LCP Speedup</span>
              </div>
              <p className="text-2xl font-extrabold text-white">
                ~{lcpImprovementSeconds}s
              </p>
              <p className="text-[11px] text-slate-400">
                Faster hero image load time on standard 4G mobile devices
              </p>
            </div>

            {/* Metric 3: Carbon Reduction */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-[#0F172A]/80 shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-teal-400">
                <Leaf className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Eco Impact</span>
              </div>
              <p className="text-2xl font-extrabold text-white">
                {co2SavedKg.toLocaleString()} kg
              </p>
              <p className="text-[11px] text-slate-400">
                CO2 emissions prevented across data center transfers
              </p>
            </div>
          </div>

          {/* Format Comparison Breakdown */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-[#0F172A]/60 space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Format Size Breakdown for an Average Asset:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] font-bold text-rose-400 block">Raw PNG</span>
                <span className="text-sm font-extrabold text-white">{avgOriginalImageSizeKB} KB</span>
                <span className="text-[10px] text-slate-500 block">Baseline (100%)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] font-bold text-amber-400 block">Standard JPG</span>
                <span className="text-sm font-extrabold text-white">{Math.round(avgOriginalImageSizeKB * 0.65)} KB</span>
                <span className="text-[10px] text-emerald-400 block">-35% Saved</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] font-bold text-cyan-400 block">Cloudinary WebP</span>
                <span className="text-sm font-extrabold text-white">{Math.round(avgOriginalImageSizeKB * 0.28)} KB</span>
                <span className="text-[10px] text-emerald-400 block">-72% Saved</span>
              </div>
              <div className="p-3 rounded-xl bg-blue-950/40 border border-cyan-500/40">
                <span className="text-[11px] font-bold text-emerald-400 block">Cloudinary AVIF</span>
                <span className="text-sm font-extrabold text-white">{optimizedImageSizeKB} KB</span>
                <span className="text-[10px] text-emerald-300 font-bold block">-82% Saved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
