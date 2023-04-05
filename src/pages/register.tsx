import type { NextPageWithLayout } from "pages/_app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setToast } from "store/toastSlice";
import { getLayout2 } from "components/templates/Layout2";
import RegisterForm from "components/organisms/RegisterForm";
import axios from "axios";
import { setCookie } from "nookies";

const RegisterPage: NextPageWithLayout = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // サインアップ処理
  const handleRegister = async (
    username: string,
    name: string,
    password: string
  ) => {
    const result = await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}api/auth/register`, {
        username: username,
        name: name,
        password: password,
      })
      .then((response) => response.data);
    if (result.success) {
      dispatch(
        setToast({
          open: true,
          type: "success",
          message: result.message,
        })
      );
      const result2 = await axios
        .post("/api/auth/signin", {
          username: username,
          password: password,
        })
        .then((response) => response.data);
      if (result2.success) {
        setCookie(null, "accessToken", result2.token, {
          maxAge: 30 * 24 * 60 * 60,
        });
        router.push("/");
      } else {
        dispatch(
          setToast({
            open: true,
            type: "error",
            message: result.message,
          })
        );
      }
    } else {
      dispatch(
        setToast({
          open: true,
          type: "error",
          message: result.message,
        })
      );
    }
  };

  return (
    <>
      <Head>
        <title>サインアップ / RAMEN SNS</title>
      </Head>
      <RegisterForm onRegister={handleRegister} />
    </>
  );
};

export default RegisterPage;

RegisterPage.getLayout = getLayout2;
