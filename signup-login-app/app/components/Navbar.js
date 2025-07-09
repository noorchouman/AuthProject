"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav style={{ padding: "1rem 2rem", display: "flex", gap: 20 }}>
      <Link href="/page1">Page 1</Link>
      <Link href="/login">Login</Link>
      <Link href="/signup">Sign Up</Link>
      <button
        style={{
          marginLeft: "auto",
          background: "#e94f4f",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "0.5rem 1.3rem",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        Log Out
      </button>
    </nav>
  );
}