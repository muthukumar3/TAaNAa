import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Avatar, 
    Menu, 
    MenuItem, 
    IconButton, 
    Typography, 
    Box, 
    ListItemIcon,
    Tooltip,
    Divider
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout, fetchWalletBalance } from '../api.js';

const Navbar = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [balance, setBalance] = useState(0);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const loadBalance = async () => {
            try {
                const data = await fetchWalletBalance();
                setBalance(data.balance);
            } catch (err) {
                console.error('Failed to fetch balance:', err);
            }
        };

        if (localStorage.getItem('token')) {
            loadBalance();
            const interval = setInterval(loadBalance, 30000); 
            return () => clearInterval(interval);
        }
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuAction = (path) => {
        handleClose();
        if (path === 'logout') {
            logout();
        } else {
            navigate(path);
        }
    };

    return (
        <nav style={{ 
            padding: '12px 24px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            background: 'rgba(15, 23, 42, 0.9)', 
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(0, 242, 255, 0.2)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Tooltip title="Account Settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ 
                            p: 0,
                            border: '2px solid transparent',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                border: '2px solid var(--primary)',
                            }
                        }}
                    >
                        <Avatar 
                            sx={{ 
                                width: 42, 
                                height: 42, 
                                background: 'linear-gradient(45deg, var(--primary), var(--secondary))',
                                border: '2px solid rgba(255,255,255,0.1)'
                            }}
                        >
                            U
                        </Avatar>
                    </IconButton>
                </Tooltip>
                <Typography variant="h5" sx={{ 
                    margin: 0, 
                    fontWeight: 800, 
                    letterSpacing: '-1px', 
                    color: 'white',
                    display: { xs: 'none', sm: 'block' }
                }}>
                    {process.env.REACT_APP_NAME || 'HeadsUp'}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {localStorage.getItem('token') && (
                    <Box sx={{ 
                        bgcolor: 'rgba(0, 242, 255, 0.1)', 
                        border: '1px solid rgba(0, 242, 255, 0.5)', 
                        borderRadius: '24px', 
                        px: 2, 
                        py: 0.7,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            bgcolor: 'rgba(0, 242, 255, 0.2)',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 0 15px rgba(0, 242, 255, 0.3)'
                        }
                    }}
                    onClick={() => navigate('/wallet')}
                    >
                        <AccountBalanceWalletIcon sx={{ color: '#00f2ff', fontSize: '1.2rem' }} />
                        <Typography sx={{ color: '#00f2ff', fontWeight: 800, fontSize: '1.1rem' }}>
                            ${balance.toFixed(2)}
                        </Typography>
                    </Box>
                )}
            </Box>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.5))',
                        mt: 1.5,
                        bgcolor: 'rgba(15, 23, 42, 0.95)',
                        color: 'white',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        minWidth: '200px',
                        '& .MuiMenuItem-root': {
                            fontSize: '1rem',
                            fontWeight: 500,
                            px: 2,
                            py: 1.5,
                            gap: 1.5,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                bgcolor: 'rgba(0, 242, 255, 0.1)',
                                color: '#00f2ff',
                                '& .MuiListItemIcon-root': {
                                    color: '#00f2ff',
                                }
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => handleMenuAction('/dashboard')}>
                    <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 'auto !important' }}>
                        <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    Dashboard
                </MenuItem>
                <MenuItem onClick={() => handleMenuAction('/history')}>
                    <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 'auto !important' }}>
                        <HistoryIcon fontSize="small" />
                    </ListItemIcon>
                    Game history
                </MenuItem>
                <MenuItem onClick={() => handleMenuAction('/wallet')}>
                    <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 'auto !important' }}>
                        <WalletIcon fontSize="small" />
                    </ListItemIcon>
                    Wallet
                </MenuItem>
                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.05)', my: '4px !important' }} />
                <MenuItem 
                    onClick={() => handleMenuAction('logout')}
                    sx={{ color: '#ff4d4d !important' }}
                >
                    <ListItemIcon sx={{ color: '#ff4d4d !important', minWidth: 'auto !important' }}>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </nav>
    );
};

export default Navbar;