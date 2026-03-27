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

    const payload = {
      ...form,
      score: leadScore,
      source
    };

    console.log(payload);

    await fetch("YOUR_GOOGLE_SCRIPT_URL", {
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
    borderRadius: "8px",
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
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Book Consultation
        </button>
      </div>

      {/* HERO (FIXED HEIGHT + NO OVERLAP) */}
      <div style={{
        textAlign: "center",
        padding: "80px 20px",
        background: "#111",
        color: "#fff"
      }}>
        <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
          Australia PR Intelligence Platform
        </h1>

        <p style={{ opacity: 0.8 }}>
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
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Check My PR Chances
        </button>
      </div>

      {/* SEARCH (NO OVERLAP NOW) */}
      <div style={{
        maxWidth: "700px",
        margin: "40px auto",
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
      }}>
        <h3 style={{ marginBottom: "10px" }}>Search Occupation</h3>

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
            <div key={item} style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
            }}>
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
              background: "#f5f5f5",
              padding: "20px",
              borderRadius: "10px"
            }}>
              <h4>PR Update {i}</h4>
              <p>Latest visa insights</p>
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
            background: "#000",
            color: "#fff",
            borderRadius: "8px",
            border: "none"
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
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "12px",
            width: "380px"
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

            <input placeholder="Experience (years)" type="number" style={inputStyle}
              onChange={(e)=>setForm({...form,experience:e.target.value})} />

            <button onClick={handleSubmit}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "12px",
                background: "#ff6b35",
                color: "#fff",
                border: "none",
                borderRadius: "8px"
              }}>
              Submit
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
