import styled from "styled-components";

type Layout2Props = {
  children: React.ReactNode;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.secondary};
  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const IntroductionContainer = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const ContentContainer = styled.div`
  display: flex;
  height: 100%;
  margin: 0 auto;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const IntroductionLog = styled.h3`
  font-size: 50px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 10px;
`;

const IntroductionDesc = styled.span`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
`;

const Layout2 = (props: Layout2Props) => {
  const { children } = props;
  return (
    <>
      <Container>
        <IntroductionContainer>
          <IntroductionLog>Ramen SNS</IntroductionLog>
          <IntroductionDesc>今日の一杯を共有してみよう</IntroductionDesc>
        </IntroductionContainer>
        <ContentContainer>{children}</ContentContainer>
      </Container>
    </>
  );
};

export default Layout2;
