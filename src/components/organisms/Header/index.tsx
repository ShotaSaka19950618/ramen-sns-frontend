import { useSelector } from "react-redux";
import { AppState } from "store";
import { MenuState } from "store/menuSlice";
import styled from "styled-components";
import Title from "components/atoms/Title";

const HeaderRoot = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const HeaderTitle = styled.div`
  padding-left: 10px;
`

const Header = () => {
  const { menu } = useSelector<AppState, { menu: MenuState }>((state) => ({
    menu: state.menu,
  }));

  return (
    <HeaderRoot>
      <HeaderTitle>
        <Title fontSize="24px" width="100%">{menu.Open}</Title>
      </HeaderTitle>
    </HeaderRoot>
  );
};

export default Header;
