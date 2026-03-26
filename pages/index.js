import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [occupations, setOccupations] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [source, setSource] = useState(""); // 👈 important

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
    }, 800);
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
            source // 👈 sends intent
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

  return (
    <div style={{ fontFamily: "Inter, Arial", background: "#f5f7fb" }}>

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
          style={{ background: "#ff6b35", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "6px" }}
        >
          Book Consultation
        </button>
      </div>

      {/* HERO */}
      <div style={{
        position: "relative",
        height: "520px",
        backgroundImage: "url('https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2')",
        backgroundSize: "cover"
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
          color: "#fff",
          padding: "100px 40px"
        }}>
          <h1>Explore Visa Options For Australia</h1>

          <button
            onClick={() => {
              setSource("check");
              scrollToSearch();
            }}
            style={{ marginTop: "20px", padding: "14px 28px", background: "#ff6b35", color: "#fff", border: "none" }}
          >
            Check My PR Chances
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div ref={searchRef} style={{
        maxWidth: "900px",
        margin: "-60px auto",
        background: "#fff",
        padding: "30px"
      }}>
        <input
          placeholder="Search occupation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: "12px" }}
        />

        {filtered.map((item) => (
          <div key={item.id}>{item.occupation_name}</div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "60px" }}>
        <button
          onClick={() => {
            setSource("check");
            scrollToSearch();
          }}
          style={{ padding: "14px 30px", background: "#ff6b35", color: "#fff" }}
        >
          Check My PR Chances
        </button>

        <br /><br />

        <button
          onClick={() => {
            setSource("consultation");
            setShowModal(true);
          }}
          style={{ padding: "14px 30px", background: "#000", color: "#fff" }}
        >
          Book Consultation
        </button>
      </div>

      {/* POPUP */}
      {showModal && (
        <div style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          top: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            width: "320px"
          }}>
            <h3>
              {source === "consultation"
                ? "Book Your Consultation"
                : "Check Your PR Eligibility"}
            </h3>

            <p style={{ fontSize: "14px", color: "#666" }}>
              {source === "consultation"
                ? "Our expert will contact you"
                : "Get your migration chances instantly"}
            </p>

            <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})} />
            <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} />
            <input placeholder="Phone" onChange={(e)=>setForm({...form,phone:e.target.value})} />

            <button onClick={handleSubmit}>Submit</button>
            <button onClick={()=>setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

    </div>
  );
}
