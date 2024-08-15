import Image from "next/image";
import Ball from "./Ball";

const Cup = (props: {
  hasBall: boolean;
  cupX: number;
  cupY: number;
  onClick: () => void;
  canClick: boolean;
}) => {
  const width = 583;
  const height = 759;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Image
        alt="Cup"
        src="/cup.png"
        width={width}
        height={height}
        style={{
          aspectRatio: width / height,
          width: 200,
          height: "auto",
          transform: `translate(${props.cupX}px, ${props.cupY}px)`,
          cursor: "pointer",
          zIndex: 2,
        }}
        onClick={() => {
          if (props.canClick) {
            props.onClick();
          }
        }}
      />
      <Ball isDisplayed={props.hasBall} />
    </div>
  );
};

export default Cup;
