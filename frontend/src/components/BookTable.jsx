import React from "react";

const iconEdit = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const iconTrash = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

export default function BookTable({ books, onEdit, onDelete }) {
  if (!books.length) {
    return (
      <div style={{
        textAlign: "center",
        padding: "60px 20px",
        color: "#4b5563",
        borderRadius: "14px",
        background: "rgba(255,255,255,0.02)",
        border: "1.5px dashed rgba(99,102,241,0.2)",
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5" style={{ marginBottom: "12px" }} strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
        <p style={{ fontSize: "15px", fontWeight: 600, color: "#6b7280" }}>No books found</p>
        <p style={{ fontSize: "13px", color: "#4b5563", marginTop: "4px" }}>Try a different search or add a new book</p>
      </div>
    );
  }

  const headers = ["#", "Title", "Author", "Published", "Description", "Actions"];

  return (
    <div style={{ overflowX: "auto", borderRadius: "14px", border: "1px solid rgba(99,102,241,0.15)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "720px" }}>
        <thead>
          <tr style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(79,70,229,0.1))" }}>
            {headers.map((h) => (
              <th key={h} style={{
                padding: "14px 16px",
                textAlign: "left",
                fontSize: "11px",
                fontWeight: 700,
                color: "#a5b4fc",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                borderBottom: "1px solid rgba(99,102,241,0.2)",
                whiteSpace: "nowrap",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {books.map((book, idx) => (
            <tr
              key={book.id}
              style={{
                backgroundColor: idx % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.005)",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(99,102,241,0.07)"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.005)"}
            >
              <td style={{ padding: "13px 16px", color: "#475569", fontSize: "13px", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                {idx + 1}
              </td>
              <td style={{ padding: "13px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{
                  fontWeight: 700,
                  color: "#e2e8f0",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}>
                  <span style={{
                    display: "inline-block",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #6366f1, #818cf8)",
                    flexShrink: 0,
                  }}/>
                  {book.book_name}
                </span>
              </td>
              <td style={{ padding: "13px 16px", color: "#cbd5e1", fontSize: "14px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                {book.author}
              </td>
              <td style={{ padding: "13px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{
                  display: "inline-block",
                  padding: "3px 10px",
                  borderRadius: "999px",
                  background: "rgba(99,102,241,0.12)",
                  border: "1px solid rgba(99,102,241,0.25)",
                  color: "#a5b4fc",
                  fontSize: "12px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}>
                  {book.published_date || "—"}
                </span>
              </td>
              <td style={{
                padding: "13px 16px",
                color: "#94a3b8",
                fontSize: "13px",
                maxWidth: "240px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}>
                {book.description || <span style={{ color: "#374151", fontStyle: "italic" }}>No description</span>}
              </td>
              <td style={{ padding: "13px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => onEdit(book)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "7px 13px",
                      borderRadius: "8px",
                      border: "1.5px solid rgba(99,102,241,0.4)",
                      background: "rgba(99,102,241,0.1)",
                      color: "#a5b4fc",
                      fontWeight: 600,
                      fontSize: "12px",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,102,241,0.25)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.6)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(99,102,241,0.1)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; }}
                  >
                    {iconEdit} Edit
                  </button>

                  <button
                    onClick={() => onDelete(book)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "7px 13px",
                      borderRadius: "8px",
                      border: "1.5px solid rgba(239,68,68,0.3)",
                      background: "rgba(239,68,68,0.08)",
                      color: "#fca5a5",
                      fontWeight: 600,
                      fontSize: "12px",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
                  >
                    {iconTrash} Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
