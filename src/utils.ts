import { Account, Transaction } from "./models";

export const aggregateAccounts = (accounts: any[]): Account[] => {
    const accountMap = new Map();
  
    for (const account of accounts) {
      accountMap.set(account.acc_number, account);
    }
  
    return Array.from(accountMap.values());
};
  
export const aggregateTransactions = (transactions: any[]): Transaction[] => {
const transactionMap = new Map();

for (const transaction of transactions) {
    transactionMap.set(transaction.id, transaction);
}

return Array.from(transactionMap.values());
};
  