import { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setToast } from "store/toastSlice";
import useAuthGuard from "utils/useAuthGuard";
import styled from "styled-components";
import Loader from "components/organisms/Loader";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100dvh;
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
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Layout2Props = {
  children: React.ReactNode;
};

const Layout2 = (props: Layout2Props) => {
  useAuthGuard();

  const { children } = props;
  const isSigninLoading = useSelector((state: RootState) => state.auth.isSigninLoading);
  const toastState = useSelector((state: RootState) => state.toast.state);
  const dispatch = useDispatch();

  // トーストを閉じる
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(
      setToast({
        open: false,
        type: "",
        message: "",
      })
    );
  };

  return (
    <>
      {isSigninLoading && <Loader />}
      {!isSigninLoading && (
        <Container>
          <IntroductionContainer>
            <IntroductionLog>Ramen SNS</IntroductionLog>
            <IntroductionDesc>今日の一杯を共有してみよう</IntroductionDesc>
          </IntroductionContainer>
          <ContentContainer>{children}</ContentContainer>
        </Container>
      )}
      {(toastState.type === "success" || toastState.type === "error") && (
        <Snackbar
          open={toastState.open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={toastState.type}
            sx={{ width: "100%" }}
          >
            {toastState.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Layout2;

export const getLayout2 = (page: React.ReactElement) => {
  return <Layout2>{page}</Layout2>;
};
