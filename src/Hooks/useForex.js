import { useEffect, useState, useRef } from 'react';

function useForex(symbol) {
    const [data, setData] = useState(null); 
    const [error, setError] = useState(null);
    const lastCallTime = useRef(0); // Call timing track karne ke liye

    useEffect(() => {
        const fetchData = async () => {
            const now = Date.now();
            
            // // Protection: Agar pichla call 30 sec se pehle hua hai, toh skip karo
            // if (now - lastCallTime.current < 30000 && lastCallTime.current !== 0) {
            //     console.log("Rate limit protection: Skipping fetch.");
            //     return;
            // }

            try {
                console.log("Fetching fresh data...");
                const response = await fetch(
                    `https://api.twelvedata.com/price?symbol=${symbol}&apikey=2375020159124e9a9262b4284e2c676b`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                
                if (result.status === 'error') {
                    throw new Error(result.message);
                }

                setData(result);
                setError(null);
                lastCallTime.current = Date.now(); // Time update karo
            } catch (err) {
                console.error("Failed to fetch:", err);
                setError(err.message);
            }
        };

        // Pehla call
        fetchData();

        
        const interval = setInterval(() => {
            fetchData();
        }, 30000);

        return () => clearInterval(interval);
        
    }, [symbol]); // Sirf tabhi re-run hoga jab symbol badlega

    return { data, error };
}

export default useForex;