'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface School {
  id: number;
  name: string;
  adress: string; // Note: matches database column name
  city: string;
  state: string;
  contact: number;
  image: string;
  email_id: string;
  created_at: string;
}

export default function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/schools');
      const result = await response.json();
      
      if (result.success) {
        setSchools(result.data);
      } else {
        setError('Failed to fetch schools');
      }
    } catch {
      setError('Error loading schools');
    } finally {
      setLoading(false);
    }
  };

  const deleteSchool = async (id: number) => {
    if (!confirm('Are you sure you want to delete this school? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(id);
      const response = await fetch(`/api/schools?id=${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      
      if (result.success) {
        setSchools(schools.filter(school => school.id !== id));
      } else {
        alert('Failed to delete school: ' + result.error);
      }
    } catch {
      alert('Error deleting school');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-3">
              <div className="h-10 bg-gray-200 rounded-lg w-64 skeleton"></div>
              <div className="h-4 bg-gray-200 rounded w-48 skeleton"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded-lg w-40 skeleton"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card overflow-hidden animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="h-56 bg-gray-200 skeleton"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded skeleton"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded skeleton"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 skeleton"></div>
                  </div>
                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <div className="h-4 bg-gray-200 rounded skeleton"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 skeleton"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-6 py-4 bg-white rounded-xl shadow-soft">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
              <span className="text-blue-600 font-semibold text-lg">Loading schools...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button 
            onClick={fetchSchools}
            className="btn-primary hover-lift"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Our <span className="text-gradient">Schools</span>
            </h1>
            <p className="text-xl text-gray-600">Discover and manage all registered schools</p>
          </div>
          <Link 
            href="/addSchool" 
            onClick={() => setIsNavigating(true)}
            className={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group ${isNavigating ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isNavigating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                <span className="text-lg">Loading...</span>
              </>
            ) : (
              <>
                <div className="w-6 h-6 mr-3 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors duration-200">
                  <svg className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="text-lg font-bold">Add New School</span>
              </>
            )}
          </Link>
        </div>

        {schools.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-float">
              <span className="text-6xl">🏫</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No schools found</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              Start building your school directory by adding your first school
            </p>
            <Link 
              href="/addSchool"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 group"
            >
              <div className="w-8 h-8 mr-4 bg-white/25 rounded-xl flex items-center justify-center group-hover:bg-white/35 transition-colors duration-200">
                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="group-hover:tracking-wide transition-all duration-300">Add First School</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {schools.map((school, index) => (
              <div 
                key={school.id} 
                className="card-elevated group animate-slide-up hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-56 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
                  {school.image && school.image.trim() !== '' ? (
                    <Image
                      src={school.image.startsWith('http') ? school.image : `/${school.image}`}
                      alt={school.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      loading="lazy"
                      priority={false}
                      quality={85}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      onError={(e) => {
                        // Hide the image if it fails to load and show fallback
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="flex items-center justify-center h-full">
                              <div class="text-6xl opacity-60">🏫</div>
                            </div>
                          `;
                        }
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-6xl opacity-60">🏫</div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {school.name}
                  </h3>
                  
                  <div className="space-y-3 text-sm text-gray-600 mb-6">
                    <div className="flex items-start">
                      <svg className="w-4 h-4 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="line-clamp-2 leading-relaxed">{school.adress}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <p className="font-medium">{school.city}, {school.state}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm font-medium">Contact:</span>
                      <span className="font-semibold text-gray-900 text-sm">{school.contact}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm font-medium">Email:</span>
                      <span className="font-semibold text-gray-900 text-sm truncate max-w-[140px]" title={school.email_id}>
                        {school.email_id}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Added:</span>
                      <span>{new Date(school.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-100">
                      <button
                        onClick={() => deleteSchool(school.id)}
                        disabled={deletingId === school.id}
                        className={`w-full flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          deletingId === school.id
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 hover-lift'
                        }`}
                      >
                        {deletingId === school.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete School
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
