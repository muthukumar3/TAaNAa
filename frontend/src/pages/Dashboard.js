import React, { useEffect, useState } from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Button, 
    CircularProgress, 
    Paper, 
    InputBase,
    Snackbar,
    Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchWalletBalance, participateInGame } from '../api.js';
import CoinHeads from '../assets/coin_heads.png';
import CoinTails from '../assets/coin_tails.png';

const Dashboard = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(30); // 30 second rounds
    const [selectedSide, setSelectedSide] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);
    const [showCelebration, setShowCelebration] = useState(false);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await fetchWalletBalance(); 
                setBalance(data.balance);
            } catch (err) {
                console.error('Failed to fetch wallet balance:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();

        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    handleRoundEnd();
                    return 30; // Reset for next round
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [selectedSide]);

    const handleRoundEnd = () => {
        // Randomly determine result for the demo
        const winSide = Math.random() > 0.5 ? 'heads' : 'tails';
        setResult(winSide);

        if (selectedSide === winSide) {
            setShowCelebration(true);
            setTimeout(() => {
                setShowCelebration(false);
                setSelectedSide(null);
                setResult(null);
            }, 3000);
        } else {
            setTimeout(() => {
                setSelectedSide(null);
                setResult(null);
            }, 2000);
        }
        
        // Refresh balance after round
        setTimeout(async () => {
            const data = await fetchWalletBalance();
            setBalance(data.balance);
        }, 1000);
    };

    const handleBet = async (side) => {
        if (selectedSide || isProcessing) return;

        try {
            setIsProcessing(true);
            // Save bet to API
            await participateInGame(side, 1);
            
            setSelectedSide(side);
            showToast(`You selected ${side.toUpperCase()} option, wait until it stops and check your luck`, 'info');
        } catch (error) {
            showToast(error.message || 'Bet failed. Check your balance.', 'error');
        } finally {
            setIsProcessing(false);
        }
    };

    const showToast = (message, severity = 'info') => {
        setToast({ open: true, message, severity });
    };

    const handleCloseToast = () => {
        setToast({ ...toast, open: false });
    };

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress sx={{ color: '#00f2ff' }} />
        </Box>
    );

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            background: 'radial-gradient(circle at top, #1e293b 0%, #0f172a 100%)',
            pt: 2,
            pb: 4,
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Flower Shower Effect (CSS particles) */}
            {showCelebration && (
                <Box className="celebration-overlay">
                    {[...Array(20)].map((_, i) => (
                        <Box key={i} className={`particle p${i}`} />
                    ))}
                    <Typography variant="h2" sx={{ 
                        color: '#ffdd00', 
                        fontWeight: 900, 
                        zIndex: 10,
                        textShadow: '0 0 30px rgba(255,221,0,0.8)',
                        animation: 'bounce 0.5s infinite'
                    }}>
                        WINNER!
                    </Typography>
                </Box>
            )}

            <Container maxWidth="xs" sx={{ px: 2 }}>
                {/* Game Container */}
                <Box className="glass-card" sx={{ p: 0, overflow: 'hidden', mb: 3 }}>
                    {/* Status Bar */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        p: 2, 
                        bgcolor: 'rgba(255,255,255,0.02)',
                        borderBottom: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>Starts at</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: 'white' }}>19:33</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>Result in</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#4ade80' }}>
                                00:{timer < 10 ? `0${timer}` : timer}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Flipping Coin Area */}
                    <Box sx={{ 
                        py: 8, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        perspective: '1000px'
                    }}>
                        <Box className={`coin-flipper ${result ? `show-${result}` : ''}`}>
                            <Box className="coin-front">
                                <img src={CoinHeads} alt="Heads" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                            </Box>
                            <Box className="coin-back">
                                <img src={CoinTails} alt="Tails" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                            </Box>
                        </Box>
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                            <Button 
                                fullWidth 
                                variant="contained" 
                                disabled={selectedSide !== null || isProcessing}
                                sx={{ 
                                    bgcolor: selectedSide === 'heads' ? '#00f2ff' : '#1e293b', 
                                    color: selectedSide === 'heads' ? '#0f172a' : 'white', 
                                    fontWeight: 800, 
                                    py: 1.5, 
                                    borderRadius: '12px',
                                    border: '1px solid #00f2ff',
                                    '&:hover': { bgcolor: '#00d8e4' },
                                    '&.Mui-disabled': { 
                                        bgcolor: selectedSide === 'heads' ? '#00f2ff' : 'rgba(255,255,255,0.05)',
                                        color: selectedSide === 'heads' ? '#0f172a' : 'rgba(255,255,255,0.2)',
                                        opacity: 1
                                    }
                                }}
                                onClick={() => handleBet('heads')}
                            >
                                {selectedSide === 'heads' ? 'SELECTED' : 'HEADS 1$'}
                            </Button>
                            <Button 
                                fullWidth 
                                variant="contained" 
                                disabled={selectedSide !== null || isProcessing}
                                sx={{ 
                                    bgcolor: selectedSide === 'tails' ? '#4ade80' : '#1e293b', 
                                    color: selectedSide === 'tails' ? '#0f172a' : 'white', 
                                    fontWeight: 800, 
                                    py: 1.5, 
                                    borderRadius: '12px',
                                    border: '1px solid #4ade80',
                                    '&:hover': { bgcolor: '#45cf77' },
                                    '&.Mui-disabled': { 
                                        bgcolor: selectedSide === 'tails' ? '#4ade80' : 'rgba(255,255,255,0.05)',
                                        color: selectedSide === 'tails' ? '#0f172a' : 'rgba(255,255,255,0.2)',
                                        opacity: 1
                                    }
                                }}
                                onClick={() => handleBet('tails')}
                            >
                                {selectedSide === 'tails' ? 'SELECTED' : 'TAILS 1$'}
                            </Button>
                        </Box>

                        <Button 
                            fullWidth 
                            variant="contained" 
                            sx={{ 
                                bgcolor: 'transparent', 
                                border: '2px solid #00f2ff', 
                                color: 'white', 
                                fontWeight: 800, 
                                py: 1.5, 
                                borderRadius: '12px',
                                '&:hover': { bgcolor: 'rgba(0, 242, 255, 0.1)' }
                            }}
                            onClick={() => navigate('/wallet')}
                        >
                            DEPOSIT / WITHDRAW
                        </Button>
                    </Box>
                </Box>

                {/* Invite Section */}
                <Box className="glass-card" sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ color: '#4ade80', fontWeight: 800, mb: 1 }}>
                        Invite Friends
                    </Typography>
                    <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', bgcolor: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                        <InputBase sx={{ ml: 1, flex: 1, color: 'white', fontSize: '0.85rem' }} value="https://headsup.app/invite/yourcode" readOnly />
                        <Button size="small" sx={{ bgcolor: 'var(--primary)', color: '#0f172a', fontWeight: 700 }} onClick={() => navigator.clipboard.writeText('https://headsup.app/invite/yourcode')}>COPY</Button>
                    </Paper>
                </Box>
            </Container>

            <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleCloseToast} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%', borderRadius: '12px' }}>
                    {toast.message}
                </Alert>
            </Snackbar>

            <style>
                {`
                .glass-card {
                    background: rgba(30, 41, 59, 0.6);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(0, 242, 255, 0.2);
                    border-radius: 28px;
                }

                .coin-flipper {
                    width: 200px; height: 200px; position: relative;
                    transform-style: preserve-3d;
                    animation: coinSpin 2s linear infinite;
                }

                .coin-flipper.show-heads { animation: none; transform: rotateY(0deg); transition: transform 0.5s ease-out; }
                .coin-flipper.show-tails { animation: none; transform: rotateY(180deg); transition: transform 0.5s ease-out; }

                .coin-front, .coin-back {
                    position: absolute; width: 100%; height: 100%;
                    backface-visibility: hidden; border-radius: 50%;
                }
                .coin-back { transform: rotateY(180deg); }

                @keyframes coinSpin {
                    from { transform: rotateY(0deg); }
                    to { transform: rotateY(360deg); }
                }

                .celebration-overlay {
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    display: flex; justify-content: center; alignItems: center;
                    background: rgba(0,0,0,0.5); z-index: 100;
                }

                .particle {
                    position: absolute; width: 10px; height: 10px; background: #ffdd00;
                    border-radius: 50%; animation: fall 3s linear infinite;
                }

                @keyframes fall {
                    0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
                }

                ${[...Array(20)].map((_, i) => `
                    .p${i} { left: ${Math.random() * 100}%; animation-delay: ${Math.random() * 2}s; background: ${['#ffdd00', '#ff00c8', '#00f2ff', '#4ade80'][i % 4]}; }
                `).join('')}

                @keyframes bounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                `}
            </style>
        </Box>
    );
};

export default Dashboard;