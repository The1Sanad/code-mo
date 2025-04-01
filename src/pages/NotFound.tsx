import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-2">Page Not Found</p>
        <p className="text-gray-400">Redirecting you to the homepage...</p>
      </div>
    </div>
  );
}