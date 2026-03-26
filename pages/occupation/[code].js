import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function OccupationPage() {
  const router = useRouter();
  const { code } = router.query;

  const [occupation, setOccupation] = useState(null);
  const [states, setStates] = useState([]);
  const [filter, setFilter] = useState("All");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (code) {
      fetchOccupation();
      fetchStates();
    }
  }, [code]);

  async function fetchOccupation() {
    const { data } = await supabase
      .from("occupations")
      .select("*")
      .eq("anzsco_code", code)
      .single();

    setOccupation(data);
  }

  async function fetchStates() {
    const { data } = await supabase
      .from("state_mapping")
      .select("*")
      .eq("anzsco_code", code);

    setStates(data || []);
  }

  if (!occupation) return <p>Loading...</p>;

  const normalizedStates = states.map((s) => ({
    id: s.id,
    state: s.state || s.state_name || "N/A",
    visa: s.visa_type || s.visa || "N/A",
    status: s.status || "Unknown",
  }));

  const sortedStates = normalizedStates.sort((a, b) => {
    const order = { Open: 1, Limited: 2, Closed: 3 };
    return order[a.status] - order[b.status];
  });

  const filteredStates =
    filter === "All"
      ? sortedStates
      : sortedStates.filter((s) => s.status === "Open");

  const bestState =
    sortedStates.find((s) => s.status === "Open") || sortedStates[0];

  // ✅ FIXED GOOGLE SHEETS FUNCTION
  async function handleSubmit() {
    if (!name || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    const data = {
      name,
      email,
      phone,
      occupation: occupation.occupation_name,
    };

    try {
      await fetch("https://script.google.com/macros/s/AKfycbwATivFF_kP117wvb4G0gX5B-4mPHbnPpH_777MKvXrZKn8mAI3Hoo1EGnmYP9SHRbeQQ/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      alert("Submitted successfully!");

      setName("");
      setEmail("");
      setPhone("");

    } catch (error) {
      alert("Error submitting form");
      console.error(error);
    }
  }

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  };

  return (
    <div style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: "30px",
      fontFamily: "Arial",
      background: "#f9fafb",
      minHeight: "100vh"
    }}>
      
      <h1 style={{ fontSize: "32px", marginBottom: "5px" }}>
        {occupation.occupation_name}
      </h1>

      <p style={{ color: "#666" }}>
        ANZSCO Code: {occupation.anzsco_code}
      </p>

      {bestState && (
        <div style={{
          background: "linear-gradient(135deg, #d4fc79, #96e6a1)",
          padding: "18px",
          borderRadius: "10px",
          marginTop: "20px",
          marginBottom: "25px",
          fontWeight: "bold"
        }}>
          ⭐ Best Pathway: {bestState.state} → {bestState.visa} ({bestState.status})
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setFilter("All")} style={{ marginRight: "10px" }}>
          All
        </button>
        <button onClick={() => setFilter("Open")}>
          Open Only
        </button>
      </div>

      <h2>State Availability</h2>

      {filteredStates.map((s) => (
        <div key={s.id} style={{
          display: "flex",
          justifyContent: "space-between",
          background: "#fff",
          padding: "14px",
          marginBottom: "12px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.06)"
        }}>
          <span><strong>{s.state}</strong></span>
          <span>{s.visa}</span>

          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor:
                s.status === "Open"
                  ? "green"
                  : s.status === "Limited"
                  ? "orange"
                  : "red"
            }}></span>
            <span>{s.status}</span>
          </span>
        </div>
      ))}

      <div style={{
        marginTop: "40px",
        padding: "25px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}>
        <h3>Check Your Eligibility</h3>
        <p>Enter your details to get a personalized migration pathway</p>

        <input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />

        <button onClick={handleSubmit} style={{
          marginTop: "15px",
          padding: "12px",
          width: "100%",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}>
          Get My Assessment
        </button>
      </div>

    </div>
  );
}
