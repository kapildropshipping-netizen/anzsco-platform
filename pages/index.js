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
    if (error) console.error(error);
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
        <a
          key={item.id}
          href={`/occupation/${item.anzsco_code}`}
          style={{
            display: 'block',
            background: '#fff',
            padding: '15px',
            marginBottom: '10px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'black',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}
        >
          <strong>{item.occupation_name}</strong><br />
          ANZSCO: {item.anzsco_code}
        </a>
      ))}

    </div>
  );
}
