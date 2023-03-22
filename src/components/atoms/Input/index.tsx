import { forwardRef } from "react";
import styled from "styled-components";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  fontSize?: string;
  color?: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  border?: string;
  borderTop?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRight?: string;
  focusUnderline?: boolean;
};

const StyledInput = styled.input<InputProps>`
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
  padding: 12px;
  box-sizing: border-box;
  outline: none;
  &:focus {
    border-bottom: ${({ theme, focusUnderline }) =>
      focusUnderline ? `1px solid ${theme.colors.primary}` : "none"}
  }
`;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <StyledInput ref={ref} {...rest}>
      {children}
    </StyledInput>
  );
});

export default Input;
