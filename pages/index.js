import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [occupations, setOccupations] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [source, setSource] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const searchRef = useRef(null);

  useEffect(() => {
    fetchOccupations();
  }, []);

  async function fetchOccupations() {
    const { data } = await supabase.from("occupations").select("*");
    setOccupations(data || []);
  }

  function scrollToSearch() {
    searchRef.current?.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      setShowModal(true);
    }, 600);
  }

  async function handleSubmit() {
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbw5pPWoMcFUsNhtQVmfzWeSnaH4D4cqyiMWLdIQlOHM79kb2igQ_RlkFScCZGDDUiJmMg/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify({
            ...form,
            source
          })
        }
      );

      alert("Submitted successfully!");
      setShowModal(false);
      setForm({ name: "", email: "", phone: "" });

    } catch (err) {
      alert("Error submitting form");
    }
  }

  const filtered = occupations.filter((item) =>
    item.occupation_name?.toLowerCase().includes(search.toLowerCase())
  );

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px"
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#f5f7fb" }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 40px",
        background: "#fff"
      }}>
        <strong>ANZSCO Intelligence</strong>

        <button
          onClick={() => {
            setSource("consultation");
            setShowModal(true);
          }}
          style={{
            background: "#ff6b35",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Book Consultation
        </button>
      </div>

      {/* HERO */}
      <div style={{
        position: "relative",
        height: "520px",
        backgroundImage: "url('https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2')",
        backgroundSize: "cover",
        color: "#fff"
      }}>
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, rgba(0,0,0,0.65), transparent)"
        }} />

        <div style={{
          position: "relative",
          zIndex: 2,
          padding: "100px 40px"
        }}>
          <h1 style={{ fontSize: "42px" }}>
            Explore Visa Options For Australia
          </h1>

          <p style={{ marginTop: "10px", opacity: 0.9 }}>
            Real-time occupation insights & migration pathways
          </p>

          <button
            onClick={() => {
              setSource("check");
              scrollToSearch();
            }}
            style={{
              marginTop: "20px",
              padding: "14px 28px",
              background: "#ff6b35",
              border: "none",
              borderRadius: "6px",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Check My PR Chances
          </button>
        </div>
      </div>

      {/* SEARCH CARD */}
      <div
        ref={searchRef}
        style={{
          maxWidth: "900px",
          margin: "-60px auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}
      >
        <h3>ANZSCO Search Tool</h3>

        <input
          placeholder="Search occupation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />

        {filtered.map((item) => (
          <div key={item.id} style={{ marginTop: "10px" }}>
            {item.occupation_name}
          </div>
        ))}
      </div>

      {/* CTA SECTION */}
      <div style={{ textAlign: "center", padding: "60px" }}>
        <button
          onClick={() => {
            setSource("check");
            scrollToSearch();
          }}
          style={{
            padding: "14px 30px",
            background: "#ff6b35",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Check My PR Chances
        </button>

        <br /><br />

        <button
          onClick={() => {
            setSource("consultation");
            setShowModal(true);
          }}
          style={{
            padding: "14px 30px",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Book Consultation
        </button>
      </div>

      {/* POPUP */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999
        }}>
          <div style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "14px",
            width: "380px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            textAlign: "center"
          }}>
            <h2>
              {source === "consultation"
                ? "Book Your Consultation"
                : "Check Your PR Eligibility"}
            </h2>

            <p style={{ fontSize: "14px", color: "#666" }}>
              {source === "consultation"
                ? "Our expert will contact you shortly"
                : "Get your migration chances instantly"}
            </p>

            <input
              placeholder="Your Name"
              onChange={(e)=>setForm({...form,name:e.target.value})}
              style={inputStyle}
            />

            <input
              placeholder="Email Address"
              onChange={(e)=>setForm({...form,email:e.target.value})}
              style={inputStyle}
            />

            <input
              placeholder="Phone Number"
              onChange={(e)=>setForm({...form,phone:e.target.value})}
              style={inputStyle}
            />

            <button
              onClick={handleSubmit}
              style={{
                width: "100%",
                marginTop: "15px",
                padding: "12px",
                background: "#ff6b35",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Submit
            </button>

            <button
              onClick={()=>setShowModal(false)}
              style={{
                marginTop: "10px",
                background: "none",
                border: "none",
                color: "#888",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
