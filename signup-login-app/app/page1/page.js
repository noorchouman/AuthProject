'use client';
import { useEffect, useState } from 'react';

export default function Page1() {
  const [checking, setChecking] = useState(true);
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('http://localhost:8080/api/check-auth', {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) {
          window.location.href = '/login';
        } else {
          setChecking(false);
        }
      } catch (e) {
        window.location.href = '/login';
      }
    }
    checkAuth();
    if (localStorage.getItem('justLoggedIn')) {
      setJustLoggedIn(true);
      localStorage.removeItem('justLoggedIn');
    }
  }, []);

  async function handleLogout() {
    await fetch('http://localhost:8080/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    window.location.href = '/login';
  }

  if (checking) return null;

  return (
    <div className="center-container">
      {justLoggedIn && (
        <div style={{
          color: '#fff',
          background: '#28a745',
          padding: '10px 18px',
          borderRadius: '8px',
          marginBottom: 20,
          fontWeight: 'bold'
        }}>
          Login successful!
        </div>
      )}
      <h2>This is Page 1 (Protected)</h2>
      <p>Only logged-in users can see this page.</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}
