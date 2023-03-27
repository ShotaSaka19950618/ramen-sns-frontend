import type { NextPageWithLayout } from "pages/_app";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setMenuOpen, setMenuList } from "store/menuSlice";
import styled from "styled-components";
import { getLayout } from "components/templates/Layout";
import { useEffect } from "react";

const Notifications: NextPageWithLayout = () => {
  const menuList = useSelector((state: RootState) => state.menu.List);
  const dispatch = useDispatch();

  useEffect(() => {
    const newMenuList = menuList.map((menu) => {
      return menu.text === "通知"
        ? { ...menu, active: true }
        : { ...menu, active: false };
    });
    if (JSON.stringify(newMenuList) !== JSON.stringify(menuList)) {
      dispatch(setMenuOpen("通知"));
      dispatch(setMenuList(newMenuList));
    }
  }, [dispatch, menuList]);

  return (
    <>
      <Head>
        <title>通知 / RAMEN SNS</title>
      </Head>
      <div></div>
    </>
  );
};

export default Notifications;

Notifications.getLayout = getLayout;
