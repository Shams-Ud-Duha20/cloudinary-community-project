export const CLOUD_NAME = 'egpyibpx';

/**
 * Builds a dynamic Cloudinary URL for an image or video
 */
export function buildCloudinaryUrl(publicId, options = {}, resourceType = 'image') {
  if (!publicId) return '';
  
  // If publicId is already a full Cloudinary URL, extract the public_id or use it
  if (publicId.startsWith('http://') || publicId.startsWith('https://')) {
    // Extract public_id after /upload/ (skipping version if present)
    const match = publicId.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/);
    if (match && match[1]) {
      publicId = match[1];
    } else {
      return publicId;
    }
  }

  const parts = [];

  // Dimensions & Cropping
  const cropParts = [];
  if (options.crop) cropParts.push(`c_${options.crop}`);
  if (options.gravity) cropParts.push(`g_${options.gravity}`);
  if (options.aspectRatio) cropParts.push(`ar_${options.aspectRatio}`);
  if (options.width) cropParts.push(`w_${options.width}`);
  if (options.height) cropParts.push(`h_${options.height}`);
  if (cropParts.length > 0) parts.push(cropParts.join(','));

  // Generative AI Effects
  if (options.genFill) {
    parts.push(`b_gen_fill`);
  }
  if (options.backgroundRemoval) {
    parts.push('e_background_removal');
  }
  if (options.genBgReplace && options.genBgPrompt) {
    const cleanPrompt = encodeURIComponent(options.genBgPrompt).replace(/%20/g, ' ');
    parts.push(`e_gen_background_replace:prompt_${cleanPrompt}`);
  }
  if (options.genRecolor && options.recolorItem && options.recolorColor) {
    parts.push(`e_gen_recolor:prompt_${encodeURIComponent(options.recolorItem)};to-color_${options.recolorColor.replace('#', '')}`);
  }
  if (options.genReplace && options.replaceFrom && options.replaceTo) {
    parts.push(`e_gen_replace:from_${encodeURIComponent(options.replaceFrom)};to_${encodeURIComponent(options.replaceTo)}`);
  }

  // AI Enhancements & Filters
  if (options.enhance) {
    parts.push('e_enhance');
  }
  if (options.improve) {
    parts.push('e_improve');
  }
  if (options.filter) {
    if (options.filter === 'grayscale') parts.push('e_grayscale');
    else if (options.filter === 'sepia') parts.push('e_sepia');
    else if (options.filter === 'vignette') parts.push('e_vignette');
    else if (options.filter === 'cartoonify') parts.push('e_cartoonify');
    else if (options.filter === 'blur') parts.push(`e_blur:${options.blurAmount || 300}`);
    else if (options.filter === 'tint') parts.push(`e_tint:equalize:80:blue:red`);
  }

  // Video specific transformations
  if (resourceType === 'video') {
    if (options.videoStartOffset !== undefined && options.videoEndOffset !== undefined) {
      parts.push(`so_${options.videoStartOffset},eo_${options.videoEndOffset}`);
    }
    if (options.speed) {
      parts.push(`e_accelerate:${options.speed}`);
    }
    if (options.previewDuration) {
      parts.push(`so_0,du_${options.previewDuration}`);
    }
  }

  // Watermark overlay
  if (options.watermarkText) {
    const encodedText = encodeURIComponent(options.watermarkText);
    parts.push(`l_text:Arial_28_bold:${encodedText},co_rgb:ffffff,o_80,g_south_east,x_20,y_20`);
  }

  // Output format & optimization
  if (options.asAnimatedWebp) {
    parts.push('fl_awebp,f_webp');
  } else if (options.asAnimatedGif) {
    parts.push('fl_animated,f_gif');
  } else {
    // Default smart optimization for production
    const autoFormat = options.format || 'f_auto';
    const autoQuality = options.quality || 'q_auto';
    parts.push(`${autoFormat},${autoQuality}`);
  }

  const transformString = parts.length > 0 ? parts.join('/') + '/' : '';
  const cleanId = publicId.replace(/\.[^/.]+$/, ''); // remove extension if any

  let formatExt = '';
  if (options.asAnimatedGif) formatExt = '.gif';
  else if (options.asAnimatedWebp) formatExt = '.webp';

  return `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/${transformString}${cleanId}${formatExt}`;
}

/**
 * Returns raw un-transformed Cloudinary URL
 */
export function getOriginalUrl(publicId, resourceType = 'image') {
  if (!publicId) return '';
  if (publicId.startsWith('http://') || publicId.startsWith('https://')) return publicId;
  return `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/${publicId}`;
}

/**
 * Pre-configured presets for Creators
 */
