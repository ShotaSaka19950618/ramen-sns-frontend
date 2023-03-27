import Image from "next/image";
import styled from "styled-components";

const AppLogoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

type AppLogoProps = {
  color: "white" | "blue";
};

const AppLogo = (props: AppLogoProps) => {
  const { color } = props;
  return (
    <AppLogoWrapper>
      {color === "white" && (
        <Image src="/AppLogoWhite.svg" alt="logo" fill priority sizes="auto" />
      )}
      {color === "blue" && (
        <Image src="/AppLogoBlue.svg" alt="logo" fill priority sizes="auto" />
      )}
    </AppLogoWrapper>
  );
};

export default AppLogo;
