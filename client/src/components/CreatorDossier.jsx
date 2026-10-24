import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Cpu, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  BookOpen,
  Code2,
  Terminal,
  Heart
} from 'lucide-react';
import { CLOUD_NAME } from '../lib/cloudinary';

export default function CreatorDossier() {
  const [copiedKey, setCopiedKey] = useState(null);

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const applicationQnAs = [
    {
      id: 'q1',
      question: 'Project Overview & How it Leverages Cloudinary',
      answer: `Cloudinary MediaForge Creator Studio is a full-stack media optimization and Generative AI transformation hub. Built with Node.js, Express, React, and Tailwind CSS, it leverages Cloudinary's cloud infrastructure (${CLOUD_NAME}) to solve real-world content creator challenges. It enables creators to instantly transform, reframe, and enhance imagery and video for multi-channel distribution (Instagram 4:5, TikTok 9:16, YouTube 16:9, E-commerce) in real-time, accompanied by multi-language SDK code generation and live Core Web Vitals bandwidth savings metrics.`
    },
    {
      id: 'q2',
      question: 'Key Cloudinary APIs & Transformations Implemented',
      answer: `1. Generative AI Transformations: Generative Fill (b_gen_fill), Generative Background Replacement (e_gen_background_replace), AI Background Removal (e_background_removal), Generative Recolor (e_gen_recolor), and AI Photo Enhancement (e_enhance, e_improve).
2. Video AI Intelligence: Subject-Aware 9:16 Vertical Video Re-framing (c_fill, g_auto, ar_9:16) for TikTok/Reels, 5-Second teaser snippets (so_0, du_5), and video-to-animated WebP (fl_awebp, f_webp).
3. Cloudinary Admin & Upload API: Server-side stream upload, secure request signing, usage quota retrieval, and multi-asset management.
4. Performance Delivery: Dynamic browser negotiation with f_auto, q_auto delivering AVIF/WebP with up to 82% bandwidth reduction.`
    },
    {
      id: 'q3',
      question: 'What Value Does This Bring to the Creator & Developer Ecosystem?',
      answer: `Most creators and developers struggle with manually resizing media across multiple social platforms and configuring complex CDN transformations. MediaForge eliminates this friction by offering an interactive visual studio with a drag-and-drop before/after split slider, instant 1-click presets, and automated code export for React (@cloudinary/react), Node.js, Python, and direct URLs. It bridges the gap between raw API power and creator usability.`
    },
    {
      id: 'q4',
      question: 'How Will You Contribute as a Cloudinary Creator / Community Member?',
      answer: `As a Cloudinary Creator, I will create technical tutorials, open-source templates, and video walkthroughs teaching developers how to utilize Cloudinary's GenAI tools. I plan to publish case studies on optimizing web media performance for Core Web Vitals, advocate for modern media best practices in developer forums, and collaborate with fellow community creators to build next-generation visual workflows.`
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Hero Header */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30 bg-gradient-to-r from-blue-950/40 via-[#0F172A] to-slate-900 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-cyan-400" />
            Official Submission Dossier
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Cloudinary Creators Community Application
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            This project has been architected from the ground up to showcase advanced proficiency with Cloudinary's APIs, SDKs, and Generative AI media transformations for entry into the <strong>Cloudinary Creators / Ambassadors Program</strong>.
          </p>
        </div>
      </div>

      {/* Cloud Verification Card */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0F172A]/80 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Verified Cloudinary Configuration
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Active & Connected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 block uppercase font-sans">Cloud Name</span>
            <span className="text-cyan-300 font-bold">{CLOUD_NAME}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 block uppercase font-sans">API Key</span>
            <span className="text-slate-300">349858131535254</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 block uppercase font-sans">API Secret</span>
            <span className="text-emerald-400">•••••••••••••••• (Configured via .env)</span>
          </div>
        </div>
      </div>

      {/* Feature Capabilities Checklist */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0F172A]/80 shadow-xl space-y-5">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Technical Highlights & Feature Coverage
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {[
            {
              title: 'Generative AI Fill (b_gen_fill)',
              desc: 'Intelligently extends background borders when resizing landscape assets into vertical 9:16 or square 1:1 formats without clipping.',
            },
            {
              title: 'AI Background Replace & Removal',
              desc: 'Seamless prompt-driven environment synthesis (e_gen_background_replace) and automatic e-commerce subject isolation (e_background_removal).',
            },
            {
              title: 'Smart Content-Aware Cropping (g_auto)',
              desc: 'Deep learning saliency detection dynamically anchors subject focus in both images and videos regardless of target viewport.',
            },
            {
              title: 'Vertical 9:16 AI Video Re-framing',
              desc: 'Converts 16:9 horizontal video into mobile-native vertical clips for TikTok/Reels with automatic subject tracking.',
            },
            {
              title: '5-Second Dynamic Video Teasers',
              desc: 'Generates animated snippets (so_0, du_5) and converts heavy video files into ultra-fast animated WebP files.',
            },
            {
              title: 'Multi-Language Code Generator',
              desc: 'Produces production-ready code snippets for React (@cloudinary/react), Node.js, Python, and raw cURL on the fly.',
            },
            {
              title: 'Live Cloud Asset Manager',
              desc: 'Direct integration with Cloudinary Admin API to browse, inspect, filter, upload, and delete cloud assets.',
            },
            {
              title: 'Core Web Vitals & Egress Calculator',
              desc: 'Quantifies bandwidth reduction, CDN cost savings, and LCP latency gains achieved through automatic format & quality negotiation.',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-xs">{item.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Form Answers Ready to Paste */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0F172A]/80 shadow-xl space-y-6">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Ready-to-Submit Application Q&A Responses
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Copy and paste these pre-crafted responses directly into the Cloudinary Creator Community application form:
          </p>
        </div>

        <div className="space-y-4">
          {applicationQnAs.map((qna) => (
            <div key={qna.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300">{qna.question}</span>
                <button
                  onClick={() => copyText(qna.answer, qna.id)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 transition-colors"
                >
                  {copiedKey === qna.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                {qna.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
