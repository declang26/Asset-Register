const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'assets.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper - read assets
function readAssets() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

// Helper - write assets
function writeAssets(assets) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(assets, null, 2));
}

// GET all assets
app.get('/api/assets', (req, res) => {
  res.json(readAssets());
});

// POST new asset
app.post('/api/assets', (req, res) => {
  const assets = readAssets();
  const asset = req.body;
  if (!asset.id || !asset.name) {
    return res.status(400).json({ error: 'Asset ID and name are required' });
  }
  if (assets.find(a => a.id === asset.id)) {
    return res.status(409).json({ error: 'Asset ID already exists' });
  }
  assets.push(asset);
  writeAssets(assets);
  res.status(201).json(asset);
});

// PUT update asset
app.put('/api/assets/:id', (req, res) => {
  const assets = readAssets();
  const idx = assets.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Asset not found' });
  assets[idx] = { ...assets[idx], ...req.body, id: req.params.id };
  writeAssets(assets);
  res.json(assets[idx]);
});

// DELETE asset
app.delete('/api/assets/:id', (req, res) => {
  const assets = readAssets();
  const idx = assets.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Asset not found' });
  assets.splice(idx, 1);
  writeAssets(assets);
  res.json({ success: true });
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Asset Register running on port ${PORT}`);
});
