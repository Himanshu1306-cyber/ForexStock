import useForex from '../hooks/useForex';
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

function Dashboard() {
  const forexData = useForex("INR/USD,JPY/USD,GBP/USD,EUR/USD,BTC/USD,ETH/USD");
  const navigate = useNavigate(); 
  const [searchTerm, setSearchTerm] = useState(""); 

  
  const filteredPairs = Object.keys(forexData).filter(pair => 
    pair.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      
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
        {filteredPairs.map((pair) => (
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
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.borderColor = '#10b981';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ marginBottom: '40px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '500', color: '#fff' }}>{pair.split('/')[0]}</span>
              <span style={{ fontSize: '0.9rem', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '4px 12px', borderRadius: '20px' }}>
                ↑ Live
              </span>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#888', fontSize: '0.9rem' }}>Market Price</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '5px 0' }}>
                {forexData[pair]?.price ? parseFloat(forexData[pair].price).toFixed(4) : "---"}
              </h2>
            </div>

           
            <svg width="100" height="30" viewBox="0 0 100 30" style={{ position: 'absolute', right: '30px', bottom: '80px' }}>
              <path d="M0 20 Q 25 5, 50 20 T 100 15" fill="none" stroke="#10b981" strokeWidth="2" />
            </svg>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px', marginTop: '20px' }}>
              <span style={{ fontSize: '0.8rem', color: '#555' }}>Click to view analysis →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard; 