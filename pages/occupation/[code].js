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

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      
      <h1>{occupation.occupation_name}</h1>

      <p><strong>ANZSCO Code:</strong> {occupation.anzsco_code}</p>

      <h2 style={{ marginTop: "30px" }}>State Availability</h2>

      {states.length === 0 && <p>No state data available</p>}

      {states.map((s) => (
        <div key={s.id} style={{
          background: "#f1f1f1",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px"
        }}>
          <strong>{s.state}</strong> → {s.visa_type} → {s.status}
        </div>
      ))}

    </div>
  );
}
