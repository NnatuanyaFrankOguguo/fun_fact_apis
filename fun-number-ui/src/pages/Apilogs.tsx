import React, { useEffect, useState } from 'react'
import './apiLogs.css'

interface LogResponse {
  logs: string
}

const Apilogs: React.FC = () => {

  const [logs, setLogs] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/logs');
        if (!res.ok){
          throw new Error('Failed to fetch logs');
        }

        const data: LogResponse = await res.json();
        setLogs(data.logs)
        console.log(data.logs)
        setLoading(false);
      } catch (error) {
        setError('Error fetching logs')
        setLoading(false);
        
      }
    };

    fetchLogs();
  }, [])


  return (
    <div className='logs-container'>
      <h2>API Logs</h2>
        {loading && <p>Loading logs...</p>}
        {error && <p className='error'>{error}</p>}
        {!loading && !error && (
          <pre className='logs-display'>{logs}</pre>
        )}
    </div>
  )
}

export default Apilogs