# NextJS Social Media App

A modern social networking application built with Next.js, Prisma, and TypeScript — developed as a **DBMS group project** for college.

## Team Members
- **Abdul Wali**
- **Sumit**
- **Vanshika**

## Overview
A full-stack social media platform demonstrating database design, relationships, and CRUD operations. Features include user authentication, posts, comments, follows, and search functionality.

## Tech Stack
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Prisma** - Database ORM
- **PostgreSQL** - Relational database
- **Lucia Auth** - Authentication
- **Tailwind CSS** - Styling
- **React Query** - Data fetching

## Getting Started

### Prerequisites
- Node.js 16+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nextjs-social-media-app.git
   cd nextjs-social-media-app
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Setup environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="your_postgresql_connection_string"
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   NEXTAUTH_SECRET=your_secret_key
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema
The project uses Prisma for database management. Key entities include:
- Users
- Posts
- Comments
- Follows
- Likes

## Features
- User authentication & authorization
- Create and manage posts
- Comment on posts
- Follow/unfollow users
- Search functionality
- Real-time chat (Stream Chat integration)

## Deployment
Optimized for Vercel deployment. Ensure all environment variables are configured in the Vercel dashboard.

## License
MIT License
