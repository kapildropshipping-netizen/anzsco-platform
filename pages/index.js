import { useState } from "react";

export default function Home() {
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

  // ✅ Lead scoring
  function calculateScore(data) {
    let score = 0;

    if (Number(data.age) < 35) score += 2;

    if (
      data.qualification === "Graduate" ||
      data.qualification === "Postgraduate" ||
      data.qualification === "PhD"
    ) score += 2;

    if (Number(data.experience) >= 8) score += 2;

    if (score >= 5) return "High";
    if (score >= 3) return "Medium";
    return "Low";
  }

  async function handleSubmit() {
    const leadScore = calculateScore(form);

    const payload = {
      ...form,
      score: leadScore,
      source
    };

    console.log(payload);

    await fetch("https://script.google.com/macros/s/AKfycbwhhNUMWf4n-1aWGJWBcH1xrZ4bTNP5gitrLs3F5hHqVvNpaJ73IHyusDdtuxGltkYXeA/exec", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(payload)
    });

    alert(`Submitted! Lead Quality: ${leadScore}`);
    setShowModal(false);
  }

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd"
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#f6f8fb" }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "18px 40px",
        background: "#fff",
        borderBottom: "1px solid #eee"
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
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Book Consultation
        </button>
      </div>

      {/* HERO */}
      <div style={{
        textAlign: "center",
        padding: "100px 20px",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "#fff"
      }}>
        <h1 style={{
          fontSize: "48px",
          fontWeight: "700"
        }}>
          Australia PR Intelligence Platform
        </h1>

        <p style={{ opacity: 0.7 }}>
          Real-time insights • Smart pathways • Better decisions
        </p>

        <button
          onClick={() => {
            setSource("check");
            setShowModal(true);
          }}
          style={{
            marginTop: "25px",
            padding: "14px 30px",
            background: "#ff6b35",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(255,107,53,0.4)"
          }}
        >
          Check My PR Chances
        </button>
      </div>

      {/* SEARCH */}
      <div style={{
        maxWidth: "700px",
        margin: "-50px auto 50px",
        background: "#fff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.12)"
      }}>
        <h3>Search Occupation</h3>

        <input
          placeholder="Type occupation (e.g. Software Engineer)"
          style={inputStyle}
        />
      </div>

      {/* SERVICES */}
      <div style={{ padding: "60px 40px", textAlign: "center" }}>
        <h2>Visa & Migration Services</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "30px"
        }}>
          {[
            "Skilled Migration",
            "PR Strategy",
            "State Nomination",
            "Partner Visa"
          ].map((item) => (
            <div key={item}
              style={{
                background: "#fff",
                padding: "28px",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                transition: "0.3s",
                cursor: "pointer"
              }}
              onMouseOver={(e)=>{
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.12)";
              }}
              onMouseOut={(e)=>{
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.06)";
              }}
            >
              <h4>{item}</h4>
              <p style={{ color: "#666" }}>Expert help for {item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BLOG */}
      <div style={{ padding: "60px 40px", background: "#fff" }}>
        <h2 style={{ textAlign: "center" }}>Migration Insights</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginTop: "30px"
        }}>
          {[1,2,3].map((i) => (
            <div key={i} style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
            }}>
              <div style={{
                height: "120px",
                background: "#e5e7eb",
                borderRadius: "10px",
                marginBottom: "12px"
              }}></div>

              <h4>PR Update {i}</h4>
              <p style={{ color: "#666" }}>
                Latest migration updates & insights
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        textAlign: "center",
        padding: "80px",
        background: "linear-gradient(135deg,#ff6b35,#ff8c42)",
        color: "#fff"
      }}>
        <h2>Start Your PR Journey Today</h2>

        <button
          onClick={() => {
            setSource("consultation");
            setShowModal(true);
          }}
          style={{
            marginTop: "20px",
            padding: "14px 30px",
            background: "#000",
            color: "#fff",
            borderRadius: "10px",
            border: "none"
          }}
        >
          Book Consultation
        </button>
      </div>

      {/* MODAL FORM */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999
        }}>
          <div style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "16px",
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

            <input type="number" placeholder="Age" style={inputStyle}
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

            <input type="number" placeholder="Experience (years)" style={inputStyle}
              onChange={(e)=>setForm({...form,experience:e.target.value})} />

            <button onClick={handleSubmit}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "12px",
                background: "#ff6b35",
                color: "#fff",
                border: "none",
                borderRadius: "10px"
              }}>
              Submit
            </button>

            <button onClick={()=>setShowModal(false)}
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                background: "#eee",
                border: "none",
                borderRadius: "10px"
              }}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
