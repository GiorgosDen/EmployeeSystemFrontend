interface Props {
  message: String;
  alertType: string;
  bottomVH: string;
  onClose: () => void;
}

function Alert({ message, alertType, bottomVH, onClose }: Props) {
  const alertClass = `alert ${alertType} alert-dismissible fade show`;
  return (
    <>
      <div
        className={alertClass}
        role="alert"
        style={{
          width: "95vh",
          textAlign: "left",
          position: "absolute",
          bottom: bottomVH,
          zIndex: 5,
        }}
      >
        {message}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </>
  );
}

export default Alert;
