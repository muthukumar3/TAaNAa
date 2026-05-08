import React, { useState } from 'react';
import { Box, Container, Typography, Snackbar, Alert } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle } from '../api.js';
import gamingBg from '../assets/gaming_bg.png';

const Home = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSuccess = async (credentialResponse) => {
        try {
            await loginWithGoogle(credentialResponse.credential);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login Failed:', error);
            setError(typeof error === 'string' ? error : error.message || 'Login failed. Please try again.');
        }
    };

    const handleCloseError = () => {
        setError(null);
    };

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                backgroundImage: `url(${gamingBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.8) 100%)',
                    zIndex: 1
                }
            }}
        >
            <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
                <Box
                    className="glass-card"
                    sx={{
                        p: { xs: 4, md: 8 },
                        textAlign: 'center',
                        animation: 'fadeInUp 1s ease-out'
                    }}
                >
                    <Typography 
                        variant="h1" 
                        className="gaming-title"
                        sx={{ fontSize: { xs: '3.5rem', md: '5rem' } }}
                    >
                        {process.env.REACT_APP_NAME || 'App'}
                    </Typography>
                    
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            color: 'rgba(255,255,255,0.7)', 
                            mb: 6, 
                            fontWeight: 400,
                            letterSpacing: '2px',
                            fontSize: '0.9rem'
                        }}
                    >
                        PREDICT THE OUTCOME. WIN THE GAME.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={() => setError('Google Authentication Failed')}
                            useOneTap
                            theme="filled_blue"
                            shape="pill"
                            size="large"
                        />
                    </Box>

                    <Typography 
                        variant="body2" 
                        sx={{ 
                            mt: 6, 
                            color: 'rgba(255,255,255,0.3)',
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            letterSpacing: '3px'
                        }}
                    >
                        Join 10,000+ players worldwide
                    </Typography>
                </Box>
            </Container>

            <Snackbar 
                open={!!error} 
                autoHideDuration={6000} 
                onClose={handleCloseError}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%', borderRadius: '12px' }}>
                    {error}
                </Alert>
            </Snackbar>

            <style>
                {`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>
        </Box>
    );
};

export default Home;