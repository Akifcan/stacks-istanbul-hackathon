interface SpendingItemData {
    id: string;
    merchant: string;
    amount: number;
    date: string;
    category: string;
    cardInfo?: {
        cardId: string;
        startsWith: string;
    };
}