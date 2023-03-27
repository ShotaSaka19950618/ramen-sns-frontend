import { forwardRef } from "react";
import styled from "styled-components";

type TextAreaProps = React.ComponentPropsWithoutRef<"textarea"> & {
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

const StyledTextArea = styled.textarea<TextAreaProps>`
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
  resize: none;
  &:focus {
    border-bottom: ${({ theme, focusUnderline }) =>
      focusUnderline ? `1px solid ${theme.colors.primary}` : "none"};
  }
`;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const { children, ...rest } = props;
    return (
      <StyledTextArea ref={ref} {...rest}>
        {children}
      </StyledTextArea>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
