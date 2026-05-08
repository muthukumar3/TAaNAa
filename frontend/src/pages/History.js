import React from 'react';
import { Box, Typography, Paper, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const History = () => {
    // Mock data for now
    const history = [
        { id: 1, date: '2026-05-08', bet: 'Heads', amount: 10, result: 'Win' },
        { id: 2, date: '2026-05-07', bet: 'Tails', amount: 20, result: 'Loss' },
    ];

    return (
        <Box sx={{ 
            minHeight: 'calc(100vh - 64px)', 
            background: 'radial-gradient(circle at top, #1e293b 0%, #0f172a 100%)',
            p: 3
        }}>
            <Container maxWidth="md">
                <Paper className="glass-card" sx={{ p: 4 }}>
                    <Typography variant="h3" className="gaming-title" sx={{ mb: 4, fontSize: '2.5rem' }}>
                        GAME HISTORY
                    </Typography>
                    
                    <TableContainer component={Box}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: 'var(--primary)', fontWeight: 'bold' }}>Date</TableCell>
                                    <TableCell sx={{ color: 'var(--primary)', fontWeight: 'bold' }}>Bet</TableCell>
                                    <TableCell sx={{ color: 'var(--primary)', fontWeight: 'bold' }}>Amount</TableCell>
                                    <TableCell sx={{ color: 'var(--primary)', fontWeight: 'bold' }}>Result</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {history.map((row) => (
                                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell sx={{ color: 'white' }}>{row.date}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{row.bet}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>${row.amount}</TableCell>
                                        <TableCell sx={{ 
                                            color: row.result === 'Win' ? '#4caf50' : '#f44336',
                                            fontWeight: 'bold'
                                        }}>
                                            {row.result}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </Box>
    );
};

export default History;
