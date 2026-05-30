# 🟢 ThinkBoard

ThinkBoard is a sleek, modern, and highly responsive **MERN stack** note-taking application designed with a premium, glassmorphic dark-mode interface and custom **Forest theme**. ThinkBoard empowers users to seamlessly brainstorm, organize, and edit their notes, protected by a state-of-the-art serverless Redis rate-limiting system.

🚀 **Live Demo:** [https://mern-thinkboard-ccl8.onrender.com/](https://mern-thinkboard-ccl8.onrender.com/)

---

## ✨ Features

- **🎨 Exquisite Design Aesthetics:** Built with a dark mode Forest palette using [daisyUI](https://daisyui.com/) and [Tailwind CSS](https://tailwindcss.com/). Features a stunning emerald radial background gradient (`[background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]`).
- **⚡ Single-Page App UX:** Supercharged with [React Router v7](https://reactrouter.com/) for fluid, instant navigation and page transitions without reload.
- **📝 Complete CRUD Lifecycle:** Create, retrieve, update, and delete notes dynamically. Includes an automated note detail page with live save/edit fields.
- **🛡️ Intelligent Rate Limiting:** Backed by **Upstash Redis** and `@upstash/ratelimit` to protect server API routes against denial-of-service/spam (configured to a sliding window of **10 requests per 20 seconds**).
- **⚠️ Rate Limit UI Fallbacks:** Features custom frontend middleware components (`RateLimitedUI.jsx`) that capture `429 Too Many Requests` API status codes to render dynamic alerts and warnings instead of crashing.
- **📬 Micro-Interactions:** Fully integrated with `react-hot-toast` for rich, non-blocking visual feedback on all operations (success, error, and rate-limiting alerts).
- **📦 Production-Ready Build Pipeline:** Configured with a root `package.json` that performs workspace-wide dependency installation and static asset bundling automatically.

---

## 🛠️ Tech Stack

### Frontend
* **Core:** React 19, Vite 8, Axios
* **Styling:** Tailwind CSS v3, daisyUI, Lucide React (Icons)
* **Routing:** React Router v7
* **Notifications:** React Hot Toast

### Backend & Database
* **Server Framework:** Node.js, Express.js
* **Database Object Modeling:** MongoDB, Mongoose
* **Serverless Cache/Rate Limiter:** Upstash Redis (REST Redis client)
* **Environment Configuration:** Dotenv

---

## 📂 Project Structure

```text
Think-Board/
├── backend/                   # Node.js + Express Backend
│   ├── src/
│   │   ├── config/            # DB & Upstash Rate Limiter setup
│   │   │   ├── db.js
│   │   │   └── upstash.js
│   │   ├── controllers/       # Notes business logic handler
│   │   │   └── notesController.js
│   │   ├── middleware/        # Upstash Redis rate-limiter middleware
│   │   │   └── rateLimiter.js
│   │   ├── models/            # Mongoose Schemas (Notes Schema)
│   │   │   └── Notes.js
│   │   ├── routes/            # Express Router endpoints
│   │   │   └── notesRoutes.js
│   │   └── server.js          # Main express app entrypoint
│   ├── .env                   # Backend environment configurations
│   └── package.json
│
├── frontend/                  # React + Vite + Tailwind Frontend
│   ├── src/
│   │   ├── components/        # Navbar, NoteCard, RateLimitedUI, NotesNotFound
│   │   ├── lib/               # Axios instance (configured for dynamic dev/prod baseUrl)
│   │   ├── pages/             # HomePage, CreatePage, NoteDetailPage
│   │   ├── App.jsx            # Layout, Router structure, Global background
│   │   └── main.jsx
│   ├── tailwind.config.js     # Tailwind setup with DaisyUI themes
│   └── package.json
│
├── package.json               # Root build/start scripts orchestration
└── README.md                  # Comprehensive project documentation
```

---

## ⚙️ Environment Configuration

To run the application, configure your credentials inside `backend/.env`. Create the file `backend/.env` with the following variables:

```env
PORT=5001
MONGO_URI=your_mongodb_atlas_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_endpoint_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_secret_token
NODE_ENV=development
```

> [!NOTE]
> - `MONGO_URI` is standard for connecting MongoDB Atlas clusters or a local mongo instance.
> - `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` can be generated instantly for free on the [Upstash Console](https://console.upstash.com/).
> - Set `NODE_ENV=production` for building and deploying to platforms like Render, where Express serves the frontend static client bundle.

---

## 🚀 Getting Started & Local Installation

Follow these steps to run ThinkBoard locally in your development environment:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+ recommended) and `npm` installed.

### 1. Clone the Repository
```bash
git clone https://github.com/AdityaPatil2006/MERN-ThinkBoard.git
cd MERN-ThinkBoard
```

### 2. Setup the Backend
Open a new terminal window:
```bash
cd backend
# Create your .env file and fill in your DB/Upstash configurations
cp .env.example .env # Or create a new .env file directly
npm install
npm run dev
```
The backend server will spin up and connect to MongoDB, listening on `http://localhost:5001`.

### 3. Setup the Frontend
Open another terminal window:
```bash
cd frontend
npm install
npm run dev
```
The frontend Vite server will start, typically available at `http://localhost:5173`. Open this URL in your web browser.

---

## 🔌 API Documentation

All routes are prefixed with `/api/notes`.

| HTTP Method | Route | Description |
| :--- | :--- | :--- |
| **GET** | `/api/notes` | Retrieves all notes, sorted by newest first (`createdAt: -1`). |
| **GET** | `/api/notes/:id` | Retrieves a single note details matching the path `:id`. |
| **POST** | `/api/notes` | Creates a new note. Expects JSON body with `{ "title": "...", "content": "..." }`. |
| **PUT** | `/api/notes/:id` | Updates an existing note. Expects JSON body with revised `{ "title": "...", "content": "..." }`. |
| **DELETE** | `/api/notes/:id` | Deletes the specified note by database `:id`. |

---

## 🛡️ Smart Rate Limiter Details

ThinkBoard is reinforced with modern Upstash Redis-driven rate limiting.

- **Limit Settings:** 10 requests every 20 seconds, sliding window.
- **API Response:** If exceeded, backend returns HTTP `429 Too Many Requests` with:
  ```json
  { "message": "Too many requests, please try again later!" }
  ```
- **Frontend Graceful Degradation:** When Axios catches a `429` status code, the React state is updated to render a dedicated `RateLimitedUI` alert bar, warning users to wait a few seconds, preventing system overhead while providing a polished, premium user experience.

---

## ☁️ Deployment

ThinkBoard is pre-configured for automated MERN deployments (such as **Render**, **Railway**, or **Heroku**). 

The root `package.json` contains specialized build scripts that compile both frontend and backend automatically:

```json
"scripts": {
  "build": "npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend",
  "start": "npm run start --prefix backend"
}
```

### Deploying to Render:
1. Create a new **Web Service** on Render.
2. Link it to your GitHub Repository: `https://github.com/AdityaPatil2006/MERN-ThinkBoard`
3. Configure the following build settings:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm run start`
4. Add your Environment Variables in the **Environment** tab:
   - `MONGO_URI`
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   - `NODE_ENV=production`
5. Render will execute the root build script, install all nested node modules, bundle the React frontend, and boot up the Express server. The backend automatically serves the React static bundle from `frontend/dist` on request!

---

## 📄 License

This project is licensed under the [ISC License](LICENSE) - see the root `package.json` for details.

Developed with ❤️ by **[Aditya Patil](https://github.com/AdityaPatil2006)**.
