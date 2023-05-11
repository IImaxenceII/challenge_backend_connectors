import { expect } from 'chai';
import { aggregateUserAccounts } from '../aggregator';

describe('Aggregator Tests', () => {
  it('should aggregate user accounts successfully', async () => {
    const aggregatedAccounts = await aggregateUserAccounts();

    expect(aggregatedAccounts).to.be.an('array');
    expect(aggregatedAccounts).to.have.length.above(0);
  });
});
