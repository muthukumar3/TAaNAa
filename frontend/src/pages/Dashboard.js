import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Box, Avatar, Button, CircularProgress } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { fetchWalletBalance } from '../api.js';

const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchWalletBalance(); 
                setBalance(data.balance);
            } catch (err) {
                setError('Failed to fetch wallet balance.');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress sx={{ color: '#00f2ff' }} />
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
            <Grid container spacing={4}>
                {/* Welcome Section */}
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, animation: 'fadeIn 0.8s ease' }}>
                        <Avatar 
                            src={user.picture} 
                            sx={{ 
                                width: 90, 
                                height: 90, 
                                mr: 3, 
                                border: '3px solid #00f2ff', 
                                boxShadow: '0 0 25px rgba(0,242,255,0.4)' 
                            }} 
                        />
                        <Box>
                            <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-1.5px', background: 'linear-gradient(to right, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Hello, {user.username.split(' ')[0]}!
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>
                                Your gaming command center is ready.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Wallet Balance Card */}
                <Grid item xs={12} md={4}>
                    <Paper className="glass-card" sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <AccountBalanceWalletIcon sx={{ color: '#00f2ff', mr: 2, fontSize: '2rem' }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Wallet Balance</Typography>
                        </Box>
                        <Typography variant="h2" sx={{ fontWeight: 800, mb: 4, color: '#00f2ff', letterSpacing: '-2px' }}>
                            ${balance.toFixed(2)}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                            <Button variant="contained" className="neon-button" sx={{ flex: 1, py: 1.5 }}>
                                Deposit
                            </Button>
                            <Button variant="outlined" sx={{ flex: 1, color: 'white', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '12px', '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,0.05)' } }}>
                                Withdraw
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Game Stats Card */}
                <Grid item xs={12} md={4}>
                    <Paper className="glass-card" sx={{ p: 4, height: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <TrendingUpIcon sx={{ color: '#7000ff', mr: 2, fontSize: '2rem' }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Performance</Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <StatItem label="Games Played" value="0" />
                            <StatItem label="Win Rate" value="0%" color="#4ade80" />
                            <StatItem label="Total Earned" value="$0.00" color="#00f2ff" />
                        </Box>
                    </Paper>
                </Grid>

                {/* Recent Activity Card */}
                <Grid item xs={12} md={4}>
                    <Paper className="glass-card" sx={{ p: 4, height: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <HistoryIcon sx={{ color: '#ff00c8', mr: 2, fontSize: '2rem' }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Recent Activity</Typography>
                        </Box>
                        <Box sx={{ opacity: 0.3, textAlign: 'center', mt: 6 }}>
                            <Typography variant="body1">No recent games detected.</Typography>
                            <Button variant="text" sx={{ mt: 2, color: '#00f2ff' }}>Join a match</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>
        </Container>
    );
};

const StatItem = ({ label, value, color = "#fff" }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5 }}>
        <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{label}</Typography>
        <Typography sx={{ fontWeight: 700, color: color, fontSize: '1.1rem' }}>{value}</Typography>
    </Box>
);

export default Dashboard;