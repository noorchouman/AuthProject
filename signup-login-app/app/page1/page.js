'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page1() {
  const [authStatus, setAuthStatus] = useState('checking');
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8080/api/check-auth', {
      credentials: 'include'
    })
    .then(res => {
      if (res.ok) {
        setAuthStatus('authenticated');
      } else {
        router.push('/login');
      }
    })
    .catch(() => {
      router.push('/login');
    });
  }, []);

  if (authStatus === 'checking') {
    return <div>Checking authentication...</div>;
  }

  if (authStatus === 'authenticated') {
    return (
      <div>
        <h1>Protected Page</h1>
        <p>You are logged in!</p>
      </div>
    );
  }

  return null;
}