import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Tabs, 
    Tab, 
    TextField, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    Alert,
    AlertTitle,
    CircularProgress,
    Snackbar
} from '@mui/material';
import QRIcon from '../assets/qr_code.png';
import { 
    fetchWalletBalance, 
    depositToWallet, 
    withdrawFromWallet, 
    fetchWalletHistory 
} from '../api';

const Wallet = () => {
    const [tabValue, setTabValue] = useState(0);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    
    // Form states
    const [depositAmount, setDepositAmount] = useState('');
    const [depositRefId, setDepositRefId] = useState('');
    const [withdrawAddress, setWithdrawAddress] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');

    // History states
    const [history, setHistory] = useState([]);
    const [requests, setRequests] = useState([]);

    // Toast state
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        loadWalletData();
    }, []);

    const loadWalletData = async () => {
        try {
            setLoading(true);
            const balanceData = await fetchWalletBalance();
            setBalance(balanceData.balance);
            
            const historyData = await fetchWalletHistory();
            setHistory(historyData.history || []);
            setRequests(historyData.requests || []);
        } catch (error) {
            console.error('Failed to load wallet data:', error);
            showToast('Failed to load wallet data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const showToast = (message, severity = 'success') => {
        setToast({ open: true, message, severity });
    };

    const handleCloseToast = () => {
        setToast({ ...toast, open: false });
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleDepositSubmit = async () => {
        if (!depositAmount || !depositRefId) {
            showToast('Please fill in all fields', 'warning');
            return;
        }
        try {
            await depositToWallet(depositAmount, depositRefId);
            showToast('Deposit request submitted! It will be verified by admin.', 'success');
            setDepositAmount('');
            setDepositRefId('');
            loadWalletData();
        } catch (error) {
            showToast('Deposit failed: ' + (error.message || error), 'error');
        }
    };

    const handleWithdrawSubmit = async () => {
        if (!withdrawAmount || !withdrawAddress) {
            showToast('Please fill in all fields', 'warning');
            return;
        }
        try {
            await withdrawFromWallet(withdrawAmount, withdrawAddress);
            showToast('Withdrawal request sent successfully!', 'success');
            setWithdrawAmount('');
            setWithdrawAddress('');
            loadWalletData();
        } catch (error) {
            showToast('Withdrawal failed: ' + (error.message || error), 'error');
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress sx={{ color: 'var(--primary)' }} />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h3" sx={{ 
                    fontWeight: 800, 
                    color: 'var(--primary)',
                    textShadow: '0 0 20px rgba(0, 242, 255, 0.5)',
                    mb: 1
                }}>
                    ${balance.toFixed(2)}
                </Typography>
                <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>
                    Current Balance
                </Typography>
            </Box>

            <Box sx={{ width: '100%', mb: 4 }}>
                <Tabs 
                    value={tabValue} 
                    onChange={handleTabChange} 
                    centered
                    sx={{
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'var(--primary)',
                        },
                        '& .MuiTab-root': {
                            color: 'rgba(255,255,255,0.5)',
                            fontWeight: 600,
                            fontSize: '1rem',
                            '&.Mui-selected': {
                                color: 'var(--primary)',
                            },
                        }
                    }}
                >
                    <Tab label="Deposit" />
                    <Tab label="Withdraw" />
                </Tabs>
            </Box>

            {tabValue === 0 && (
                <Box className="glass-card" sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 800 }}>Deposit Funds</Typography>
                    
                    <Box 
                        component="img" 
                        src={QRIcon} 
                        alt="Deposit QR Code"
                        sx={{ 
                            width: 250, 
                            height: 250, 
                            borderRadius: '16px', 
                            border: '4px solid rgba(255,255,255,0.1)',
                            mb: 3,
                            p: 1,
                            background: 'white'
                        }}
                    />

                    <Alert icon={false} severity="info" sx={{ 
                        width: '100%', 
                        maxWidth: 500, 
                        mb: 4, 
                        bgcolor: 'rgba(0, 242, 255, 0.1)', 
                        color: 'var(--primary)',
                        border: '1px solid rgba(0, 242, 255, 0.2)',
                        '& .MuiAlert-message': { width: '100%' }
                    }}>
                        <AlertTitle sx={{ fontWeight: 800, mb: 1 }}>IMPORTANT NOTE</AlertTitle>
                        Please send only <strong>USDT (BEP20)</strong> to this address. Sending any other coin or using a different network may result in permanent loss of funds. 
                        After payment, enter the amount and Transaction ID (Reference ID) below.
                    </Alert>

                    <Box sx={{ width: '100%', maxWidth: 500 }}>
                        <TextField
                            fullWidth
                            label="Deposit Amount"
                            type="number"
                            variant="outlined"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            sx={{ 
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                                    '&:hover fieldset': { borderColor: 'var(--primary)' },
                                    '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
                                },
                                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
                                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary)' }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Transaction Reference ID"
                            variant="outlined"
                            value={depositRefId}
                            onChange={(e) => setDepositRefId(e.target.value)}
                            sx={{ 
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                                    '&:hover fieldset': { borderColor: 'var(--primary)' },
                                    '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
                                },
                                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
                                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary)' }
                            }}
                        />
                        <button className="neon-button" style={{ width: '100%' }} onClick={handleDepositSubmit}>
                            Submit Deposit
                        </button>
                    </Box>

                    <Box sx={{ width: '100%', mt: 6 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Request History</Typography>
                        <TableContainer component={Paper} sx={{ bgcolor: 'transparent', backgroundImage: 'none', boxShadow: 'none' }}>
                            <Table sx={{ '& .MuiTableCell-root': { color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.1)' } }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 800 }}>Date</TableCell>
                                        <TableCell sx={{ fontWeight: 800 }}>Type</TableCell>
                                        <TableCell sx={{ fontWeight: 800 }}>Amount</TableCell>
                                        <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {requests.map((row) => (
                                        <TableRow key={row._id}>
                                            <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell sx={{ textTransform: 'capitalize' }}>{row.type}</TableCell>
                                            <TableCell>{row.amount} USDT</TableCell>
                                            <TableCell sx={{ 
                                                color: row.status === 'completed' ? '#4caf50' : 
                                                       row.status === 'failed' || row.status === 'canceled' ? '#f44336' : '#ff9800',
                                                textTransform: 'capitalize'
                                            }}>{row.status}</TableCell>
                                        </TableRow>
                                    ))}
                                    {requests.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">No requests found</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            )}

            {tabValue === 1 && (
                <Box className="glass-card" sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ mb: 4, fontWeight: 800 }}>Withdraw Funds</Typography>
                    
                    <Box sx={{ width: '100%', maxWidth: 500 }}>
                        <TextField
                            fullWidth
                            label="Withdraw Amount"
                            type="number"
                            variant="outlined"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            sx={{ 
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                                    '&:hover fieldset': { borderColor: 'var(--primary)' },
                                    '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
                                },
                                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
                                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary)' }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Wallet Address (BEP20)"
                            variant="outlined"
                            value={withdrawAddress}
                            onChange={(e) => setWithdrawAddress(e.target.value)}
                            sx={{ 
                                mb: 4,
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                                    '&:hover fieldset': { borderColor: 'var(--secondary)' },
                                    '&.Mui-focused fieldset': { borderColor: 'var(--secondary)' },
                                },
                                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
                                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--secondary)' }
                            }}
                        />
                        <button 
                            className="neon-button" 
                            style={{ width: '100%', background: 'linear-gradient(45deg, var(--secondary), var(--accent))', boxShadow: '0 0 20px rgba(112, 0, 255, 0.3)' }} 
                            onClick={handleWithdrawSubmit}
                        >
                            Send Request
                        </button>
                    </Box>

                    <Box sx={{ width: '100%', mt: 6 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Withdrawal History</Typography>
                        <TableContainer component={Paper} sx={{ bgcolor: 'transparent', backgroundImage: 'none', boxShadow: 'none' }}>
                            <Table sx={{ '& .MuiTableCell-root': { color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.1)' } }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 800 }}>Date</TableCell>
                                        <TableCell sx={{ fontWeight: 800 }}>Amount</TableCell>
                                        <TableCell sx={{ fontWeight: 800 }}>Wallet Address</TableCell>
                                        <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {requests.filter(r => r.type === 'withdraw').map((row) => (
                                        <TableRow key={row._id}>
                                            <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell>{row.amount} USDT</TableCell>
                                            <TableCell sx={{ 
                                                maxWidth: 150, 
                                                overflow: 'hidden', 
                                                textOverflow: 'ellipsis', 
                                                whiteSpace: 'nowrap' 
                                            }}>{row.walletAddress}</TableCell>
                                            <TableCell sx={{ 
                                                color: row.status === 'completed' ? '#4caf50' : 
                                                       row.status === 'failed' || row.status === 'canceled' ? '#f44336' : '#ff9800',
                                                textTransform: 'capitalize'
                                            }}>{row.status}</TableCell>
                                        </TableRow>
                                    ))}
                                    {requests.filter(r => r.type === 'withdraw').length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">No withdrawal requests found</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            )}

            <Snackbar 
                open={toast.open} 
                autoHideDuration={6000} 
                onClose={handleCloseToast}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%', borderRadius: '12px' }}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Wallet;
