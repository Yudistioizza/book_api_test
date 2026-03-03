import React from "react";

const iconWarning = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

export default function DeleteModal({ isOpen, onClose, onConfirm, book }) {
  if (!isOpen || !book) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.7)",
      backdropFilter: "blur(6px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100,
      padding: "20px",
      animation: "fadeIn 0.2s ease forwards",
    }}>
      <div style={{
        background: "linear-gradient(145deg, #1a1a3e, #13132b)",
        padding: "36px 32px",
        borderRadius: "18px",
        width: "420px",
        maxWidth: "100%",
        boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(239,68,68,0.2)",
        textAlign: "center",
        animation: "fadeIn 0.25s ease forwards",
      }}>
        {/* Icon */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "64px",
          height: "64px",
          borderRadius: "16px",
          background: "rgba(239,68,68,0.12)",
          border: "1.5px solid rgba(239,68,68,0.3)",
          color: "#f87171",
          marginBottom: "20px",
        }}>
          {iconWarning}
        </div>

        <h2 style={{
          fontSize: "20px",
          fontWeight: 800,
          color: "#f1f5f9",
          marginBottom: "10px",
          fontFamily: "'Syne', sans-serif",
        }}>
          Delete Book
        </h2>

        <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6", marginBottom: "28px" }}>
          Are you sure you want to delete{" "}
          <span style={{ color: "#e2e8f0", fontWeight: 700 }}>{book.book_name}</span>?
          <br />
          <span style={{ fontSize: "12px", color: "#475569" }}>This action cannot be undone.</span>
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
          <button
            onClick={onClose}
            style={{
              padding: "11px 24px",
              borderRadius: "10px",
              border: "1.5px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: "#94a3b8",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.15s",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#cbd5e1"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#94a3b8"; }}
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(book.id)}
            style={{
              padding: "11px 26px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(239,68,68,0.35)",
              transition: "all 0.15s",
              fontFamily: "'DM Sans', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(239,68,68,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(239,68,68,0.35)"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
            </svg>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
