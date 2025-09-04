# Quick Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=school_platform
```

## Database Setup

1. Create MySQL database:

```sql
CREATE DATABASE school_platform;
USE school_platform;
```

2. Run the SQL commands from `database.sql` file

## Run the Application

```bash
npm install
npm run dev
```

Visit: http://localhost:3000
