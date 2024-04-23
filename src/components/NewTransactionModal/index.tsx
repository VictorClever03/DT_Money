import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionTypeButton, TransactioType } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
// import * as RadioGroup from '@radix-ui/react-radio-group';

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay/>

      <Content>
        <Dialog.Title>Nova Transacao </Dialog.Title>
        <CloseButton >
            <X size={24} />
        </CloseButton>


        <form action="">
            <input type="text"  placeholder="Descricao" required/>
            <input type="number"  placeholder="Preco" required/>
            <input type="text" placeholder="Categoria" required/>

            <TransactioType>
                <TransactionTypeButton variant="income" value="income" title="clique">
                    <ArrowCircleUp size={24} />
                    Entrada
                </TransactionTypeButton>
                
                <TransactionTypeButton variant="outcome" value="outcome" title="clique">
                    <ArrowCircleDown size={24} />
                    Saida
                </TransactionTypeButton>
            </TransactioType>
            
            <button type="submit"> Cadastrar </button>
        </form>

      </Content>
    </Dialog.Portal>
  );
}
