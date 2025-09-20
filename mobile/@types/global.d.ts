declare global {
  type RootStackParamList = {
    Splash: undefined;
    Greet: undefined;
    CreateWallet: undefined;
    Mnemonic: undefined;
    SaveCreditCard: undefined;
    Home: undefined;
    CreditCards: undefined;
    Settings: undefined;
    CardDetails: {
      cardId: string;
      starsWith: string;
    };
  };
}

export {};