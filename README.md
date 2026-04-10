# Disaster Relief Material Management System

A Node.js + Express + MongoDB Atlas backend with a static HTML/JS frontend, ready to deploy on **Vercel**.

---

## Project Structure

```
anti-disaster-system/
├── api/
│   └── index.js          ← Vercel serverless entry point
├── public/
│   ├── css/style.css
│   ├── js/api.js
│   ├── js/realtime.js
│   ├── index.html        ← Login page
│   ├── dashboard.html
│   ├── delivery.html
│   ├── history.html
│   ├── movement.html
│   ├── receipt.html
│   └── users.html
├── src/
│   ├── config/db.js
│   ├── middleware/auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Material.js
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── materials.js
│   │   └── transactions.js
│   └── utils/captcha.js
├── server.js             ← Local dev server only
├── vercel.json           ← Vercel routing config
├── package.json
├── .env.example
└── .gitignore
```

---

## ⚙️ Setup: MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) → your Cluster → **Connect**
2. Choose **Drivers** → copy the connection string
3. Replace `<db_password>` with your actual password
4. The full URI looks like:
   ```
   mongodb+srv://Sujal:YOUR_PASSWORD@cluster0.3qrnyva.mongodb.net/disaster_system?retryWrites=true&w=majority&appName=Cluster0
   ```
5. In Atlas → **Network Access** → Add IP **`0.0.0.0/0`** (allow all — required for Vercel)

---

## 🚀 Deploy to Vercel

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2 — Import on Vercel
1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Framework Preset: **Other**
4. Root Directory: leave as-is (`.`)
5. Click **Deploy** (it will fail first time — that's ok, add env vars next)

### Step 3 — Add Environment Variables
In your Vercel project → **Settings** → **Environment Variables**, add:

| Name | Value |
|------|-------|
| `MONGO_URI` | `mongodb+srv://Sujal:YOUR_PASSWORD@cluster0.3qrnyva.mongodb.net/disaster_system?retryWrites=true&w=majority&appName=Cluster0` |
| `JWT_SECRET` | `some_long_random_secret_string` |

### Step 4 — Redeploy
Go to **Deployments** tab → click the three dots on the latest deployment → **Redeploy**.

Your app will be live at `https://your-project.vercel.app`

---

## 🖥️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env
# Edit .env and fill in MONGO_URI and JWT_SECRET

# 3. Run locally
npm start
# → http://localhost:8000
```

---

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/auth/captcha` | Public | Get math captcha |
| POST | `/api/auth/register` | Public | Register user |
| POST | `/api/auth/login` | Public | Login |
| GET | `/api/auth/users` | Admin | List all users |
| PUT | `/api/auth/users/:id` | Admin | Update user role/status |
| GET | `/api/materials` | Private | List materials |
| POST | `/api/materials` | Private | Create material |
| PUT | `/api/materials/:id` | Private | Update material |
| DELETE | `/api/materials/:id` | Private | Delete material |
| GET | `/api/transactions` | Private | List transactions |
| POST | `/api/transactions/RECEIPT` | Private | Log incoming stock |
| POST | `/api/transactions/MOVEMENT` | Private | Log stock movement |
| POST | `/api/transactions/DELIVERY` | Private | Log delivery |

---

## ⚠️ Notes

- **Socket.IO is disabled on Vercel** — Vercel is serverless and doesn't support persistent WebSocket connections. The frontend gracefully handles this (no real-time updates, but all CRUD works fine).
- To enable real-time on Vercel, consider upgrading to **Vercel's Socket.IO adapter** or using **Ably / Pusher** as an external WebSocket service.
- The `server.js` file is only for local development. Vercel uses `api/index.js`.
