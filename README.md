# AI Learning Hub

An intelligent, AI-powered e-learning platform designed to make education more accessible, engaging, and personalized using modern web technologies. Developed by Team **Phoenix** (Bangladesh).

---

## 🚀 Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Node.js, Express.js, REST API
- **Database:** MongoDB, Mongoose
- **AI Integration:** OpenAI / Google Gemini API
- **Authentication:** JWT (JSON Web Tokens)

---

## ✨ Key Features

- **Secure User Authentication:** Role-based secure login and registration dashboards for students and instructors.
- **AI Learning Assistant (Chatbot):** Real-time interactive explanations and answers for complex topics during courses.
- **Course Management:** Easy course creation, lesson updates, and curriculum management for instructors.
- **Progress Tracking Dashboard:** Graphical interfaces to monitor completed lessons, quiz achievements, and overall learning curves.

---

## 📂 Project Structure

```text
AI-Learning-Hub/
├── .github/                   # GitHub-specific files
│   └── workflows/             # CI/CD deployment pipelines
│
├── frontend/                  # Next.js (App Router), React & Tailwind CSS
│   ├── public/                # Static assets (images, logos, icons)
│   ├── src/
│   │   ├── app/               # Next.js App Router (pages, layouts, routing)
│   │   ├── components/        # Reusable UI components (Sidebar, VideoPlayer, Chatbot)
│   │   ├── hooks/             # Custom React hooks (useAuth, useProgress)
│   │   ├── lib/               # Utility functions and API helper setups
│   │   ├── context/           # React Context / Global state management
│   │   └── styles/            # Global CSS and Tailwind base styles
│   ├── .env.example           # Frontend environment variables template
│   ├── package.json           # Frontend dependencies
│   └── tailwind.config.js     # Tailwind CSS configuration
│
├── backend/                   # Node.js, Express.js & MongoDB API
│   ├── src/
│   │   ├── config/            # Database and AI connection setups
│   │   ├── controllers/       # Core business logic (authController, courseController)
│   │   ├── middlewares/       # Request interceptors (JWT Auth verification, Error handling)
│   │   ├── models/            # Mongoose Schemas (User, Course, Lesson)
│   │   ├── routes/            # Express API endpoint definitions
│   │   ├── services/          # External API logic (AI assistant prompt handling)
│   │   └── server.js          # Main entry point for the backend server
│   ├── .env.example           # Backend environment variables template
│   └── package.json           # Backend dependencies
│
├── .gitignore                 # Files and directories ignored by Git (node_modules, .env)
├── README.md                  # Project documentation
└── LICENSE                    # Open-source license (MIT)
Write a Strong README.md: A professional repository requires a comprehensive README. Include the project title, a brief description, screenshots of the UI, the tech stack used (React, Node.js, MongoDB, Tailwind), and step-by-step instructions on how to install and run the project locally (e.g., npm install, npm run dev).

````

🛠️ Getting Started Locally
To run this project locally on your machine, follow these steps:

1. Clone the Repository
Bash
```
git clone [https://github.com/your-username/AI-Learning-Hub.git](https://github.com/your-username/AI-Learning-Hub.git)
cd AI-Learning-Hub
```
3. Setup Backend
Bash
```
cd backend
npm install
Create a .env file in the backend folder based on .env.example:
```
Code snippet
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
Run the server:

Bash
npm run dev
```
3. Setup Frontend
```
cd ../frontend
npm install
Create a .env.local file in the frontend folder:
```
Code snippet
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
