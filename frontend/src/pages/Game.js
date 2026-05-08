import React, { useState } from 'react';
import { participateInGame } from '../api.js';

const Game = () => {
    const [prediction, setPrediction] = useState('heads');
    const [amount, setAmount] = useState(10);
    const [message, setMessage] = useState('');

    const handlePlay = async () => {
        try {
            const res = await participateInGame(prediction, amount);
            setMessage(`Success! Prediction: ${res.prediction.prediction}`);
        } catch (err) {
            setMessage(`Error: ${err}`);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Prediction Game</h1>
            <div>
                <label>Choose: </label>
                <select value={prediction} onChange={(e) => setPrediction(e.target.value)}>
                    <option value="heads">Heads</option>
                    <option value="tails">Tails</option>
                </select>
            </div>
            <div style={{ marginTop: '10px' }}>
                <label>Amount: </label>
                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                />
            </div>
            <button 
                onClick={handlePlay}
                style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
            >
                Place Bet
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Game;
