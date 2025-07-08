'use client';
import { useEffect, useState } from 'react';

export default function Page1() {
  const [checking, setChecking] = useState(true);

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
      <h2>This is Page 1 (Protected)</h2>
      <p>Only logged-in users can see this page.</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}
