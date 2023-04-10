import type { NextPageWithLayout } from "pages/_app";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";
import { getLayout } from "components/templates/Layout";
import Notification from "components/organisms/Notification";

const NotificationsContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Notifications: NextPageWithLayout = () => {
  const notifications = useSelector(
    (state: RootState) => state.data.notifications
  );

  return (
    <>
      <Head>
        <title>通知 / RAMEN SNS</title>
      </Head>
      <NotificationsContainer>
        {notifications.map((data) => (
          <Notification
            notification={data.notification}
            user={data.user}
            key={data.notification._id}
          />
        ))}
      </NotificationsContainer>
    </>
  );
};

export default Notifications;

Notifications.getLayout = getLayout;
