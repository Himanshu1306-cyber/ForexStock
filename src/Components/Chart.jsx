import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useParams, useNavigate } from 'react-router-dom';

const Chart = () => {
 const { symbol } = useParams(); 
const navigate = useNavigate();
 const [data, setData] = useState([]);
 const [loading, setLoading] = useState(true);

    const cleanSymbol = symbol ? symbol.replace('_', '/') : "";

useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            
            // 1. API Domain correct kiya (api.twelvedata.com)
            // 2. Apni purani working API key use karein
            const response = await fetch(
                `https://api.twelvedata.com/time_series?symbol=${cleanSymbol}&interval=1min&apikey=0a0141afeedf49a6a5d958be467e5b16`
            );

            const result = await response.json();
            
            // 3. Error checking add karein (Twelve Data API 200 OK deta hai par andar error message)
            if (result.status === "error") {
                console.error("API Error:", result.message);
                return;
            }

            if (result.values) {
                const formatted = result.values.map(item => ({
                    displayTime: item.datetime.split(' ')[1], 
                    actualPrice: parseFloat(item.close)      
                })).reverse(); 
                setData(formatted);
            }
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (cleanSymbol) fetchData();
}, [cleanSymbol]);

return (
 <div style={{ padding: '40px 20px', minHeight: '100vh', color: 'white' }}>

 <button
onClick={() => navigate('/')}
style={{
 background: 'rgba(255,255,255,0.05)',
border: '1px solid rgba(255,255,255,0.1)',
color: 'white',
 padding: '10px 20px',
 borderRadius: '12px',
 cursor: 'pointer',
 marginBottom: '30px'
 }}
 >
 ← Back to Markets
 </button>

 <div style={{ marginBottom: '40px' }}>
 <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>
 {cleanSymbol} <span style={{ color: '#10b981', fontSize: '1rem' }}>LIVE ANALYSIS</span>
 </h1>
 <p style={{ color: '#888' }}>Real-time data visualization via Twelve Data Protocol.</p>
</div>

 <div style={{
background: 'rgba(22, 27, 34, 0.6)',
padding: '30px',
 borderRadius: '24px',
 border: '1px solid rgba(255,255,255,0.05)',
 backdropFilter: 'blur(20px)'
 }}>
 {loading ? (
 <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
 <p>Syncing with Market...</p>
 </div>
) : (<ResponsiveContainer width="100%" height={400}>
 <AreaChart data={data}>
 
 <defs>
 <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis 
 dataKey="displayTime" 
 stroke="#444" 
 tick={{ fontSize: 12 }} 
 axisLine={false}
                            />
                            <YAxis 
                                domain={['auto', 'auto']} 
                                stroke="#444" 
                                tick={{ fontSize: 12 }} 
                                axisLine={false} 
                                orientation="right"
                            />
                            <Tooltip 
                                contentStyle={{ background: '#0a0a0a', border: '1px solid #333', borderRadius: '8px' }}
                                itemStyle={{ color: '#10b981' }}
                            />
                            
                            <Area 
                                type="monotone" 
                                dataKey="actualPrice" 
                                stroke="#10b981" 
                                strokeWidth={3} 
                                fillOpacity={1} 
                                fill="url(#colorPrice)" 
 animationDuration={2000}
 />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default Chart; 