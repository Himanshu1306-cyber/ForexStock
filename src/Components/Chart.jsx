import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useParams, useNavigate } from 'react-router-dom';

const Chart = () => {
    // useParams se symbol nikal rahe hain naye page ke liye
    const { symbol } = useParams(); 
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // URL ke '_' ko wapas '/' banao API ke liye
    const cleanSymbol = symbol ? symbol.replace('_', '/') : "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Twelve Data API call
                const response = await fetch(`https://api.twelvedata.com/time_series?symbol=${cleanSymbol}&interval=1min&apikey=d54ae7567f0a41918ac2c61e21f4216c`);
                const result = await response.json();
                
                if (result.values) {
                    // Data mapping for Recharts
                    const formatted = result.values.map(item => ({
                        displayTime: item.datetime.split(' ')[1], // Sirf time dikhane ke liye
                        actualPrice: parseFloat(item.close)      // Price ko number banaya
                    })).reverse(); // Graph ko seedha karne ke liye reverse kiya
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
            {/* Navigation back to Dashboard */}
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

            {/* Header info like Screenshot 2 */}
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>
                    {cleanSymbol} <span style={{ color: '#10b981', fontSize: '1rem' }}>LIVE ANALYSIS</span>
                </h1>
                <p style={{ color: '#888' }}>Real-time data visualization via Twelve Data Protocol.</p>
            </div>

            {/* Chart Container - Screenshot 1 Style */}
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
                ) : (
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={data}>
                            {/* Neon Glow effect like Screenshot 2 */}
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
                            {/* The Main Neon Line */}
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