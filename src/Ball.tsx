import Image from "next/image";

const Ball = (props: { isDisplayed: boolean }) => {
  const width = 1082;
  const height = 1075;

  return (
    <Image
      alt="Ball"
      src="/ball.png"
      width={width}
      height={height}
      style={{
        aspectRatio: width / height,
        width: 100,
        height: "auto",
        opacity: props.isDisplayed ? 1 : 0,
      }}
    />
  );
};

export default Ball;
