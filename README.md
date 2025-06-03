# Trivia Quiz App

A full-stack quiz application built with React and Redux on the frontend and Node.js, Express, and MongoDB on the backend.

---

## 📁 Project Structure

```
trivia-quiz-app/
├── frontend/     # React + Redux client
├── backend/      # Node.js + Express API
```

---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or via a cloud provider like MongoDB Atlas)

---

## 🖥️ Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd trivia-quiz-app/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run start
   ```

4. The frontend will run at: [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd trivia-quiz-app/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following contents:

   ```ini
   MONGODB_URI=mongodb://localhost:27017/trivia
   PORT=5000
   ```

   > Update the `MONGODB_URI` if using a remote MongoDB instance.

4. Start the backend server:

   ```bash
   npm run dev
   ```

5. The backend will run at: [http://localhost:5000](http://localhost:5000)

---

## 🌱 Database Seeding

A seed script is included, you can populate the database by running:

```bash
node scripts/seed.js
```

> Ensure your `.env` file is properly configured before seeding.

---

## 🤖 Use of Generative AI

Parts of this project were assisted by generative AI tools to:

- Generate boilerplate code
- Improve seeding logic
- Create documentation
