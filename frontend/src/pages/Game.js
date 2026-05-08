import React, { useState } from 'react';
import { participateInGame } from '../api.js';
import { 
    Box, 
    Typography, 
    TextField, 
    MenuItem, 
    Select, 
    FormControl, 
    InputLabel, 
    Paper, 
    Container,
    Alert,
    CircularProgress
} from '@mui/material';

const Game = () => {
    const [prediction, setPrediction] = useState('heads');
    const [amount, setAmount] = useState(10);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePlay = async () => {
        setLoading(true);
        setMessage('');
        try {
            const res = await participateInGame(prediction, amount);
            setMessage(`Success! Result: ${res.prediction.prediction.toUpperCase()}`);
        } catch (err) {
            setMessage(`Error: ${err.message || 'Something went wrong'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ 
            minHeight: 'calc(100vh - 64px)', 
            background: 'radial-gradient(circle at top, #1e293b 0%, #0f172a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3
        }}>
            <Container maxWidth="sm">
                <Paper className="glass-card" sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h2" className="gaming-title" sx={{ mb: 4, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                        PREDICTION GAME
                    </Typography>

                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Choose Side</InputLabel>
                            <Select
                                value={prediction}
                                label="Choose Side"
                                onChange={(e) => setPrediction(e.target.value)}
                                sx={{ 
                                    color: 'white',
                                    '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--primary)' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--primary)' },
                                    '.MuiSvgIcon-root': { color: 'white' }
                                }}
                            >
                                <MenuItem value="heads">Heads</MenuItem>
                                <MenuItem value="tails">Tails</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Bet Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            variant="outlined"
                            InputProps={{
                                sx: { 
                                    color: 'white',
                                    '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--primary)' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--primary)' }
                                }
                            }}
                            InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                        />

                        <button 
                            className="neon-button" 
                            onClick={handlePlay}
                            disabled={loading}
                            style={{ width: '100%', marginTop: '10px' }}
                        >
                            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'PLACE YOUR BET'}
                        </button>

                        {message && (
                            <Alert 
                                severity={message.includes('Error') ? 'error' : 'success'}
                                sx={{ 
                                    mt: 2, 
                                    bgcolor: message.includes('Error') ? 'rgba(211, 47, 47, 0.1)' : 'rgba(46, 125, 50, 0.1)',
                                    color: 'white',
                                    border: '1px solid',
                                    borderColor: message.includes('Error') ? '#d32f2f' : '#2e7d32'
                                }}
                            >
                                {message}
                            </Alert>
                        )}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};


export default Game;
