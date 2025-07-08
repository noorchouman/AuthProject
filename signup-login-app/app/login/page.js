'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();

      if (res.ok) {
        window.location.href = '/page1';
      } else {
        setError('Invalid credentials.');
        console.log('LOGIN FAIL:', res.status, text);
      }
    } catch (err) {
      setError('Network error');
      console.log('NETWORK ERROR:', err);
    }
  }

  return (
    <div className="center-container">
      <form className="form-card" onSubmit={handleLogin}>
        <h2>Log In</h2>
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <button type="submit">Log In</button>
        <div className="switch-link">
          No account? <Link href="/signup">Sign up here</Link>
        </div>
      </form>
    </div>
  );
}
