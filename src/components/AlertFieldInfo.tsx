interface Props {
  message: String;
  bottomVH: number;
  leftVW: number;
}

function Alert({ message, leftVW, bottomVH }: Props) {
  return (
    <>
      <div
        className="d-flex align-content-center"
        style={{
          backgroundColor: "rgb(0,220,220)",
          width: "25vw",
          padding: "0.5vh",
          textAlign: "left",
          position: "absolute",
          bottom: `${bottomVH}vh`,
          left: `${leftVW}vw`,
          borderRadius: "1vh",
          zIndex: 5,
        }}
      >
        {message}
      </div>
    </>
  );
}

export default Alert;
