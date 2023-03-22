import styled from "styled-components";

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  fontSize?: string;
  color?: string;
  backgroundColor?: string;
  hcolor?: string;
  hbackgroundColor?: string;
  dcolor?: string;
  dbackgroundColor?: string;
  width?: string;
  height?: string;
  border?: string;
  borderTop?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRight?: string;
};

const StyledButton = styled.button<ButtonProps>`
  font-size: ${({ fontSize }) => fontSize || "16px"};
  color: ${({ color, theme }) => color || theme.colors.text};
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  border: ${({ border }) => border || "none"};
  border-top: ${({ borderTop }) => borderTop || "none"};
  border-bottom: ${({ borderBottom }) => borderBottom || "none"};
  border-left: ${({ borderLeft }) => borderLeft || "none"};
  border-right: ${({ borderRight }) => borderRight || "none"};
  &:hover {
    color: ${({ hcolor }) => hcolor};
    background-color: ${({ hbackgroundColor }) => hbackgroundColor};
  }
  &:disabled {
    color: ${({ dcolor }) => dcolor};
    background-color: ${({ dbackgroundColor }) => dbackgroundColor};
  }
  cursor: pointer;
  outline: none;
  text-decoration: "none";
  border-radius: 4px;
`;

const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
