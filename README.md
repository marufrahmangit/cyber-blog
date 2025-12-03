# 🛡️ CyberOp Notes

A modern, full-stack cybersecurity and system operations blog platform featuring interactive 3D visuals, rich text editing, and a comprehensive admin dashboard. Built with Next.js, Node.js, Express, MySQL, and Three.js.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![MySQL](https://img.shields.io/badge/mysql-%3E%3D8.0.0-orange.svg)

## ✨ Features

- 🎨 **Interactive 3D Hero Section** - Engaging particle animations powered by Three.js
- 📝 **Rich Text Editor** - TipTap editor with code highlighting and markdown support
- 🔐 **Secure Admin Dashboard** - JWT-based authentication with protected routes
- 🏷️ **Tag System** - Organize writeups with custom tags
- 🔍 **Search Functionality** - Full-text search across writeups
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS
- ⚡ **Performance Optimized** - Lazy loading, code splitting, and optimized assets
- 🚀 **Draft/Published Workflow** - Control content visibility
- 🎯 **SEO Friendly** - Meta tags and semantic HTML

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (React 18)
- **Styling:** Tailwind CSS
- **3D Graphics:** Three.js
- **Editor:** TipTap
- **Icons:** Lucide React
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MySQL 8.0+
- **Authentication:** JWT (jsonwebtoken)
- **Security:** Helmet, CORS, bcryptjs
- **Rate Limiting:** express-rate-limit

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) - Comes with Node.js
- **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/)
- **Git** - [Download](https://git-scm.com/)

### Verify Installation

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be v9.0.0 or higher
mysql --version # Should be v8.0 or higher
```

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cyber-blog.git
cd cyber-blog
```

### 2. Backend Setup

#### 2.1 Install Dependencies

```bash
cd backend
npm install
```

#### 2.2 Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=cyber_blog
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

#### 2.3 Setup MySQL Database

**Option 1: Using MySQL Command Line**

```bash
# Login to MySQL
mysql -u root -p

# Create database and user
CREATE DATABASE cyber_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'cyber_admin'@'localhost' IDENTIFIED BY 'YourSecurePassword123!';
GRANT ALL PRIVILEGES ON cyber_blog.* TO 'cyber_admin'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

**Option 2: Using phpMyAdmin**

1. Open phpMyAdmin in your browser
2. Click "New" to create a database
3. Database name: `cyber_blog`
4. Collation: `utf8mb4_unicode_ci`
5. Click "Create"

#### 2.4 Run Database Migrations

```bash
# From the backend directory
mysql -u cyber_admin -p cyber_blog < migrations/001_initial_schema.sql
```

#### 2.5 Create Admin User

Generate a password hash:

```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('admin123', 10, (err, hash) => console.log(hash));"
```

Copy the generated hash and insert the admin user:

```bash
mysql -u cyber_admin -p cyber_blog
```

```sql
INSERT INTO users (username, password_hash, role) 
VALUES ('admin', 'YOUR_GENERATED_HASH_HERE', 'admin');
EXIT;
```

**Or** simply use the default from migration (username: `admin`, password: `admin123`)

### 3. Frontend Setup

#### 3.1 Install Dependencies

```bash
cd ../frontend
npm install
```

#### 3.2 Configure Environment Variables

Create a `.env.local` file in the `frontend` directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Running the Application

#### 4.1 Start Backend Server

Open a terminal and run:

```bash
cd backend
npm run dev
```

You should see:
```
✓ Database connected successfully
✓ Server running on port 5000
✓ Environment: development
```

#### 4.2 Start Frontend Development Server

Open another terminal and run:

```bash
cd frontend
npm run dev
```

You should see:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
- Ready in 2.5s
```

### 5. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Admin Login:** http://localhost:3000/admin/login
  - Username: `admin`
  - Password: `admin123` (or your custom password)

## 📁 Project Structure

```
cyber-blog/
├── backend/                    # Backend API
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Auth & error handling
│   │   ├── models/            # Database models
│   │   ├── routes/            # API routes
│   │   └── server.js          # Entry point
│   ├── migrations/            # Database migrations
│   ├── package.json
│   └── .env.example
│
├── frontend/                   # Next.js frontend
│   ├── app/                   # App router pages
│   │   ├── admin/            # Admin dashboard
│   │   ├── writeups/         # Writeups pages
│   │   ├── about/            # About page
│   │   └── page.js           # Homepage
│   ├── components/            # React components
│   │   ├── Hero3D.js         # Three.js hero
│   │   ├── Navbar.js         # Navigation
│   │   ├── WriteupCard.js    # Writeup preview
│   │   └── Editor.js         # TipTap editor
│   ├── lib/                   # Utilities
│   │   └── api.js            # API client
│   ├── public/               # Static assets
│   ├── package.json
│   └── .env.local.example
│
└── README.md
```

## 🎯 Usage Guide

### Creating Your First Writeup

1. **Login to Admin Dashboard**
   - Navigate to http://localhost:3000/admin/login
   - Enter admin credentials

2. **Create New Writeup**
   - Click "New Writeup" button
   - Fill in the title
   - Add tags (comma-separated)
   - Write content using the rich text editor
   - Choose status (Draft or Published)
   - Click "Create Writeup"

3. **View Your Writeup**
   - Navigate to http://localhost:3000/writeups
   - Click on your writeup to view

### Managing Writeups

- **Edit:** Click the edit icon in the admin dashboard
- **Delete:** Click the delete icon (confirmation required)
- **Search:** Use the search bar on the writeups page
- **Filter by Tags:** Click on tags to filter writeups

## 🏗️ Building for Production

### Backend

```bash
cd backend

# Update .env for production
NODE_ENV=production
JWT_SECRET=new_secure_production_secret

# Start production server
npm start
```

### Frontend

```bash
cd frontend

# Build for production
npm run build

# Start production server
npm start
```

## 🚢 Deployment

### Deploy to cPanel

#### Backend Deployment

1. **Setup Node.js Application in cPanel**
   - Go to "Setup Node.js App"
   - Node.js version: 18+
   - Application root: `/home/username/cyber-blog/backend`
   - Application startup file: `src/server.js`

2. **Upload Files via FTP/SSH**
   ```bash
   # Upload all backend files except node_modules
   rsync -avz --exclude 'node_modules' backend/ user@host:/home/username/cyber-blog/backend/
   ```

3. **Install Dependencies via SSH**
   ```bash
   ssh user@host
   cd cyber-blog/backend
   npm install --production
   ```

4. **Setup Database**
   - Create MySQL database in cPanel
   - Import `migrations/001_initial_schema.sql`
   - Update `.env` with production database credentials

#### Frontend Deployment

**Option 1: Static Export to cPanel**
```bash
cd frontend
npm run build
# Upload .next/ and public/ folders to public_html
```

**Option 2: Deploy to Vercel (Recommended)**
```bash
cd frontend
npm install -g vercel
vercel deploy --prod
```

Update backend CORS to allow Vercel domain.

### Deploy to VPS (DigitalOcean, AWS, etc.)

1. **Setup Ubuntu Server**
   ```bash
   sudo apt update
   sudo apt install nodejs npm mysql-server nginx
   ```

2. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/cyber-blog.git
   cd cyber-blog
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install --production
   # Configure .env
   npm start
   ```

4. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run build
   npm start
   ```

5. **Configure Nginx as Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
       }

       location /api {
           proxy_pass http://localhost:5000;
       }
   }
   ```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_USER` | MySQL username | - |
