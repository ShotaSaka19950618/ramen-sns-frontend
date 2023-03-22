import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "store";
import { AuthState } from "store/authSlice";
import useAuthGuard from "utils/useAuthGuard";
import Layout2 from "components/templates/Layout2";
import Loader from "components/organisms/Loader";
import SigninForm from "components/organisms/SigninForm";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import axios from "axios";
import { setCookie } from "nookies";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SigninPage: NextPage = () => {
  useAuthGuard();
  const router = useRouter();
  const { auth } = useSelector<AppState, { auth: AuthState }>((state) => ({
    auth: state.auth,
  }));

  const [toast, setToast] = React.useState({
    open: false,
    type: "",
    message: "",
  });

  // サインイン処理
  const handleSignin = async (username: string, password: string) => {
    const result = await axios.post("/api/auth/signin", {
      username: username,
      password: password,
    }).then((response) => response.data);

    if (result.success) {
      setCookie(null, "accessToken", result.token, {
        maxAge: 30 * 24 * 60 * 60,
      });
      router.push("/");
    } else {
      setToast({
        open: true,
        type: "error",
        message: result.message,
      });
    }
  };

  // トーストを閉じる
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setToast({
      open: false,
      type: "error",
      message: "",
    });
  };

  return (
    <>
      <Head>
        <title>サインイン / RAMEN SNS</title>
      </Head>
      {auth.isSigninLoading && <Loader />}
      {!auth.isSigninLoading && (
        <>
          <Layout2>
            <SigninForm onSignin={handleSignin} />
          </Layout2>
          {toast.type === "error" && (
            <Snackbar
              open={toast.open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {toast.message}
              </Alert>
            </Snackbar>
          )}
        </>
      )}
    </>
  );
};

export default SigninPage;
