// src/aggregator.ts
import { Account, Transaction } from './models';
import { fetchAccounts, fetchTransactions } from './api';
import { aggregateAccounts } from './utils';

export async function aggregateUserAccounts(): Promise<Account[]> {
  const accounts: Account[] = [];

  try {
    // Récupérer les comptes de l'utilisateur
    const accounts = await fetchAccounts();

    // Agréger les comptes (supprimer les doublons)
    const aggregatedAccounts = aggregateAccounts(accounts);

    // Agréger les transactions pour chaque compte
    const aggregatedData: any[] = [];

    for (const account of aggregatedAccounts) {
      const accTransactions = await fetchTransactions(account.acc_number);
      
      const aggregatedAccountData = {
        acc_number: account.acc_number,
        amount: account.amount,
        transactions: accTransactions.map((transaction) => ({
          label: transaction.label,
          amount: transaction.sign === 'DBT' ? -transaction.amount : transaction.amount,
          currency: transaction.currency,
        })),
      };

      aggregatedData.push(aggregatedAccountData);
    }

    // Afficher les données agrégées
    console.log('Données agrégées :', aggregatedData);
    return aggregatedData
  } catch (error) {
    console.error('Une erreur est survenue :', error);
  }
}
