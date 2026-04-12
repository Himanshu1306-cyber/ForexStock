import React from 'react';
import {useEffect, useState} from 'react';

function useForex(symbol) {
    const [data ,setData] = useState({});
    useEffect(() => {
            const interval = setInterval(() => {
                fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=U2RYQ94C2Y9DZAND`)
                    .then(response => response.json())
                    .then((res) => setData(res))
            }, 30000);
            return () => clearInterval(interval);
    },[symbol])
    return data;

}

export default useForex;
   
    

 