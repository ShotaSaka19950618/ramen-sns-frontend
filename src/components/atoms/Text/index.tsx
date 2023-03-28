import styled from "styled-components";

type TextProps = React.ComponentPropsWithoutRef<"span"> & {
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  background?: string;
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
  display: ${({ display }) => display};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  font-size: ${({ fontSize }) => fontSize || "16px"};
  font-weight: ${({ fontWeight }) => fontWeight || "500"};
  color: ${({ color, theme }) => color || theme.colors.text};
  background: ${({ background }) => background};
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
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
