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
          fontSize: "36px",
          marginBottom: "10px"
        }}>
          Check Your Australia PR Chances Instantly 🇦🇺
        </h1>

        <p style={{
          color: "#666",
          fontSize: "16px"
        }}>
          Find the best state, visa options, and your success probability in seconds
        </p>
      </div>

      {/* SEARCH */}
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
            padding: "14px",
            width: "350px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />
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

          <div style={{ maxWidth: "200px" }}>
            <h4>🎯 Accurate Insights</h4>
            <p style={{ color: "#666" }}>
              Real-time state-wise visa availability
            </p>
          </div>

          <div style={{ maxWidth: "200px" }}>
            <h4>⚡ Instant Results</h4>
            <p style={{ color: "#666" }}>
              No forms, no waiting — get answers instantly
            </p>
          </div>

          <div style={{ maxWidth: "200px" }}>
            <h4>📊 Smart Decisions</h4>
            <p style={{ color: "#666" }}>
              Know your best pathway and chances
            </p>
          </div>

        </div>
      </div>

      {/* CTA */}
      <div style={{
        marginTop: "60px",
        textAlign: "center"
      }}>
        <h2>Ready to Move to Australia?</h2>
        <p style={{ color: "#666" }}>
          Start by checking your occupation above
        </p>
      </div>

    </div>
  );
}
