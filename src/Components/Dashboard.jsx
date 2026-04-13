import useForex from '../hooks/useForex';
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

function Dashboard() {
  // 1. Destructure data and error from the hook
  const { data, error } = useForex("INR/USD,JPY/USD,BTC/USD,ETH/USD");
  const navigate = useNavigate(); 
  const [searchTerm, setSearchTerm] = useState(""); 

  // 2. Safe check: If data is null yet, use an empty object
  const pairs = data ? Object.keys(data) : [];
  
  const filteredPairs = pairs.filter(pair => 
    pair.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. Optional: Handle Error state
  if (error) return <div style={{color: 'white', padding: '50px'}}>Error: {error}</div>;

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
      
      <div style={{ marginBottom: '60px', textAlign: 'left' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', letterSpacing: '-2px', margin: 0 }}>
          THE PEOPLE’S <br /> <span style={{ color: '#10b981' }}>STOCK MARKET</span>
        </h1>
        <p style={{ color: '#888', maxWidth: '400px', marginTop: '20px' }}>
          Real-time forex tracking with decentralized precision. No banks, just pure data.
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <input 
          type="text" 
          placeholder="Search Currency Pairs (e.g. INR/USD)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '15px 25px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '1rem',
            outline: 'none',
            backdropFilter: 'blur(10px)'
          }}
        />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '25px' 
      }}>
        {filteredPairs.length > 0 ? filteredPairs.map((pair) => (
          <div 
            key={pair}
            onClick={() => navigate(`/chart/${pair.replace('/', '_')}`)} 
            style={{ 
              cursor: 'pointer',
              background: 'rgba(22, 27, 34, 0.8)',
              padding: '30px',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.borderColor = '#10b981';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
            }}
          >
            <div style={{ marginBottom: '40px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '500', color: '#fff' }}>{pair}</span>
              <span style={{ marginLeft: '10px', fontSize: '0.9rem', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '4px 12px', borderRadius: '20px' }}>
                ↑ Live
              </span>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#888', fontSize: '0.9rem' }}>Market Price</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '5px 0' }}>
                {/* 4. Use 'pair' to access the data, and check if it exists */}
                {data[pair]?.price ? parseFloat(data[pair].price).toFixed(4) : "---"}
              </h2>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px', marginTop: '20px' }}>
              <span style={{ fontSize: '0.8rem', color: '#555' }}>Click to view analysis →</span>
            </div>
          </div>
        )) : (
          <p style={{ color: '#555' }}>Loading market data...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;