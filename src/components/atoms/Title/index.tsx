import styled from "styled-components";

type TitleProps = React.ComponentPropsWithoutRef<"h2"> & {
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

const StyledTitle = styled.h2<TitleProps>`
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
  display: flex;
  align-items: center;
`;

const Title = (props: TitleProps) => {
  const { children, ...rest } = props;
  return <StyledTitle {...rest}>{children}</StyledTitle>;
};

export default Title;
