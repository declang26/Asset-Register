# IT Asset Register — PA Media

A live asset register with persistent storage. Built with Node.js + Express.

## Deploy to Railway

1. Push this folder to a GitHub repository
2. Go to [railway.app](https://railway.app) and sign in with GitHub
3. Click **New Project → Deploy from GitHub repo**
4. Select your repository
5. Railway auto-detects Node.js and deploys automatically
6. Click **Generate Domain** to get your public URL

## Local development

```bash
npm install
npm start
```

Then open http://localhost:3000

## How it works

- `server.js` — Express API server
- `public/index.html` — The portal frontend
- `data/assets.json` — Asset data (persists between deploys on Railway volume)

## API endpoints

- `GET /api/assets` — Get all assets
- `POST /api/assets` — Add new asset
- `PUT /api/assets/:id` — Update asset
- `DELETE /api/assets/:id` — Delete asset
