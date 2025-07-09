"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    router.push('/login');
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