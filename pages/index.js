export default function Home() {
  return (
    <div style={{fontFamily:'Arial', textAlign:'center', marginTop:'100px'}}>
      <h1>ANZSCO Search Platform</h1>
      <input 
        type="text" 
        placeholder="Search your occupation (e.g. Software Engineer)" 
        style={{padding:'12px', width:'300px', borderRadius:'8px', border:'1px solid #ccc'}}
      />
    </div>
  )
}
