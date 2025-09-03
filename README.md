# School Platform

A comprehensive Next.js application for managing school information with image uploads and responsive design.

## Features

- **Add School Page**: Form to input school data with validation and image upload
- **Show Schools Page**: E-commerce style display of all schools
- **Responsive Design**: Works on both mobile and desktop
- **Image Management**: Upload and store school images
- **Form Validation**: Comprehensive validation using Zod and react-hook-form
- **MySQL Database**: Persistent storage of school data

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Database**: MySQL with mysql2
- **Image Upload**: File system storage

## Prerequisites

- Node.js 18+
- MySQL database
- npm or yarn

## Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd school-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=school_platform
   ```

4. **Set up MySQL database**

   - Create a MySQL database named `school_platform`
   - Run the SQL commands from `database.sql` file:

   ```sql
   CREATE DATABASE school_platform;
   USE school_platform;

   CREATE TABLE schools (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name TEXT NOT NULL,
     address TEXT NOT NULL,
     city TEXT NOT NULL,
     state TEXT NOT NULL,
     contact BIGINT NOT NULL,
     image TEXT NOT NULL,
     email_id TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
school-platform/
├── src/
│   ├── app/
│   │   ├── addSchool/          # Add school form page
│   │   ├── showSchools/        # Display schools page
│   │   ├── api/schools/        # API endpoints
│   │   ├── layout.tsx          # Root layout with navigation
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   └── Navigation.tsx      # Navigation component
│   └── lib/
│       └── db.ts               # Database configuration
├── public/
│   └── schoolImages/           # Uploaded school images
├── database.sql                 # Database schema
└── package.json
```

## API Endpoints

### GET /api/schools

Fetches all schools from the database

### POST /api/schools

Adds a new school with image upload

**Form Data:**

- `name`: School name (required)
- `address`: School address (required)
- `city`: City (required)
- `state`: State (required)
- `contact`: Contact number (required, 10 digits)
- `email_id`: Email address (required, valid format)
- `image`: School image file (required)

## Form Validation

- **School Name**: Minimum 2 characters
- **Address**: Minimum 5 characters
- **City**: Minimum 2 characters
- **State**: Minimum 2 characters
- **Contact**: Exactly 10 digits
- **Email**: Valid email format
- **Image**: Required file upload

## Responsive Design

- Mobile-first approach
- Grid layout that adapts to screen size
- Touch-friendly form inputs
- Optimized for all device sizes

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Other Platforms

- Netlify
- Railway
- DigitalOcean App Platform

## Database Setup for Production

1. Use a cloud MySQL service (PlanetScale, AWS RDS, etc.)
2. Update environment variables with production credentials
3. Ensure proper security and backup policies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, please open an issue in the GitHub repository.
