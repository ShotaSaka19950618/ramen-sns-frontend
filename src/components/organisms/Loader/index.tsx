import styled from "styled-components";
import AppLogo from "components/atoms/AppLogo";

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const LoaderWrapper = styled.div`
  position: relative;
  width: 60%;
  height: 60%;
  background-color: ${({ theme }) => theme.colors.secondary}; ;
`;

const Loader = () => {
  return (
    <Modal>
      <LoaderWrapper>
        <AppLogo color="blue" />
      </LoaderWrapper>
    </Modal>
  );
};

export default Loader;
