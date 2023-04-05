import type { NextPageWithLayout } from "pages/_app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setToast } from "store/toastSlice";
import { getLayout2 } from "components/templates/Layout2";
import SigninForm from "components/organisms/SigninForm";
import axios from "axios";
import { setCookie } from "nookies";

const SigninPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // サインイン処理
  const handleSignin = async (username: string, password: string) => {
    const result = await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/auth/signin`, {
        username: username,
        password: password,
      })
      .then((response) => response.data);

    if (result.success) {
      setCookie(null, "accessToken", result.token, {
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
  };

  return (
    <>
      <Head>
        <title>サインイン / RAMEN SNS</title>
      </Head>
      <SigninForm onSignin={handleSignin} />
    </>
  );
};

export default SigninPage;

SigninPage.getLayout = getLayout2;
