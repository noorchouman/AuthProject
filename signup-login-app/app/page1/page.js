'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page1() {
  const [authStatus, setAuthStatus] = useState('checking');
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/login');
      return;
    }
    setAuthStatus('authenticated');
 
  }, [router]);

  if (authStatus === 'checking') {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Verifying your session...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card success-card">
        <div className="auth-header">
          <div className="success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          </div>
          <h2>Welcome!</h2>
          <p className="auth-subtitle">You're successfully signed in</p>
        </div>
        
        {userEmail && (
          <div className="user-info">
            <p>Logged in as:</p>
            <div className="user-email">{userEmail}</div>
          </div>
        )}

        <button 
          onClick={() => {
            localStorage.removeItem('token');
            router.push('/login');
          }}
          className="auth-button secondary"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}