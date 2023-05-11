"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.fetchTransactions = exports.fetchAccounts = exports.getHeaders = exports.fetchAPI = void 0;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var BASE_URL = process.env.BASE_URL;
var API_KEY = process.env.API_KEY;
function fetchAPI(endpoint, options) {
    return __awaiter(this, void 0, void 0, function () {
        var url, requestOptions, response, responseData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "".concat(BASE_URL, "/").concat(endpoint);
                    requestOptions = {
                        method: options.method,
                        headers: options.headers
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url, requestOptions)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()
                        // const responseHeaders = await response.headers
                    ];
                case 3:
                    responseData = _a.sent();
                    // const responseHeaders = await response.headers
                    return [2 /*return*/, responseData];
                case 4:
                    error_1 = _a.sent();
                    throw new Error('Une erreur s\'est produite lors de la requete: ' + error_1);
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.fetchAPI = fetchAPI;
var getHeaders = function () {
    return {
        'Content-Type': 'application/json',
        'X-API-KEY': "".concat(API_KEY)
    };
};
exports.getHeaders = getHeaders;
var authenticate = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!API_KEY) {
            throw new Error('API KEY not defined or invalid');
        }
        return [2 /*return*/, API_KEY];
    });
}); };
var fetchAccounts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, accounts, shouldContinue, nextPage, response, data, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, authenticate()];
            case 1:
                apiKey = _b.sent();
                accounts = [];
                shouldContinue = true;
                nextPage = "".concat(BASE_URL, "/accounts?page=1");
                _b.label = 2;
            case 2:
                if (!(nextPage && shouldContinue)) return [3 /*break*/, 8];
                return [4 /*yield*/, fetch(nextPage, {
                        headers: {
                            'X-API-Key': apiKey
                        }
                    })];
            case 3:
                response = _b.sent();
                _b.label = 4;
            case 4:
                _b.trys.push([4, 6, , 7]);
                return [4 /*yield*/, response.json()];
            case 5:
                data = _b.sent();
                if (!response.ok) {
                    throw new Error(data.message);
                }
                if (data.accounts && data.accounts.length > 0) {
                    accounts.push.apply(accounts, data.accounts);
                }
                else {
                    shouldContinue = false;
                }
                nextPage = "".concat(BASE_URL).concat((_a = data.links) === null || _a === void 0 ? void 0 : _a.next) || '';
                return [3 /*break*/, 7];
            case 6:
                error_2 = _b.sent();
                return [2 /*return*/, accounts];
            case 7: return [3 /*break*/, 2];
            case 8: return [2 /*return*/, accounts];
        }
    });
}); };
exports.fetchAccounts = fetchAccounts;
var fetchTransactions = function (accNumber) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, transactions, nextPage, response, data, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, authenticate()];
            case 1:
                apiKey = _b.sent();
                transactions = [];
                nextPage = "".concat(BASE_URL, "/accounts/").concat(accNumber, "/transactions?page=1");
                _b.label = 2;
            case 2:
                if (!nextPage) return [3 /*break*/, 8];
                return [4 /*yield*/, fetch(nextPage, {
                        headers: {
                            'X-API-Key': apiKey
                        }
                    })];
            case 3:
                response = _b.sent();
                _b.label = 4;
            case 4:
                _b.trys.push([4, 6, , 7]);
                return [4 /*yield*/, response.json()];
            case 5:
                data = _b.sent();
                // console.log(data)
                if (!response.ok) {
                    throw new Error(data.message);
                }
                transactions.push.apply(transactions, data.transactions);
                nextPage = "".concat(BASE_URL).concat((_a = data.links) === null || _a === void 0 ? void 0 : _a.next);
                return [3 /*break*/, 7];
            case 6:
                error_3 = _b.sent();
                return [2 /*return*/, transactions];
            case 7: return [3 /*break*/, 2];
            case 8: return [2 /*return*/, transactions];
        }
    });
}); };
exports.fetchTransactions = fetchTransactions;
