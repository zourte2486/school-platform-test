'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="text-2xl mr-2">🏫</div>
              <span className="text-xl font-bold text-gray-900">School Platform</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link
              href="/addSchool"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/addSchool')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Add School
            </Link>
            <Link
              href="/showSchools"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/showSchools')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              View Schools
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
