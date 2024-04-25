import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionTypeButton, TransactioType } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// criei o esquema com nome dos campos dos inputs
const NewTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  // type: z.enum(['income', 'outcome']),
})

// peguei os inputs e lhes tipei conforme o esquema
type NewTransactionFormInputs = z.infer<typeof NewTransactionFormSchema>; 
export function NewTransactionModal() {
// necessario que seja assim , ATT: controlar onde colocar os inputs e o schema
  const {
    register, 
    handleSubmit,
    formState:{isSubmitting}
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(NewTransactionFormSchema),
  });

  // essa e a funcao que vai executar quando for submeter o formulario, ATT tipar data
  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log(data);
  }

  return (
    <Dialog.Portal>
      <Overlay/>

      <Content>
        <Dialog.Title>Nova Transacao </Dialog.Title>
        <CloseButton >
            <X size={24} />
        </CloseButton>


        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input type="text"  placeholder="Descricao" required
            {...register('description')}
            />
            {/* no zodschema coloquei o price como number e aqui sem o valueAsNumber vai retornar como string dando erro */}
            <input type="number"  placeholder="Preco" required
            {...register('price', {valueAsNumber:true})}
            />
            <input type="text" placeholder="Categoria" required
            {...register('category')}
            />

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
            {/* desativa o botao quando estiver no processo de submissao */}
            <button type="submit" disabled={isSubmitting}> Cadastrar </button>
        </form>

      </Content>
    </Dialog.Portal>
  );
}
