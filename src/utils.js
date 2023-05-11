"use strict";
exports.__esModule = true;
exports.aggregateTransactions = exports.aggregateAccounts = void 0;
var aggregateAccounts = function (accounts) {
    var accountMap = new Map();
    for (var _i = 0, accounts_1 = accounts; _i < accounts_1.length; _i++) {
        var account = accounts_1[_i];
        accountMap.set(account.acc_number, account);
    }
    return Array.from(accountMap.values());
};
exports.aggregateAccounts = aggregateAccounts;
var aggregateTransactions = function (transactions) {
    var transactionMap = new Map();
    for (var _i = 0, transactions_1 = transactions; _i < transactions_1.length; _i++) {
        var transaction = transactions_1[_i];
        transactionMap.set(transaction.id, transaction);
    }
    return Array.from(transactionMap.values());
};
exports.aggregateTransactions = aggregateTransactions;
