const API_BASE = '/api';

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (err) {
    return { status: 'offline', error: err.message };
  }
}

export async function getAccountUsage() {
  try {
    const res = await fetch(`${API_BASE}/usage`);
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function getAssets(resourceType = 'image', maxResults = 30, nextCursor = null) {
  try {
    let url = `${API_BASE}/assets?resource_type=${resourceType}&max_results=${maxResults}`;
    if (nextCursor) {
      url += `&next_cursor=${encodeURIComponent(nextCursor)}`;
    }
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message, resources: [] };
  }
}

export async function uploadAsset(file, options = {}) {
  const formData = new FormData();
  formData.append('file', file);
  if (options.folder) formData.append('folder', options.folder);
  if (options.tags) formData.append('tags', options.tags);
  if (options.resourceType) formData.append('resource_type', options.resourceType);

  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Upload failed' }));
    throw new Error(err.message || 'Upload failed');
  }

  return await res.json();
}

export async function uploadUrl(url, options = {}) {
  const res = await fetch(`${API_BASE}/upload-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url,
      resource_type: options.resourceType || 'auto',
      folder: options.folder || 'creator-studio'
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'URL upload failed' }));
    throw new Error(err.message || 'URL upload failed');
  }

  return await res.json();
}

export async function deleteAsset(publicId, resourceType = 'image') {
  const res = await fetch(`${API_BASE}/assets/${encodeURIComponent(publicId)}?resource_type=${resourceType}`, {
    method: 'DELETE'
  });
  return await res.json();
}
