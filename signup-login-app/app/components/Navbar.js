"use client";
import Link from "next/link";

export default function Navbar() {
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
        onClick={() => {
          localStorage.removeItem("loggedIn");
          window.location.href = "/login";
        }}
      >
        Log Out
      </button>
    </nav>
  );
}
