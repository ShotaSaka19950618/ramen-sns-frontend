import type { NextPageWithLayout } from "pages/_app";
import Head from "next/head";
import { getLayout } from "components/templates/Layout";

const Settings: NextPageWithLayout = () => {

  return (
    <>
      <Head>
        <title>設定 / RAMEN SNS</title>
      </Head>
      <div></div>
    </>
  );
};

export default Settings;

Settings.getLayout = getLayout;
