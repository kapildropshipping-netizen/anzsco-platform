import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [occupations, setOccupations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOccupations();
  }, []);

  async function fetchOccupations() {
    const { data } = await supabase
      .from("occupations")
      .select("*");

    setOccupations(data || []);
  }

  const filtered = occupations.filter((item) =>
    item.occupation_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      fontFamily: "Arial",
      background: "#f9fafb",
      minHeight: "100vh",
      padding: "40px"
    }}>

      {/* HERO */}
      <div style={{
        textAlign: "center",
        marginBottom: "40px"
      }}>
        <h1 style={{
          fontSize: "40px",
          fontWeight: "bold",
          marginBottom: "10px"
        }}>
          Check Your Australia PR Chances Instantly 🇦🇺
        </h1>

        <p style={{
          color: "#555",
          fontSize: "18px",
          marginBottom: "25px"
        }}>
          Find your best state, visa pathway & success probability in seconds
        </p>

        {/* CTA BUTTON */}
        <button style={{
          padding: "12px 25px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "30px"
        }}>
          Start Your Assessment
        </button>
      </div>

      {/* SEARCH BOX */}
      <div style={{
        textAlign: "center",
        marginBottom: "30px"
      }}>
        <input
          type="text"
          placeholder="Search your occupation (e.g. Software Engineer)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "16px",
            width: "400px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
          }}
        />
      </div>

      {/* FEATURED OCCUPATIONS */}
      <div style={{
        textAlign: "center",
        marginBottom: "30px"
      }}>
        <p style={{ color: "#666" }}>Popular Searches:</p>

        <div style={{ marginTop: "10px" }}>
          {["Software Engineer", "Accountant", "Nurse"].map((item) => (
            <span
              key={item}
              onClick={() => setSearch(item)}
              style={{
                display: "inline-block",
                padding: "8px 12px",
                margin: "5px",
                background: "#fff",
                borderRadius: "20px",
                cursor: "pointer",
                border: "1px solid #ddd"
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* RESULTS */}
      <div style={{
        maxWidth: "700px",
        margin: "0 auto"
      }}>
        {filtered.map((item) => (
          <a
            key={item.id}
            href={`/occupation/${item.anzsco_code}`}
            style={{
              display: "block",
              background: "#fff",
              padding: "16px",
              marginBottom: "12px",
              borderRadius: "10px",
              textDecoration: "none",
              color: "black",
              boxShadow: "0 4px 10px rgba(0,0,0,0.06)"
            }}
          >
            <strong>{item.occupation_name}</strong><br />
            ANZSCO: {item.anzsco_code}
          </a>
        ))}
      </div>

      {/* TRUST SECTION */}
      <div style={{
        marginTop: "60px",
        textAlign: "center"
      }}>
        <h2>Why Use This Tool?</h2>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "20px",
          flexWrap: "wrap"
        }}>
          <div style={{ maxWidth: "220px" }}>
            <h4>🎯 Accurate Insights</h4>
            <p style={{ color: "#666" }}>
              Real-time state-wise visa availability
            </p>
          </div>

          <div style={{ maxWidth: "220px" }}>
            <h4>⚡ Instant Results</h4>
            <p style={{ color: "#666" }}>
              No forms, no waiting — instant answers
            </p>
          </div>

          <div style={{ maxWidth: "220px" }}>
            <h4>📊 Smart Decisions</h4>
            <p style={{ color: "#666" }}>
              Know your best pathway and chances
            </p>
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{
        marginTop: "60px",
        textAlign: "center"
      }}>
        <h2>Start Your Migration Journey Today</h2>
        <button style={{
          padding: "14px 30px",
          background: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "10px"
        }}>
          Check My Chances Now
        </button>
      </div>

    </div>
  );
}
