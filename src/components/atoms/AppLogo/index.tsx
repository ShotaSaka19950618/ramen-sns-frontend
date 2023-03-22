import Image from "next/image";

type AppLogoProps = {
  color: "white" | "blue";
};

const AppLogo = (props: AppLogoProps) => {
  const { color } = props;
  return (
    <>
      {color === "white" && (
        <Image src="images/AppLogoWhite.svg" alt="logo" fill priority />
      )}
      {color === "blue" && (
        <Image src="images/AppLogoBlue.svg" alt="logo" fill priority />
      )}
    </>
  );
};

export default AppLogo;
