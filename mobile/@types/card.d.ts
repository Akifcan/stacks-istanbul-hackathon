interface CardProps {
    id: number
    cardId: string
    orderLimit: number
    startsWith: string
    contractTx: string
    contractName: string
    spendAmount: number
    buyAmount: number
    createdAt: string
}

interface CardInvestData {
    type: string;
    value: Array<{
        type: string;
        value: {
            type: string;
            value: {
                amount: {
                    type: string;
                    value: string;
                };
                currentValue: {
                    type: string;
                    value: string;
                };
                spend: {
                    type: string;
                    value: string;
                };
            };
        };
    }>;
}