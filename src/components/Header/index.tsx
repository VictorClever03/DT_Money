import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoSvg from '../../assets/svg/logo.svg';
export function Header(){
    return(
      <HeaderContainer>
        <HeaderContent>
            <img src={logoSvg} alt="logo" />
           <NewTransactionButton>Nova transacao</NewTransactionButton>
        </HeaderContent>
      </HeaderContainer>
    )
}