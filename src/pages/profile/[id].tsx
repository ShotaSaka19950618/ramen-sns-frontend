import type { NextPageWithLayout } from "pages/_app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setMenuOpen, setMenuList } from "store/menuSlice";
import { User } from "types";
import { getLayout } from "components/templates/Layout";
import axios from "axios";

const Profile: NextPageWithLayout = () => {
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const authToken = useSelector((state: RootState) => state.auth.token);
  const menuList = useSelector((state: RootState) => state.menu.List);
  const dispatch = useDispatch();

  const [user, SetUser] = useState<User>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id && authUser) {
      const getUser = async () => {
        const user = await axios
          .post(
            "/api/users/get",
            {
              userid: id,
            },
            {
              headers: {
                Authorization: authToken,
              },
            }
          )
          .then((response) => response.data);
        if (user.success) {
          SetUser(user.data);
          const newMenuList = menuList.map((menu) => {
            if (authUser._id === user.data._id) {
              dispatch(setMenuOpen("マイプロフィール"));
              return menu.text === "プロフィール"
                ? { ...menu, active: true }
                : { ...menu, active: false };
            } else {
              dispatch(setMenuOpen(`${user.data.name}のプロフィール`));
              return { ...menu, active: false };
            }
          });
          if (JSON.stringify(newMenuList) !== JSON.stringify(menuList)) {
            dispatch(setMenuList(newMenuList));
          }
        }
      };
      getUser();
    }
  }, [dispatch, id, authUser, authToken, menuList]);

  return (
    <>
      <Head>
        <title>ホーム / RAMEN SNS</title>
      </Head>
      {user && (
        <>
          <div>{user._id}</div>
          <div>{user.username}</div>
          <div>{user.name}</div>
        </>
      )}
    </>
  );
};

export default Profile;

Profile.getLayout = getLayout;
