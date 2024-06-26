import styled from "styled-components";
import { Eye, Trash } from "phosphor-react";

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`;

export const TransactionTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.2rem 2rem;
    background: ${(props) => props.theme["gray-700"]};
    cursor: pointer;
    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    /* hover na ultima coluna de cada linha, some com todos elementos */
    &:last-child * {
      visibility: hidden;
      opacity: 0;
    }
    /* reaparece com o elemento especifico */
    &.visible * {
      visibility: visible;
      opacity: 1;
      transition: all 0.2s;
    }
  }
`;
interface PriceHighlightProps {
  variant: "income" | "outcome";
}
export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant == "income"
      ? props.theme["green-300"]
      : props.theme["red-300"]};
`;

export const TrashIcon = styled(Trash)`
  color: ${(props) => props.theme["red-300"]};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme["red-500"]};
    transition: color 0.2s;
  }
`;
export const EyeIcon = styled(Eye)`
  color: ${(props) => props.theme["green-300"]};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme["green-500"]};
    transition: color 0.2s;
  }
`;
