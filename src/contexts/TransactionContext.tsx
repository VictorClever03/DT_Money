/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";
interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}
interface TransactionContextType {
  transactions: Transaction[];
  // 1 query
  loadTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // 2 as properties
  async function loadTransactions(query?: string) {
   const response = await api.get('/transactions',{
    params:{
      q:query,
    }
   })
    setTransactions(response.data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);
  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        // 3 query, a funcao que vai chamar novamente api com dados filtrados
        loadTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
