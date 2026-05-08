import React, { useState } from 'react';
import axios from 'axios';

const Game = () => {
    const [prediction, setPrediction] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handlePredictionChange = (event) => {
        setPrediction(event.target.value);
    };

    const submitPrediction = async () => {
        if (!prediction) {
            setError('Please select heads or tails.');
            return;
        }

        try {
            const response = await axios.post('/api/game/predict', { prediction });
            setResult(response.data);
            setError('');
        } catch (err) {
            setError('Error submitting prediction. Please try again.');
        }
    };

    return (
        <div className="game-container">
            <h2>Prediction Game</h2>
            <div>
                <button onClick={() => setPrediction('heads')}>Heads</button>
                <button onClick={() => setPrediction('tails')}>Tails</button>
            </div>
            <button onClick={submitPrediction}>Submit Prediction</button>
            {error && <p className="error">{error}</p>}
            {result && <p className="result">Result: {result}</p>}
        </div>
    );
};

export default Game;