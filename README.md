🌟 SkillAura

SkillAura is a smart learning and collaboration platform built to help individuals grow their skills, track learning progress, and engage with a supportive community. With personalized learning plans, badge rewards, and a modern UI, SkillAura empowers users to learn, connect, and succeed.

---

🚀 Features

- 🧠 Create custom learning plans and tasks  
- ✅ Track progress with checkboxes and visual progress bars  
- 🏅 Earn badges upon 100% completion of plans  
- 🔍 Explore available learning plans by others  
- 🔄 Edit and delete plans and tasks  
- 📊 Progress analytics with pie charts and bar graphs  
- 🗂 Filter tasks by completion and deadline  
- 📅 See upcoming and overdue tasks  
- 🔔 Notifications and reminders for deadlines  
- 🌐 Public profile pages with follower/following system  
- 💬 Comment system with replies, likes, and real-time updates  
- 🔐 JWT-based authentication and role-based access (Admin, User)

---

🛠️ Tech Stack

- React.js + Tailwind CSS (Frontend)  
- Node.js or Flask (Backend API)  
- MongoDB (Database)  
- Firebase (for image uploads and authentication)  
- Chart.js / Recharts (Analytics Visualization)  
- JWT (Secure Auth System)

---

📁 Project Structure

- /client → React frontend  
- /server → Backend API (Flask or Node.js)  
- /models → MongoDB models (User, Plan, Task, Notification, etc.)  
- /uploads → Profile pictures and badge images (via Firebase)  
- README.txt → This file

---

📦 How to Run Locally

1. Clone the repository:  
   git clone https://github.com/IT22089304/Skillaura.git  
   cd SkillAura

2. Install frontend dependencies:  
   cd client  
   npm install

3. Install backend dependencies:  
   cd ../server  
   pip install -r requirements.txt  (or npm install if Node)

4. Add environment variables (.env for backend, Firebase config for frontend)

5. Start development servers:  
   npm run dev (React frontend)  
   python app.py OR npm run server (Backend)

---

🔧 Firebase Configuration (For Uploads & Auth)

- Enable Firebase Authentication (Email/Password)  
- Enable Firebase Storage (to store profile/badge images)  
- Add your config to `firebase.js` in the frontend


---

📸 Coming Soon

- Portfolio showcase area in profiles  
- Skill-based plan recommendations  
- Certificate generation on plan completion  
- Admin moderation dashboard  

---

💡 Tip: SkillAura is designed to be modular. You can extend it into a full LMS (Learning Management System), mentorship platform, or even gamified education app!
