# Portfolio Canvas - Full Stack Developer Portfolio

## Project Structure

- `frontend/` Static HTML, CSS, JS, canvas animations
- `frontend/index.html` Main UI and sections
- `frontend/css/styles.css` Styles, animations, responsive layout
- `frontend/js/app.js` Interactions, sliders, canvas particles, API calls
- `backend/` Express modules and Mongo-ready setup
- `backend/routes/` API routes
- `backend/controllers/` Controllers for contact and reviews
- `backend/config/db.js` MongoDB connection helper
- `server.js` Express app entry
- `.env.example` Environment config template

## Local Run

1. Install Node.js 18+.
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm run dev
```

4. Open `http://localhost:5000` in your browser.

## Build

This is a static frontend with a Node backend, so no build step is required.
If you want to separate frontend hosting, copy the `frontend/` folder as a static site.

## Deployment Guide

### Frontend (Vercel or Netlify)

1. Create a new Vercel project and set the root directory to `frontend/`.
2. Build command: not required.
3. Output directory: `frontend/`.
4. If your backend is hosted separately, update `window.APP_CONFIG.apiBase` in `frontend/index.html` with your backend URL.

### Backend (Render or Railway)

1. Create a new Node service and connect your repo.
2. Set the start command to:

```bash
npm start
```

3. Add environment variables:
- `PORT` (platform sets it)
- `MONGODB_URI` (optional for database connection)
- `CORS_ORIGIN` (set to your frontend domain)

### Full Stack Together

If deploying to a single Node host, the Express server already serves `frontend/`.
Deploy the repo and visit the host URL to see the site.

## API Routes

- `POST /api/contact`
- `GET /api/reviews`
- `POST /api/reviews`

## Customize

Update portfolio content in `frontend/index.html` and styling in `frontend/css/styles.css`.
