'use client';
import { useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
     setIsClient(true); // This will only run on client side
   }, []);

   async function handleLogin(e) {
       e.preventDefault();
       setError('');
       try {
         const res = await fetch('http://localhost:8080/auth/login', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ email, password }),
         });
         
         if (!res.ok) {
           const errorData = await res.json();
           setError(errorData.message || errorData.error || 'Login failed');
           return;
         }
         
         const data = await res.json();
         if (isClient) { // Only access localStorage on client
           localStorage.setItem('token', data.token);
         }
         router.push('/page1');
       } catch (err) {
         setError('Network error. Please try again.');
       }
     }


  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>
        <div className="auth-footer">
          New to our platform?{' '}
          <Link href="/signup" className="auth-link">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
