import { config } from 'dotenv';
import { Account, Transaction } from './models'

config();

const BASE_URL = process.env.BASE_URL
const API_KEY = process.env.API_KEY;

// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;

interface RequestOptions {
    method: string;
    headers: {
        'Content-Type': string;
        'X-API-KEY': string
    };
    
}


export async function fetchAPI(endpoint: string, options: RequestOptions) {
    const url = `${BASE_URL}/${endpoint}`;

    const requestOptions: RequestInit = {
        method: options.method,
        headers: options.headers,
        
    };

    try {
        const response = await fetch(url, requestOptions);
        const responseData = await response.json()
        // const responseHeaders = await response.headers
        return responseData;        
    } catch (error) {
        throw new Error('Une erreur s\'est produite lors de la requete: '+ error);
    }
}

export const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'X-API-KEY': `${API_KEY}`
    }
}

const authenticate = async (): Promise<string> => {
    if (!API_KEY) {
        throw new Error('API KEY not defined or invalid');
    }
    return API_KEY;
}

export const fetchAccounts = async (): Promise<Account[]> => {
    const apiKey = await authenticate();
  
    const accounts: Account[] = [];
    let shouldContinue = true  
    let nextPage = `${BASE_URL}/accounts?page=1`;
  
    while (nextPage && shouldContinue) {
      const response = await fetch(nextPage, {
        headers: {
          'X-API-Key': apiKey,
        },
      });
      try {
        const data = await response.json();
        
    
        if (!response.ok) {
          throw new Error(data.message);
        }
        if (data.accounts && data.accounts.length > 0) {
            accounts.push(...data.accounts);
        } 
        else {
            shouldContinue = false
        }
    
        nextPage = `${BASE_URL}${data.links?.next}` || '';
        
      } catch (error) {
        return accounts
        
      }
  
    }
  
    return accounts;
};
  
  
  

export const fetchTransactions = async (accNumber: string): Promise<Transaction[]> => {
const apiKey = await authenticate();

const transactions: any[] = [];

let nextPage = `${BASE_URL}/accounts/${accNumber}/transactions?page=1`;

while (nextPage) {
    const response = await fetch(nextPage, {
    headers: {
        'X-API-Key': apiKey,
    },
    });

    try {
        const data = await response.json();
        // console.log(data)
        if (!response.ok) {
        throw new Error(data.message);
        }
    
        transactions.push(...data.transactions);
    
        nextPage = `${BASE_URL}${data.links?.next}`
        
    } catch (error) {
        return transactions
        
    }

}

return transactions;
};