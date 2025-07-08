'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSignup(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // for cookies/sessions!
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        window.location.href = '/login';
      } else {
        const data = await res.json();
        setError(data.message || 'Signup failed.');
      }
    } catch (err) {
      setError('Network error');
    }
  }

  return (
    <div className="center-container">
      <form className="form-card" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
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
          autoComplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <button type="submit">Sign Up</button>
        <div className="switch-link">
          Already have an account? <Link href="/login">Log in here</Link>
        </div>
      </form>
    </div>
  );
}
