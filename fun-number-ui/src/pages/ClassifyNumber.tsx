import React, { useState } from 'react';
import './ClassifyNumber.css';


interface ClassificationResponse {
    number : number;
    is_prime : boolean;
    is_perfect: boolean;
    properties: string[];
    digit_sum: number;
    fun_fact: string;
}

const ClassifyNumber: React.FC = () => {

    const [number, setNumber] = useState<string>("");
    const [result, setResult] = useState<ClassificationResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setResult(null);
        // Do not clear the result so previous result remains visible
        setIsLoading(true);

        try {

            const response = await fetch(`https://fun-fact-apis.onrender.com?number=${number}`, { method: 'GET' });
            
            if (!response.ok) {
                const errData = await response.json();
                setError(errData.error || "An error occurred");
               
            } else {
                const data = await response.json();
                setResult(data);
            }    
        } catch (error) {
            console.log(error)
            setError("An error occurred while fetching data");
            setIsLoading(false);  
        }
        
    }

    return (
        <div className='classify-container'>
            <h2>Classify Number</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="Enter any number" value={number} onChange={(e) => setNumber(e.target.value)} required/>

                <button type="submit">
                    {isLoading ? 'Classifying...' : 'Classify'}
                </button>
            </form>

            {
                error && <p className='error'>{error}</p>
            }

            {
                result && (
                    <div className='result'>
                        <h3>Results for {result.number}</h3>
                        <p><strong>Prime:</strong> {result.is_prime ? "Yes" : "No"}</p>
                        <p><strong>Perfect:</strong> {result.is_perfect ? "Yes" : "No"}</p>
                        <p><strong>Properties:</strong> {result.properties.join(', ')}</p>
                        <p><strong>Digit Sum:</strong> {result.digit_sum}</p>
                        <p><strong>Fun Fact:</strong> {result.fun_fact}</p>
                    </div>
                )
            }

        </div>
    )
}



export default ClassifyNumber