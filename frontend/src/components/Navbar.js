import { Link, useLocation } from 'react-router-dom';
import { logout } from '../api.js';

const Navbar = () => {
    const location = useLocation();

    // Hide Navbar on the login page
    if (location.pathname === '/') {
        return null;
    }

    return (
        <nav style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-1px' }}>
                {process.env.REACT_APP_NAME || 'App'}
            </h1>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '25px', margin: 0, alignItems: 'center' }}>
                <li>
                    <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', opacity: 0.8 }}>Dashboard</Link>
                </li>
                <li>
                    <Link to="/game" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', opacity: 0.8 }}>Play Game</Link>
                </li>
                <li>
                    <button 
                        onClick={logout}
                        style={{ 
                            background: 'rgba(255,255,255,0.1)', 
                            border: '1px solid rgba(255,255,255,0.2)', 
                            color: 'white', 
                            padding: '8px 16px', 
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;