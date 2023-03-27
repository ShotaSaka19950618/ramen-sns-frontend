import styled from "styled-components";
import IconComponent from "components/atoms/Icon";
import type { Icon } from "types";

type ButtonProps = {
  color?: string;
  backgroundColor?: string;
  hcolor?: string;
  hbackgroundColor?: string;
  width?: string;
  height?: string;
};

type IconButtonProps = {
  iconType: Icon;
  children?: React.ReactNode;
  onClick?: () => void;
} & ButtonProps;

const Button = styled.div<ButtonProps>`
  color: ${({ color, theme }) => color || theme.colors.black};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width || "80%"};
  height: ${({ height }) => height || "40px"};
  border-radius: 30px;
  transition: background-color 0.3s linear;
  cursor: pointer;
  &:hover {
    color: ${({ hcolor, theme }) => hcolor || theme.colors.white};
    background-color: ${({ hbackgroundColor, theme }) =>
      hbackgroundColor || theme.colors.black};
  }
`;

const ButtonText = styled.span`
  padding-left: 10px;
`;

const IconButton = (props: IconButtonProps) => {
  const { iconType, children, ...rest } = props;
  return (
    <Button {...rest}>
      <IconComponent
        iconType={iconType}
        fontSize="24px"
        width="24px"
        height="24px"
      />
      {children && <ButtonText>{children}</ButtonText>}
    </Button>
  );
};

export default IconButton;
