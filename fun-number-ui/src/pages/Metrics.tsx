import React, { useState, useEffect } from 'react';
import './Metrics.css';

const Metrics: React.FC = () => {

    const [metricss, setMetricss] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>('');

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await fetch('http://localhost:5000/metrics');
                if(!res.ok) {
                    throw new Error('Failed to fetch metrics');
                }
                const data = await res.text();
                setMetricss(data);
                setLoading(false);
                console.log(data)
            } catch (error) {
                setError('Error fetching metrics');
                setLoading(false);
            }
        }

        fetchMetrics();
    }, []);


  return (
    <div className='metrics-container'>
        <h2>Performance Metrics</h2>
        {loading && <p>Loading metric...</p>}
        {error && <p className='error'>{error}</p>}
        {
            !loading && !error && (
                <pre className='metrics-display'>{metricss}</pre>
            )
        }

    </div>
  )
}

export default Metrics