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