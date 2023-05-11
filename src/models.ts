export interface Account {
    acc_number: string;
    amount: number;
    currency: string;
  }
  
  export interface Transaction {
    id: number;
    label: string;
    sign: string;
    amount: number;
    currency: string;
  }
  