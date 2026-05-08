import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create an axios instance with the token in headers
const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Authentication API
export const loginWithGoogle = async (idToken) => {
    try {
        const response = await api.post('/auth/sso-login', { idToken });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
};

// Wallet API
export const fetchWalletBalance = async () => {
    try {
        const response = await api.get('/wallet/balance');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const depositToWallet = async (amount) => {
    try {
        const response = await api.post('/wallet/deposit', { amount });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Prediction Game API
export const participateInGame = async (prediction, amount) => {
    try {
        const response = await api.post('/game/participate', { prediction, amount });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const fetchGameResults = async () => {
    try {
        const response = await api.get('/game/results');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export default api;