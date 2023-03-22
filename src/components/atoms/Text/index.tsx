import styled from "styled-components";

type TextProps = React.ComponentPropsWithoutRef<"span"> & {
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
};

const StyledText = styled.span<TextProps>`
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
  padding: 11px 12px 12px 9px;
`;

const Text = (props: TextProps) => {
  const { children, ...rest } = props;
  return <StyledText {...rest}>{children}</StyledText>;
};

export default Text;
