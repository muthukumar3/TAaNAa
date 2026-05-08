import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Menu, MenuItem, IconButton, Typography, Box } from '@mui/material';
import { logout } from '../api.js';

const Navbar = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

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
            background: 'rgba(15, 23, 42, 0.8)', 
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ p: 0 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar 
                        sx={{ 
                            width: 40, 
                            height: 40, 
                            border: '2px solid var(--primary)',
                            background: 'linear-gradient(45deg, var(--primary), var(--secondary))'
                        }}
                        src="/placeholder-user.png" // Fallback to initial if image fails
                    >
                        U
                    </Avatar>
                </IconButton>
                <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.5px', color: 'white' }}>
                    {process.env.REACT_APP_NAME || 'HeadsUp'}
                </h1>
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
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        bgcolor: 'rgba(30, 41, 59, 0.95)',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        '& .MuiMenuItem-root': {
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            px: 2,
                            py: 1,
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => handleMenuAction('/dashboard')}>Dashboard</MenuItem>
                <MenuItem onClick={() => handleMenuAction('/history')}>Game history</MenuItem>
                <MenuItem 
                    onClick={() => handleMenuAction('logout')}
                    sx={{ color: '#ff4d4d', fontWeight: '600 !important' }}
                >
                    Logout
                </MenuItem>
            </Menu>
        </nav>
    );
};


export default Navbar;