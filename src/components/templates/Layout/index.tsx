import { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setToast } from "store/toastSlice";
import useAuthGuard from "utils/useAuthGuard";
import useGetData from "utils/useGetData";
import useGetMenu from "utils/useGetMenu";
import styled from "styled-components";
import Sidebar from "components/organisms/Sidebar";
import Header from "components/organisms/Header";
import Loader from "components/organisms/Loader";
import Share from "components/organisms/Share";
import Ranking from "components/organisms/Ranking";
import Setting from "components/organisms/Setting";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Container = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100dvh;
`;

const SidebarContainer = styled.aside`
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

const MainContentContainer = styled.main`
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  display: flex;
  box-sizing: border-box;
  flex-grow: 4;
  flex-shrink: 0;
  flex-basis: 0;
  flex-direction: column;
  align-items: flex-start;
  z-index: 0;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
`;

const SubContentContainer = styled.sub`
  position: relative;
  display: flex;
  box-sizing: border-box;
  flex-grow: 2;
  flex-shrink: 0;
  flex-basis: 0;
  flex-direction: column;
  align-items: flex-start;
  z-index: 0;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const HeaderContainer = styled.header`
  box-sizing: border-box;
  width: 100%;
  height: 70px;
`;

const ContentContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 70px);
`;

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  useAuthGuard();
  useGetData();
  useGetMenu();

  const { children } = props;
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const share = useSelector((state: RootState) => state.menu.share);
  const setting = useSelector((state: RootState) => state.menu.setting);
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
      {isLoading && <Loader />}
      {!isLoading && (
        <Container>
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
          <MainContentContainer>
            <HeaderContainer>
              <Header />
            </HeaderContainer>
            <ContentContainer>{children}</ContentContainer>
          </MainContentContainer>
          <SubContentContainer>
            <Ranking />
          </SubContentContainer>
        </Container>
      )}
      {share.open && <Share />}
      {setting.open && <Setting />}
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

export default Layout;

export const getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
