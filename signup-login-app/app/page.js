'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('http://localhost:8080/api/check-auth', {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) {
          router.push('/login');
        }
      } catch (error) {
        router.push('/login');
      }
    }
    checkAuth();
  }, [router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Home Page</h1>
      <p>You are logged in!</p>
    </div>
  );
}