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

  const cardStyle = {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
    transition: "all 0.2s ease",
    cursor: "pointer"
  };

  return (
    <div style={{ fontFamily: "Inter, Arial", background: "#f5f7fb" }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 40px",
        background: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
      }}>
        <strong>ANZSCO Intelligence</strong>

        <button style={{
          background: "#ff6b35",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}>
          Book Consultation
        </button>
      </div>

      {/* HERO */}
      <div style={{
        position: "relative",
        height: "520px",
        backgroundImage: "url('https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>

        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0) 100%)"
        }} />

        <div style={{
          position: "relative",
          zIndex: 2,
          color: "#fff",
          padding: "100px 40px",
          maxWidth: "700px"
        }}>
          <h1 style={{ fontSize: "42px", fontWeight: "700" }}>
            Explore Visa Options For Australia
          </h1>

          <p style={{ fontSize: "18px", marginTop: "10px", color: "#f1f5f9" }}>
            Trusted by migration professionals — real-time occupation insights & pathways
          </p>

          <button style={{
            marginTop: "20px",
            background: "#ff6b35",
            color: "#fff",
            padding: "14px 28px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>
            Start Your Search
          </button>
        </div>
      </div>

      {/* SEARCH CARD */}
      <div style={{
        maxWidth: "900px",
        margin: "-60px auto 50px",
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        border: "1px solid #eee",
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        position: "relative",
        zIndex: 5
      }}>
        <h2 style={{ textAlign: "center" }}>ANZSCO Search Tool</h2>

        <input
          type="text"
          placeholder="Type occupation name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "14px",
            width: "100%",
            marginTop: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <div style={{ marginTop: "20px" }}>
          {filtered.map((item) => (
            <a
              key={item.id}
              href={`/occupation/${item.anzsco_code}`}
              style={{
                display: "block",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
                background: "#f9fafb",
                textDecoration: "none",
                color: "#000"
              }}
            >
              <strong>{item.occupation_name}</strong><br />
              ANZSCO: {item.anzsco_code}
            </a>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>Visa & Migration Services</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px",
          maxWidth: "1100px",
          marginInline: "auto"
        }}>

          {[
  ["Skilled PR Visas", "189, 190, 491 visa pathways"],
  ["State Nomination Strategy", "Find best state options"],
  ["Occupation Assessment", "Check ANZSCO eligibility"],
  ["Partner & Family Visas", "Join your loved ones"],
  ["Student to PR Pathway", "Convert study visa to PR"],
  ["1:1 Consultation", "Personalized migration strategy"],
  ["Visa Refusal Assistance", "Handle refusals & reapply strategically"],
  ["Employer Sponsored Visas", "482, 186 pathways with job support"]
].map(([title, desc], i) => (
            <div
              key={i}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.05)";
              }}
            >
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}

        </div>

        <button style={{
          marginTop: "30px",
          background: "#ff6b35",
          color: "#fff",
          padding: "12px 25px",
          border: "none",
          borderRadius: "6px"
        }}>
          Book A Consultation
        </button>
      </div>

      {/* BLOG */}
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>Migration Insights</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px",
          maxWidth: "1000px",
          marginInline: "auto"
        }}>
          {["PR Tips", "Visa Updates", "ANZSCO Guide"].map((item, i) => (
            <div key={i} style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.05)"
            }}>
              <h4>{item}</h4>
              <p>Latest updates and expert insights</p>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{
        textAlign: "center",
        padding: "60px",
        background: "#fff"
      }}>
        <h2>Start Your Migration Journey</h2>

        <button style={{
          background: "#ff6b35",
          color: "#fff",
          padding: "14px 30px",
          border: "none",
          borderRadius: "8px"
        }}>
          Get My PR Assessment
        </button>
      </div>

    </div>
  );
}
