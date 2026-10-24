const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Load environment variables from parent directory or current directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

// Configure Cloudinary SDK
const cloud_name = process.env.CLOUDINARY_CLOUD_NAME || 'egpyibpx';
const api_key = process.env.CLOUDINARY_API_KEY || '349858131535254';
const api_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
  secure: true
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configure multer for file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB max
});

// 1. Health & Connection Check
app.get('/api/health', async (req, res) => {
  try {
    const ping = await cloudinary.api.ping();
    res.json({
      status: 'online',
      cloudinary: ping.status,
      cloudName: cloud_name,
      apiKey: api_key.slice(0, 4) + '...' + api_key.slice(-4),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to ping Cloudinary'
    });
  }
});

// 2. Cloudinary Account Usage & Quotas
app.get('/api/usage', async (req, res) => {
  try {
    const usage = await cloudinary.api.usage();
    res.json({
      success: true,
      data: usage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 3. List Assets (Images and Videos)
app.get('/api/assets', async (req, res) => {
  try {
    const resource_type = req.query.resource_type || 'image';
    const max_results = parseInt(req.query.max_results, 10) || 30;
    const next_cursor = req.query.next_cursor || undefined;

    let resources = [];
    let nextCursor = null;

    if (resource_type === 'all') {
      const [images, videos] = await Promise.all([
        cloudinary.api.resources({ resource_type: 'image', max_results: 20 }),
        cloudinary.api.resources({ resource_type: 'video', max_results: 10 })
      ]);
      resources = [...images.resources, ...videos.resources].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else {
      const result = await cloudinary.api.resources({
        resource_type,
        max_results,
        next_cursor
      });
      resources = result.resources;
      nextCursor = result.next_cursor;
    }

    res.json({
      success: true,
      resources,
      next_cursor: nextCursor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 4. File Upload (Buffer / Multipart Stream)
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const resourceType = req.body.resource_type || 'auto';
    const folder = req.body.folder || 'creator-studio';
    const tags = req.body.tags ? req.body.tags.split(',').map(t => t.trim()) : ['creator-studio'];

    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          tags,
          resource_type: resourceType,
          use_filename: true,
          unique_filename: true
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    const result = await uploadPromise;
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Upload failed'
    });
  }
});

// 5. Upload via Remote URL
app.post('/api/upload-url', async (req, res) => {
  try {
    const { url, resource_type = 'auto', folder = 'creator-studio' } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const result = await cloudinary.uploader.upload(url, {
      folder,
      resource_type,
      tags: ['creator-studio', 'url-import']
    });

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Remote URL upload failed'
    });
  }
});

// 6. Delete Asset
app.delete('/api/assets/:public_id', async (req, res) => {
  try {
    const { public_id } = req.params;
    const resource_type = req.query.resource_type || 'image';

    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type
    });

    res.json({
      success: true,
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 7. Signed Upload Parameters for Client-Side Direct Upload
app.get('/api/signature', (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = req.query.folder || 'creator-studio';

  const paramsToSign = {
    folder,
    timestamp
  };

  const signature = cloudinary.utils.api_sign_request(paramsToSign, api_secret);

  res.json({
    signature,
    timestamp,
    apiKey: api_key,
    cloudName: cloud_name,
    folder
  });
});

// Serve frontend build if available in production
const clientBuildPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(clientBuildPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send(`
        <html>
          <body style="font-family: sans-serif; background: #0f172a; color: white; padding: 2rem;">
            <h2>Cloudinary Creator Studio API Server is Running!</h2>
            <p>Cloud Name: <strong>${cloud_name}</strong></p>
            <p>Health endpoint: <a style="color: #38bdf8;" href="/api/health">/api/health</a></p>
            <p>Assets endpoint: <a style="color: #38bdf8;" href="/api/assets">/api/assets</a></p>
            <p>To run the Vite frontend development server, run: <code>cd client && npm run dev</code></p>
          </body>
        </html>
      `);
    }
  });
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Cloudinary Creator Studio server running on http://localhost:${PORT}`);
    console.log(`☁️ Connected to Cloudinary Cloud: ${cloud_name}`);
  });
}

module.exports = app;