export const CREATOR_PRESETS = [
  {
    id: 'instagram-portrait',
    name: 'Instagram Portrait (4:5)',
    category: 'Social Media',
    icon: 'Instagram',
    description: 'Smart auto-crop subject tracking for Instagram feed',
    options: {
      crop: 'fill',
      gravity: 'auto',
      aspectRatio: '4:5',
      width: 1080,
      height: 1350,
      format: 'f_auto',
      quality: 'q_auto:good'
    }
  },
  {
    id: 'story-reels',
    name: 'Story / Reel / TikTok (9:16)',
    category: 'Social Media',
    icon: 'Smartphone',
    description: 'Vertical 9:16 with AI generative fill background extension',
    options: {
      crop: 'pad',
      genFill: true,
      aspectRatio: '9:16',
      width: 1080,
      height: 1920,
      format: 'f_auto',
      quality: 'q_auto'
    }
  },
  {
    id: 'youtube-thumb',
    name: 'YouTube Thumbnail (16:9)',
    category: 'Social Media',
    icon: 'Youtube',
    description: 'Cinematic 16:9 with AI clarity enhancement & face auto-centering',
    options: {
      crop: 'fill',
      gravity: 'auto',
      aspectRatio: '16:9',
      width: 1280,
      height: 720,
      enhance: true,
      improve: true,
      format: 'f_auto',
      quality: 'q_auto:best'
    }
  },
  {
    id: 'ecommerce-clean',
    name: 'E-Commerce White Studio',
    category: 'E-Commerce',
    icon: 'ShoppingBag',
    description: 'Automatic AI background removal with crisp drop-shadow',
    options: {
      backgroundRemoval: true,
      crop: 'fit',
      width: 1000,
      height: 1000,
      format: 'f_auto',
      quality: 'q_auto'
    }
  },
  {
    id: 'neon-cyberpunk',
    name: 'Neon Cyberpunk Backdrop',
    category: 'Generative AI',
    icon: 'Sparkles',
    description: 'AI replaces existing background with a futuristic neon skyline',
    options: {
      genBgReplace: true,
      genBgPrompt: 'futuristic cyberpunk neon city skyline at night with rain reflections bokeh',
      crop: 'fill',
      gravity: 'auto',
      format: 'f_auto',
      quality: 'q_auto'
    }
  },
  {
    id: 'vintage-film',
    name: 'Vintage Film Aesthetic',
    category: 'Aesthetic',
    icon: 'Camera',
    description: 'Warm nostalgic film grain vignette and tone',
    options: {
      filter: 'sepia',
      crop: 'fill',
      gravity: 'auto',
      format: 'f_auto',
      quality: 'q_auto'
    }
  }
];

/**
 * Generate Multi-language Code snippets for the user
 */
export function generateCodeSnippets(publicId, options = {}, resourceType = 'image') {
  const finalUrl = buildCloudinaryUrl(publicId, options, resourceType);

  // React SDK snippet (@cloudinary/react)
  const reactSnippet = `import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as qualityAuto } from '@cloudinary/url-gen/qualifiers/quality';

// 1. Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: '${CLOUD_NAME}'
  }
});

// 2. Instantiate and transform asset
const myMedia = cld.${resourceType}('${publicId}')
  .resize(fill().width(${options.width || 1080}).height(${options.height || 1080}).gravity(autoGravity()))
  .format(auto())
  .quality(qualityAuto());

// 3. Render component
export default function Showcase() {
  return <AdvancedImage cldImg={myMedia} alt="Cloudinary Creator Asset" className="rounded-xl shadow-2xl" />;
}`;

  // Node.js SDK snippet
  const nodeSnippet = `const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: '${CLOUD_NAME}',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Generate dynamic delivery URL
const transformedUrl = cloudinary.url('${publicId}', {
  resource_type: '${resourceType}',
  transformation: [
    ${options.crop ? `{ crop: '${options.crop}', gravity: '${options.gravity || 'auto'}' },` : ''}
    ${options.width ? `{ width: ${options.width}, height: ${options.height || options.width} },` : ''}
    ${options.backgroundRemoval ? `{ effect: 'background_removal' },` : ''}
    ${options.genBgReplace ? `{ effect: 'gen_background_replace:prompt_${options.genBgPrompt}' },` : ''}
    { fetch_format: 'auto', quality: 'auto' }
  ]
});

console.log('Optimized Asset URL:', transformedUrl);`;

  // Python SDK snippet
  const pythonSnippet = `import cloudinary
import cloudinary.uploader
from cloudinary import CloudinaryImage

cloudinary.config(
  cloud_name = "${CLOUD_NAME}",
  api_key = "349858131535254",
  api_secret = "<YOUR_API_SECRET>",
  secure = True
)

# Delivery with transformations
image_tag = CloudinaryImage("${publicId}").image(
    transformation=[
        {'crop': '${options.crop || 'fill'}', 'gravity': '${options.gravity || 'auto'}', 'width': ${options.width || 1080}},
        {'fetch_format': 'auto', 'quality': 'auto'}
    ]
)
print(image_tag)`;

  // cURL snippet
  const curlSnippet = `curl -X GET "${finalUrl}" --output transformed_asset.${resourceType === 'video' ? 'mp4' : 'jpg'}`;

  return {
    url: finalUrl,
    react: reactSnippet,
    node: nodeSnippet,
    python: pythonSnippet,
    curl: curlSnippet
  };
}
