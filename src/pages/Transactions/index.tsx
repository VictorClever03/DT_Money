import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import * as Dialog from "@radix-ui/react-dialog";

import {
  EyeIcon,
  PriceHighlight,
  TransactionsContainer,
  TransactionTable,
  TrashIcon,
} from "./styles";
import { TransactionsContext } from "../../contexts/TransactionContext";
import { dateFormatter, priceFormatter } from "../../utils/Farmatter";
import { UpdateTransactionModal } from "../../components/UpdateTransactionModal";

export function Transactions() {
  const { transactions, deleteTransactions } = useContext(TransactionsContext);

  async function handleDeleteTrasaction(id: number) {
    await deleteTransactions(id);
  }
  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="40%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type == "outcome" && "- "}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                  <td width="10%">
                    <TrashIcon
                      onClick={() => handleDeleteTrasaction(transaction.id)}
                    />
                       {' '}
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <EyeIcon/>
                      </Dialog.Trigger>
                   
                      <UpdateTransactionModal id={transaction.id}/>
                    </Dialog.Root>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TransactionTable>
      </TransactionsContainer>
    </div>
  );
}
