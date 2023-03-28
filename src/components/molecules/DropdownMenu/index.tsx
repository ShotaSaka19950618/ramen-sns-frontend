import styled from "styled-components";
import Text from "components/atoms/Text";

const DropdownMenuRoot = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  overflow: hidden;
`;

const DropdownMenuItem = styled.div`
  padding: 20px 0;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

type DropdownMenuProps = {
  menu: {
    item: string;
    onclick: () => void;
  }[];
};

const DropdownMenu = (props: DropdownMenuProps) => {
  const { menu } = props;
  return (
    <DropdownMenuRoot>
      {menu.map((menu) => (
        <DropdownMenuItem key={menu.item} onClick={menu.onclick}>
          <Text padding="11px 12px 12px 9px">{menu.item}</Text>
        </DropdownMenuItem>
      ))}
    </DropdownMenuRoot>
  );
};

export default DropdownMenu;
