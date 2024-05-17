import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  Overlay,
  TransactionTypeButton,
  TransactioType,
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionContext";

//1 useform criei o esquema com nome dos campos dos inputs
const NewTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

interface props {
  id: number;
}

//2 useform peguei os inputs e lhes tipei conforme o esquema
type NewTransactionFormInputs = z.infer<typeof NewTransactionFormSchema>;
export function UpdateTransactionModal(props: props) {
  const { updateTransactions } = useContext(TransactionsContext);
  //3 useform necessario que seja assim , ATT: controlar onde colocar os inputs e o schema
  const {
    // 8 useform, adicionei o control para dados que nao vem direcatamente do input ou outro formElement como checkbox, textarea etc..
    control,
    register,
    handleSubmit,
    // para resetar quando terminar a requisicao
    reset,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(NewTransactionFormSchema),
    // 10 useform para colocar certos campos do passo 1 com valores padraos
    defaultValues: {
      type: "income",
    },
  });

  //4 useform essa e a funcao que vai executar quando for submeter o formulario, ATT tipar data
  async function handleUpdateTransaction(data: NewTransactionFormInputs) {
    // levei a funcao que vai criar nova transaction no contexto, porque a tabela nao atualizou sozinha
    // essa funcao vai criar nova transaction no contexto

    await updateTransactions(data, props.id);
    //
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Actualizando Transacao </Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        {/* 5 useform handleSubmit(handleCreateNewTransaction) */}
        <form onSubmit={handleSubmit(handleUpdateTransaction)}>
          <input
            type="text"
            placeholder="Nova Descricao"
            required
            {...register("description")}
          />
          {/* 6 useform no zodschema coloquei o price como number e aqui sem o valueAsNumber vai retornar como string dando erro , {...register('category')} no input*/}
          <input
            type="number"
            placeholder="Novo Preco"
            required
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Nova Categoria"
            required
            {...register("category")}
          />
          {/* 9 useform o control e para dados que nao virao directamente do input ou outro formElement */}
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              // console.log(field)
              return (
                <TransactioType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton
                    variant="income"
                    value="income"
                    title="clique"
                  >
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton
                    variant="outcome"
                    value="outcome"
                    title="clique"
                  >
                    <ArrowCircleDown size={24} />
                    Saida
                  </TransactionTypeButton>
                </TransactioType>
              );
            }}
          />

          {/*7 useform desativa o botao quando estiver no processo de submissao */}
          <button type="submit" disabled={isSubmitting}>
            {" "}
            Atualizar{" "}
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
