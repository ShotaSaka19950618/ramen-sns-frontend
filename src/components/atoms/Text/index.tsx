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
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  padding?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  whiteSpace?: "pre-wrap" | "pre-line";
};

const StyledText = styled.span<TextProps>`
  display: ${({ display }) => display};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ color }) => color};
  background: ${({ background }) => background};
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: ${({ border }) => border || "none"};
  border-top: ${({ borderTop }) => borderTop || "none"};
  border-bottom: ${({ borderBottom }) => borderBottom || "none"};
  border-left: ${({ borderLeft }) => borderLeft || "none"};
  border-right: ${({ borderRight }) => borderRight || "none"};
  margin: ${({ margin }) => margin};
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: ${({ marginBottom }) => marginBottom};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
  padding: ${({ padding }) => padding};
  padding-top: ${({ paddingTop }) => paddingTop};
  padding-bottom: ${({ paddingBottom }) => paddingBottom};
  padding-left: ${({ paddingLeft }) => paddingLeft};
  padding-right: ${({ paddingRight }) => paddingRight};
  white-space: ${({ whiteSpace }) => whiteSpace};
`;

const Text = (props: TextProps) => {
  const { children, ...rest } = props;
  return <StyledText {...rest}>{children}</StyledText>;
};

export default Text;
