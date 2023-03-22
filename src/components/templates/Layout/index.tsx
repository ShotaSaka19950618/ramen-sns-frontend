import styled from "styled-components";
import Sidebar from "components/organisms/Sidebar";
import Header from "components/organisms/Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Container = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
`;

const SidebarContainer = styled.aside`
  background-color: ${({ theme }) => theme.colors.primary};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  display: flex;
  box-sizing: border-box;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  flex-direction: column;
  user-select: none;
  align-items: flex-end;
  z-index: 3;
`;

const MainContainer = styled.main`
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  display: flex;
  box-sizing: border-box;
  flex-grow: 5;
  flex-shrink: 0;
  flex-basis: 0;
  flex-direction: column;
  align-items: flex-start;
  z-index: 0;
`;

const HeaderContainer = styled.header`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  height: 70px;
`;

const ContentContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 70px);
`;

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <Container>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContainer>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <ContentContainer>{children}</ContentContainer>
      </MainContainer>
    </Container>
  );
};

export default Layout;
