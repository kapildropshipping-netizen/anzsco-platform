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
    <div style={{ fontFamily: "Arial", background: "#f9fafb" }}>

      {/* HERO */}
      <div style={{
        textAlign: "center",
        padding: "80px 20px"
      }}>
        <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
          Australia PR & Skilled Migration Platform 🇦🇺
        </h1>

        <p style={{ color: "#555", fontSize: "18px", marginBottom: "20px" }}>
          Get real-time occupation insights, state availability & your best migration pathway
        </p>

        <button style={{
          padding: "12px 25px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginRight: "10px"
        }}>
          Check Eligibility
        </button>

        <button style={{
          padding: "12px 25px",
          background: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          Book Consultation
        </button>
      </div>

      {/* TRUST */}
      <div style={{
        textAlign: "center",
        padding: "40px"
      }}>
        <h2>Why Choose Us?</h2>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "20px",
          flexWrap: "wrap"
        }}>
          <div>✔ Real-time ANZSCO data</div>
          <div>✔ State-wise insights</div>
          <div>✔ Smart pathway recommendations</div>
        </div>
      </div>

      {/* TOOL */}
      <div style={{
        textAlign: "center",
        padding: "40px"
      }}>
        <h2>Check Your Occupation</h2>

        <input
          type="text"
          placeholder="Search your occupation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "14px",
            width: "350px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginTop: "20px"
          }}
        />

        <div style={{ maxWidth: "700px", margin: "20px auto" }}>
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
                color: "black"
              }}
            >
              <strong>{item.occupation_name}</strong><br />
              ANZSCO: {item.anzsco_code}
            </a>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <div style={{
        textAlign: "center",
        padding: "50px"
      }}>
        <h2>Our Services</h2>

        <p style={{ color: "#666", maxWidth: "600px", margin: "auto" }}>
          We provide expert guidance for Australia PR including profile evaluation,
          state nomination strategy, and end-to-end migration support.
        </p>
      </div>

      {/* FINAL CTA */}
      <div style={{
        textAlign: "center",
        padding: "60px"
      }}>
        <h2>Start Your PR Journey Today</h2>

        <button style={{
          padding: "14px 30px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          Get My PR Assessment
        </button>
      </div>

    </div>
  );
}
