# School Platform Setup Instructions

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the `env.example` file to `.env.local`:

```bash
cp env.example .env.local
```

### 3. Configure Cloudinary

1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Create a new account or sign in
3. Copy your Cloud Name, API Key, and API Secret
4. Update `.env.local` with your Cloudinary credentials:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

### 4. Database Setup

The Railway database is already configured in the environment file. If you need to set up a new database:

1. Create a MySQL database
2. Run the SQL commands from `database.sql`
3. Update the database credentials in `.env.local`

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 🔧 What's Fixed

### ✅ Issues Resolved:

1. **API Route Duplication** - Consolidated to use the better version
2. **Cloudinary Integration** - Images now upload to Cloudinary instead of local storage
3. **Environment Configuration** - Proper Railway database setup
4. **Image Security** - Added file type and size validation
5. **Type Safety** - Fixed contact field handling
6. **Error Handling** - Improved error messages and logging

### 🆕 New Features:

- **Cloudinary Image Storage** - Better image management and CDN delivery
- **Enhanced Validation** - Better form validation with detailed error messages
- **Security Improvements** - File type and size restrictions
- **Better Error Handling** - More descriptive error messages

## 📁 Project Structure

```
src/
├── app/
│   ├── api/schools/route.ts    # API endpoints
│   ├── addSchool/page.tsx      # Add school form
│   ├── showSchools/page.tsx    # Display schools
│   └── layout.tsx              # Root layout
├── components/
│   └── Navigation.tsx          # Navigation component
└── lib/
    ├── db.ts                   # Database connection
    └── cloudinary.ts           # Cloudinary utilities
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔒 Security Features

- File type validation (JPEG, PNG, WebP only)
- File size limits (5MB maximum)
- SQL injection protection with parameterized queries
- Environment variable protection

## 📱 Features

- Responsive design
- Image upload with preview
- Form validation
- Database integration
- Cloudinary image storage
- Modern UI with Tailwind CSS