| `DB_PASSWORD` | MySQL password | - |
| `DB_NAME` | Database name | `cyber_blog` |
| `JWT_SECRET` | JWT signing key | - |
| `JWT_EXPIRE` | Token expiration | `7d` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

#### Frontend (.env.local)

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000/api` |

## 🧪 Testing

```bash
# Backend tests (if implemented)
cd backend
npm test

# Frontend tests (if implemented)
cd frontend
npm test
```

## 🐛 Troubleshooting

### Database Connection Failed

**Problem:** `Error: connect ECONNREFUSED`

**Solution:**
```bash
# Check if MySQL is running
sudo systemctl status mysql

# Start MySQL if stopped
sudo systemctl start mysql

# Verify credentials in .env
```

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use a different port in .env
PORT=5001
```

### Three.js Not Rendering

**Problem:** 3D graphics not showing on homepage

**Solution:**
```bash
cd frontend
npm install three@0.160.0
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Admin Login Not Working

**Problem:** Invalid credentials error

**Solution:**
1. Verify admin user exists in database
2. Check password hash is correct
3. Ensure JWT_SECRET is set in backend .env
4. Clear browser cookies and try again

### CORS Errors

**Problem:** `Access-Control-Allow-Origin` errors

**Solution:**
Update `backend/src/server.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Three.js](https://threejs.org/) - 3D graphics library
- [TipTap](https://tiptap.dev/) - Rich text editor
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Express](https://expressjs.com/) - Backend framework

## 📧 Contact

Maruf Rahman - marufrahman.work@gmail.com

Project Link: [https://github.com/yourusername/cyber-blog](https://github.com/marufrahmangit/cyber-blog)

---

**Made with ❤️ for the cybersecurity community**