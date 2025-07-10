'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSignup(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        setStep(2);
      } else {
        setError(await res.text());
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:8080/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      if (res.ok) {
        router.push('/login');
      } else {
        setError(await res.text());
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{step === 1 ? "Create Account" : "Verify OTP"}</h2>
          <p className="auth-subtitle">
            {step === 1
              ? "Get started with your new account"
              : `Enter the OTP sent to ${email}`}
          </p>
        </div>
        {error && <div className="auth-error">{error}</div>}
        {step === 1 ? (
          <form onSubmit={handleSignup} className="auth-form">
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
              Sign Up
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="auth-form">
            <div className="input-group">
              <label htmlFor="otp">OTP</label>
              <input
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-button">
              Verify
            </button>
          </form>
        )}
        <div className="auth-footer">
          {step === 1 ? (
            <>
              Already have an account?{' '}
              <Link href="/login" className="auth-link">Sign in here</Link>
            </>
          ) : (
            <>
              Didn't get the code?&nbsp;
              <button
                className="auth-link"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#0056b3',
                  cursor: 'pointer'
                }}
                onClick={async (e) => {
                  e.preventDefault();
                  setError('');
                  try {
                    const res = await fetch('http://localhost:8080/auth/signup', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email, password }),
                    });
                    if (!res.ok) setError('Resend failed.');
                  } catch {
                    setError('Resend failed.');
                  }
                }}
              >
                Resend OTP
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
