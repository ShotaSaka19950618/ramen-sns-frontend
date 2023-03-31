import { useSelector } from "react-redux";
import { RootState } from "store";
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
  const title = useSelector((state: RootState) => state.menu.title)

  return (
    <HeaderRoot>
      <HeaderTitle>
        <Title fontSize="24px" width="100%">{title}</Title>
      </HeaderTitle>
    </HeaderRoot>
  );
};

export default Header;
