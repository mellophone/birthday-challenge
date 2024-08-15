const FullscreenCenter = ({ children }: { children: any }) => {
  return (
    <div
      style={{
        height: "100vh",
        background: "darkgray",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export default FullscreenCenter;
