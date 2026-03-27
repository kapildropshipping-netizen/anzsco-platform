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
    phone: "",
    age: "",
    qualification: "",
    occupation: "",
    experience: ""
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
    setTimeout(() => setShowModal(true), 600);
  }

  // ✅ LEAD SCORING
  function calculateScore(data) {
    let score = 0;

    if (data.age && Number(data.age) < 35) score += 2;

    if (
      data.qualification === "Graduate" ||
      data.qualification === "Postgraduate" ||
      data.qualification === "PhD"
    ) score += 2;

    if (data.experience && Number(data.experience) >= 8) score += 2;

    if (score >= 5) return "High";
    if (score >= 3) return "Medium";
    return "Low";
  }

  async function handleSubmit() {
    const leadScore = calculateScore(form);

    await fetch(
      "https://script.google.com/macros/s/AKfycbw5pPWoMcFUsNhtQVmfzWeSnaH4D4cqyiMWLdIQlOHM79kb2igQ_RlkFScCZGDDUiJmMg/exec",
      {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          ...form,
          source,
          score: leadScore
        })
      }
    );

    alert(`Submitted! Lead Quality: ${leadScore}`);

    setShowModal(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      age: "",
      qualification: "",
      occupation: "",
      experience: ""
    });
  }

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
        background: "#222",
        color: "#fff",
        padding: "100px 40px"
      }}>
        <h1 style={{ fontSize: "42px" }}>
          Explore Visa Options For Australia
        </h1>

        <p style={{ marginTop: "10px", opacity: 0.8 }}>
          Real-time insights & smart migration pathways
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
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Check My PR Chances
        </button>
      </div>

      {/* SEARCH */}
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
      </div>

      {/* SERVICES */}
      <div style={{ padding: "80px 40px", textAlign: "center" }}>
        <h2>Visa & Migration Services</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "40px"
        }}>
          {[
            "Skilled Migration",
            "PR Strategy",
            "State Nomination",
            "Partner Visa"
          ].map((item) => (
            <div key={item} style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
            }}>
              <h4>{item}</h4>
              <p style={{ color: "#666" }}>
                Expert guidance for {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* BLOG */}
      <div style={{ padding: "80px 40px", background: "#fff" }}>
        <h2 style={{ textAlign: "center" }}>Migration Insights</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginTop: "40px"
        }}>
          {[1,2,3].map((i) => (
            <div key={i} style={{
              background: "#f5f5f5",
              padding: "20px",
              borderRadius: "10px"
            }}>
              <h4>PR Update {i}</h4>
              <p>Latest visa insights & updates</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "60px" }}>
        <button
          onClick={() => {
            setSource("consultation");
            setShowModal(true);
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
          Book Consultation
        </button>
      </div>

      {/* POPUP FORM */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999
        }}>
          <div style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "12px",
            width: "400px"
          }}>
            <h3>
              {source === "consultation"
                ? "Book Consultation"
                : "Check PR Eligibility"}
            </h3>

            <input placeholder="Name" style={inputStyle}
              onChange={(e)=>setForm({...form,name:e.target.value})} />

            <input placeholder="Email" style={inputStyle}
              onChange={(e)=>setForm({...form,email:e.target.value})} />

            <input placeholder="Phone" style={inputStyle}
              onChange={(e)=>setForm({...form,phone:e.target.value})} />

            <input placeholder="Age" type="number" style={inputStyle}
              onChange={(e)=>setForm({...form,age:e.target.value})} />

            <select style={inputStyle}
              onChange={(e)=>setForm({...form,qualification:e.target.value})}>
              <option value="">Qualification</option>
              <option>Diploma</option>
              <option>Graduate</option>
              <option>Postgraduate</option>
              <option>PhD</option>
            </select>

            <input placeholder="Occupation" style={inputStyle}
              onChange={(e)=>setForm({...form,occupation:e.target.value})} />

            <input placeholder="Years Experience" type="number" style={inputStyle}
              onChange={(e)=>setForm({...form,experience:e.target.value})} />

            <button onClick={handleSubmit}
              style={{ marginTop: "15px", width: "100%", padding: "12px", background: "#ff6b35", color: "#fff" }}>
              Submit
            </button>

            <button onClick={()=>setShowModal(false)}
              style={{ marginTop: "10px", width: "100%" }}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
