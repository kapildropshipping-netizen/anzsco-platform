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

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      
      <h1>{occupation.occupation_name}</h1>

      <p><strong>ANZSCO Code:</strong> {occupation.anzsco_code}</p>

      <h2 style={{ marginTop: "30px" }}>State Availability</h2>

      {states.length === 0 && <p>No state data available</p>}

      {states.map((s) => {
        // 🔥 Flexible mapping (handles any column name)
        const state = s.state || s.state_name || "N/A";
        const visa = s.visa_type || s.visa || "N/A";
        const status = s.status || "Unknown";

        return (
          <div key={s.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            background: '#fff',
            padding: '12px',
            marginBottom: '10px',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}>
            
            <span><strong>{state}</strong></span>

            <span>{visa}</span>

            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor:
                  status === 'Open'
                    ? 'green'
                    : status === 'Limited'
                    ? 'orange'
                    : 'red'
              }}></span>

              <span>{status}</span>

            </span>

          </div>
        );
      })}

    </div>
  );
}
