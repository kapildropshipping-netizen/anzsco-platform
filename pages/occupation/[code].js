import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function OccupationPage() {
  const router = useRouter();
  const { code } = router.query;

  const [occupation, setOccupation] = useState(null);
  const [states, setStates] = useState([]);

  useEffect(() => {
    if (code) {
      fetchOccupation();
      fetchStates();
    }
  }, [code]);

  async function fetchOccupation() {
    const { data, error } = await supabase
      .from("occupations")
      .select("*")
      .eq("anzsco_code", code)
      .single();

    if (data) setOccupation(data);
    if (error) console.error(error);
  }

  async function fetchStates() {
    const { data, error } = await supabase
      .from("state_mapping")
      .select("*")
      .eq("anzsco_code", code);

    if (data) setStates(data);
    if (error) console.error(error);
  }

  if (!occupation) return <p>Loading...</p>;

  // 🔥 Flexible mapping
  const normalizedStates = states.map((s) => ({
    id: s.id,
    state: s.state || s.state_name || "N/A",
    visa: s.visa_type || s.visa || "N/A",
    status: s.status || "Unknown",
  }));

  // 🔥 Sort states (Open → Limited → Closed)
  const sortedStates = normalizedStates.sort((a, b) => {
    const order = { Open: 1, Limited: 2, Closed: 3 };
    return order[a.status] - order[b.status];
  });

  // 🔥 Best option
  const bestState =
    sortedStates.find((s) => s.status === "Open") || sortedStates[0];

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", background: "#f9fafb", minHeight: "100vh" }}>
      
      <h1>{occupation.occupation_name}</h1>
      <p><strong>ANZSCO Code:</strong> {occupation.anzsco_code}</p>

      {/* ⭐ BEST OPTION */}
      {bestState && (
        <div style={{
          background: "#e6f7ec",
          padding: "15px",
          borderRadius: "8px",
          marginTop: "20px",
          marginBottom: "20px"
        }}>
          <strong>⭐ Best Option:</strong> {bestState.state} → {bestState.visa} ({bestState.status})
        </div>
      )}

      <h2 style={{ marginTop: "20px" }}>State Availability</h2>

      {sortedStates.length === 0 && <p>No state data available</p>}

      {sortedStates.map((s) => (
        <div key={s.id} style={{
          display: "flex",
          justifyContent: "space-between",
          background: "#fff",
          padding: "12px",
          marginBottom: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
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

      {/* 🚀 CTA */}
      <div style={{
        marginTop: "30px",
        padding: "20px",
        background: "#fff",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
      }}>
        <h3>Check Your Eligibility</h3>
        <p>Get expert guidance for your migration pathway</p>

        <button style={{
          padding: "12px 20px",
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}>
          Book Consultation
        </button>
      </div>

    </div>
  );
}
