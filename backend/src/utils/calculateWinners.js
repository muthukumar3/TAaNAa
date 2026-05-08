function calculateWinners(predictions) {
    const results = {
        heads: 0,
        tails: 0,
        totalBets: 0,
    };

    predictions.forEach(prediction => {
        if (prediction.choice === 'heads') {
            results.heads += prediction.amount;
        } else if (prediction.choice === 'tails') {
            results.tails += prediction.amount;
        }
        results.totalBets += prediction.amount;
    });

    return results;
}

function determineWinners(predictions) {
    const results = calculateWinners(predictions);
    const winners = [];
    const commissionRate = 0.1; // 10% commission
    const totalPool = results.heads + results.tails;
    const commission = totalPool * commissionRate;

    if (results.heads > results.tails) {
        const winningAmount = totalPool - commission;
        predictions.forEach(prediction => {
            if (prediction.choice === 'heads') {
                const share = (prediction.amount / results.heads) * winningAmount;
                winners.push({ userId: prediction.userId, amount: share });
            }
        });
    } else if (results.tails > results.heads) {
        const winningAmount = totalPool - commission;
        predictions.forEach(prediction => {
            if (prediction.choice === 'tails') {
                const share = (prediction.amount / results.tails) * winningAmount;
                winners.push({ userId: prediction.userId, amount: share });
            }
        });
    }

    return winners;
}

export { calculateWinners, determineWinners };