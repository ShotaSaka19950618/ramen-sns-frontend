import styled, { css } from "styled-components";

type HumburgerMenuProps = {
  buttonColor?: string;
  barColor?: string;
  active: boolean;
  onClick: () => void;
};

type toggleButtonProps = {
  buttonColor?: string;
  onClick: () => void;
}

type LineProps = {
  barColor?: string;
  active: boolean;
}

const ToggleButton = styled.div<toggleButtonProps>`
  position: relative;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${({ buttonColor }) => buttonColor };
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
  }
`;

const Line = styled.span<LineProps>`
  display: inline-block;
  transition: all 0.4s;
  position: absolute;
  left: 14px;
  height: 3px;
  border-radius: 2px;
  background-color: ${({ barColor }) => barColor };
  width: 45%;
`;

const Line1 = styled(Line)`
  top: 15px;
  ${({ active }) =>active && css`
    top: 18px;
    left: 18px;
    transform: translateY(6px) rotate(-135deg);
    width: 30%;
  `}
`;
const Line2 = styled(Line)`
  top: 23px;
  ${({ active }) =>active && css`
    opacity: 0;
  `}

`;
const Line3 = styled(Line)`
  top: 31px;
  ${({ active }) =>active && css`
    top: 30px;
    left: 18px;
    transform: translateY(-6px) rotate(135deg);
    width: 30%;
  `}
`;

const HamburgerMenu = (props: HumburgerMenuProps) => {
  const { buttonColor, barColor, active, onClick } = props;
  return (
    <ToggleButton buttonColor={buttonColor} onClick={onClick}>
      <Line1 barColor={barColor} active={active} />
      <Line2 barColor={barColor} active={active} />
      <Line3 barColor={barColor} active={active} />
    </ToggleButton>
  );
};

export default HamburgerMenu;
