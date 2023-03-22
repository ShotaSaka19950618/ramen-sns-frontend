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
import RegisterForm from "components/organisms/RegisterForm";
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

  // サインアップ処理
  const handleRegister = async (
    username: string,
    name: string,
    password: string
  ) => {
    const result = await axios.post("/api/auth/register", {
      username: username,
      name: name,
      password: password,
    }).then((response) => response.data);
    if (result.success) {
      setToast({
        open: true,
        type: "success",
        message: result.message,
      });
      const result2 = await axios.post("/api/auth/signin", {
        username: username,
        password: password,
      }).then((response) => response.data);
      if (result2.success) {
        setCookie(null, "accessToken", result2.token, {
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
      type: "",
      message: "",
    });
  };

  return (
    <>
      <Head>
        <title>サインアップ / RAMEN SNS</title>
      </Head>
      {auth.isSigninLoading && <Loader />}
      {!auth.isSigninLoading && (
        <>
          <Layout2>
            <RegisterForm onRegister={handleRegister} />
          </Layout2>
          {toast.type === "success" && (
            <Snackbar
              open={toast.open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                {toast.message}
              </Alert>
            </Snackbar>
          )}
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
