import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [occupations, setOccupations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOccupations();
  }, []);

  async function fetchOccupations() {
    const { data, error } = await supabase
      .from("occupations")
      .select("*");

    if (data) setOccupations(data);
  }

  const filtered = occupations.filter((item) =>
    item.occupation_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      fontFamily: 'Arial',
      background: '#f9fafb',
      minHeight: '100vh',
      padding: '40px'
    }}>
      
      <h1>ANZSCO Intelligence Platform</h1>

      <input
        type="text"
        placeholder="Search occupation..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '12px',
          width: '300px',
          marginTop: '20px',
          marginBottom: '20px'
        }}
      />

     {filtered.map((item) => (
  <div
    key={item.id}
    onClick={() => window.location.href = `/occupation/${item.anzsco_code}`}
    style={{
      background: '#fff',
      padding: '15px',
      marginBottom: '10px',
      borderRadius: '8px',
      cursor: 'pointer'
    }}
  >
          background: '#fff',
          padding: '15px',
          marginBottom: '10px',
          borderRadius: '8px'
        }}>
          <strong>{item.occupation_name}</strong><br />
          ANZSCO: {item.anzsco_code}
        </div>
      ))}
    </div>
  );
}
