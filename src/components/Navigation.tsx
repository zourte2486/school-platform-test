'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleNavigation = (path: string) => {
    if (pathname !== path) {
      setIsNavigating(true);
      router.push(path);
      // Reset navigation state after a short delay
      setTimeout(() => setIsNavigating(false), 1000);
    }
  };

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
            <button
              onClick={() => handleNavigation('/addSchool')}
              disabled={isNavigating}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive('/addSchool')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              } ${isNavigating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isNavigating && pathname !== '/addSchool' ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  Loading...
                </div>
              ) : (
                'Add School'
              )}
            </button>
            <button
              onClick={() => handleNavigation('/showSchools')}
              disabled={isNavigating}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive('/showSchools')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              } ${isNavigating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isNavigating && pathname !== '/showSchools' ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  Loading...
                </div>
              ) : (
                'View Schools'
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
