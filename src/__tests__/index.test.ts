import { expect } from 'chai';
import { aggregateUserAccounts } from '../aggregator';
import { fetchAccounts, fetchTransactions } from '../api';

describe('API Tests', () => {
  it('should fetch accounts successfully', async () => {
    const accounts = await fetchAccounts();

    expect(accounts).to.be.an('array');
    expect(accounts).to.have.length.above(0);
  });

  it('should fetch transactions successfully', async () => {
    const accNumber = '0000001';
    const transactions = await fetchTransactions(accNumber);

    expect(transactions).to.be.an('array');
    expect(transactions).to.have.length.above(0);
  });
});


describe('Aggregator Tests', () => {
  it('should aggregate user accounts successfully', async () => {
    const aggregatedAccounts = await aggregateUserAccounts();

    expect(aggregatedAccounts).to.be.an('array');
    expect(aggregatedAccounts).to.have.length.above(0);
  });
});

