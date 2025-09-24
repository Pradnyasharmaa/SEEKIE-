SEEKIE – AI-Powered Job Portal

SEEKIE is a full-stack job portal that integrates AI-driven mock interviews and a personalized career coach, helping users enhance their skills, prepare for interviews, and explore job opportunities efficiently.

🚀 Key Features

Job Portal Functionality: Browse, search, and apply for jobs. User authentication using Clerk. Responsive and interactive UI with React.

AI Interviewer Module: Simulates real interview scenarios using AI. Provides instant feedback on answers. Tracks user performance and generates personalized question sets. AI Interviewer Repo

Career Coach Module: Offers resume tips, career guidance, and interview preparation strategies. Uses AI to provide personalized advice. Career Coach Repo

Interactive Features: Dynamic dashboards and progress tracking. Clean and modern UI with Tailwind CSS.

🛠 Tech Stack

Frontend: Next.js, React, Tailwind CSS

Backend / Database: Neon DB, Prisma, Drizzle ORM

Authentication: Clerk

AI Integration: Gemini AI for question generation and analysis

Task Scheduling / Workflows: Inngest

UI Components: Shadcn UI

💻 Getting Started
Installation

Clone the repository:
git clone https://github.com/Pradnyasharmaa/SEEKIE-.git

cd SEEKIE-

Install dependencies:
npm install

Create a .env file with the following keys:
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
GEMINI_API_KEY=

Run the development server:
npm run dev

Open http://localhost:3000
 to view the app.

📸  Demo Video
https://drive.google.com/drive/folders/1M91Ga1Dmp-tEDlgSQamAchuHt_YRQGik?usp=drive_link

⚠ Known Issues

Minor UI bugs may appear on small screens (responsive fixes in progress).

AI Interviewer requires a stable internet connection for question generation.

📝 Notes

This project was developed as a full-stack MVP for demonstrating modern web development and AI integration skills.

The project is modular; AI Interviewer and Career Coach are maintained in separate repositories but integrate seamlessly with SEEKIE.
