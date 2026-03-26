import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [occupations, setOccupations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOccupations();
  }, []);

  async function fetchOccupations() {
    const { data } = await supabase.from("occupations").select("*");
    setOccupations(data || []);
  }

  const filtered = occupations.filter((item) =>
    item.occupation_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      fontFamily: "Inter, Arial",
      background: "#f5f7fb",
      minHeight: "100vh"
    }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}>
        <strong style={{ fontSize: "18px" }}>ANZSCO Intelligence</strong>

        <div>
          <button style={{
            padding: "8px 16px",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}>
            Book Consultation
          </button>
        </div>
      </div>

      {/* HERO */}
      <div style={{
        textAlign: "center",
        padding: "80px 20px",
        background: "linear-gradient(135deg, #eef2ff, #f9fafb)"
      }}>
        <h1 style={{
          fontSize: "42px",
          fontWeight: "700",
          marginBottom: "10px"
        }}>
          Australia PR Intelligence Platform 🇦🇺
        </h1>

        <p style={{
          fontSize: "18px",
          color: "#555",
          marginBottom: "30px"
        }}>
          Real-time insights, state availability & your best migration pathway
        </p>

        <button style={{
          padding: "14px 28px",
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px"
        }}>
          Check My PR Chances
        </button>
      </div>

      {/* SEARCH CARD */}
      <div style={{
        maxWidth: "800px",
        margin: "-40px auto 40px",
        background: "#fff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
      }}>
        <h3 style={{ marginBottom: "15px" }}>Search Your Occupation</h3>

        <input
          type="text"
          placeholder="e.g. Software Engineer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "14px",
            width: "100%",
            borderRadius: "10px",
            border: "1px solid #ddd"
          }}
        />

        <div style={{ marginTop: "20px" }}>
          {filtered.map((item) => (
            <a
              key={item.id}
              href={`/occupation/${item.anzsco_code}`}
              style={{
                display: "block",
                padding: "14px",
                marginBottom: "10px",
                borderRadius: "10px",
                textDecoration: "none",
                color: "#000",
                background: "#f9fafb",
                transition: "0.2s"
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#eef2ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#f9fafb")
              }
            >
              <strong>{item.occupation_name}</strong><br />
              ANZSCO: {item.anzsco_code}
            </a>
          ))}
        </div>
      </div>

      {/* TRUST SECTION */}
      <div style={{
        maxWidth: "1000px",
        margin: "40px auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {[
          "Real-time ANZSCO data",
          "State-wise insights",
          "Smart pathway recommendations"
        ].map((item, i) => (
          <div key={i} style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.06)"
          }}>
            ✔ {item}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        textAlign: "center",
        padding: "60px 20px"
      }}>
        <h2 style={{ marginBottom: "10px" }}>
          Get Your Personalized PR Strategy
        </h2>

        <p style={{ color: "#666", marginBottom: "20px" }}>
          Speak with experts and plan your migration journey
        </p>

        <button style={{
          padding: "14px 30px",
          background: "#16a34a",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          Book Expert Consultation
        </button>
      </div>

    </div>
  );
}
