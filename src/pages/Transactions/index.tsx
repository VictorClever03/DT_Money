import { useContext, useState } from "react";
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
  const [hovered, setHovered] = useState<number | null>(null); // quando passar o mouse mostre o hover

  function handleMouseIn(index: number) {
    setHovered(index); // Atualiza o estado com o índice do elemento sobre o qual o mouse está passando
  }
  function handleMouseOut() {
    setHovered(null); // Remove o estado quando o mouse sai do elemento
  }
  console.log(hovered);
  //  context
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
                <tr
                  key={transaction.id}
                  onMouseEnter={() => handleMouseIn(transaction.id)}
                  onMouseLeave={handleMouseOut}
                >
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
                  <td
                    width="10%"
                    className={hovered === transaction.id ? "visible" : ""} // Adiciona a classe visible se estiver com hover
                  >
                    <TrashIcon
                      onClick={() => handleDeleteTrasaction(transaction.id)}
                    />{" "}
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <EyeIcon />
                      </Dialog.Trigger>

                      <UpdateTransactionModal id={transaction.id} />
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
