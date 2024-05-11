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

interface createTransactionsInput {
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
}
interface TransactionContextType {
  transactions: Transaction[];
  // 1 query
  loadTransactions: (query?: string) => Promise<void>;
  createTransactions: (data: createTransactionsInput) => Promise<void>;
  deleteTransactions: (id: number) => Promise<void>;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // 2 as properties
  async function loadTransactions(query?: string) {
    const response = await api.get("/transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });
    setTransactions(response.data);
  }
  async function createTransactions(data: createTransactionsInput) {
    const { description, category, price, type } = data;
    const response = await api.post("transactions", {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
      // esta e outra forma, aconselhado em forms pequenos
      // ...data,
    });
    setTransactions((state) => [response.data, ...state]);
  }

  // funcao para deletar uma transacao
  async function deleteTransactions(id?: number) {
    const response = await api.delete(`/transactions/${id}`);
    // se deletou, entao filtra dados menos o id da transacao que deletamos
    if(response.data){
      setTransactions(transactions.filter(transaction => transaction.id!==id));
    }
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
        // funcao que vai criar nova transaction
        createTransactions,
        deleteTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
