export interface WalletBalance {
  balance: number;
  usd: string;
}

export interface CreateAccountResponse {
  address: string;
  mnemonic: string;
}

export interface SaveCardResponse {
  contract: string;
  cardId: string;
}

export interface Transaction {
  id: number;
  transactionId: string;
  date: string;
  description: string;
  merchantName: string;
  amount: string;
  currency: string;
  category: string;
  type: string;
  status: string;
  card: {
    id: number;
    cardId: string;
    orderLimit: number;
    startsWith: string;
    contractTx: string;
    contractName: string;
    spendAmount: number;
    buyAmount: number;
    createdAt: string;
  };
  createdAt: string;
}

export interface Invest {
  id: number;
  spent: number;
  bougth: number;
  transaction: string;
  createdAt: string;
}