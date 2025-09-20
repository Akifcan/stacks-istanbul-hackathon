interface WalletProps {
    balance: string
    usd: string
}

interface WalletBalance {
  balance: number;
  usd: string;
}

interface CreateAccountResponse {
  address: string;
  mnemonic: string;
}

interface SaveCardResponse {
  contract: string;
  cardId: string;
}

interface Transaction {
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

interface Invest {
  id: number;
  spent: number;
  bougth: number;
  transaction: string;
  createdAt: string;
}