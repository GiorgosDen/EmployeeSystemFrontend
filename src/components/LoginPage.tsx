import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import ControlLoginData from "../functions/ControlLoginData";

function LoginPage() {
  async function onClick() {
    const data = await ControlLoginData(loginName, loginPassword);
    if (data?.accessToken === "") {
      console.log("Empty Token Error!!!!!!!!");
      setAlertMessage(data.message);
      setAlertVisible(true);
    } else {
      console.log("Access Token: " + data?.accessToken);
      const nowTime = new Date();
      //send to home page:
      //The username
      //The accessToken (that expires in 2mins)
      //The time after the 2 mins (will be using for timer in HomePage)
      navigate("/home", {
        state: {
          username: loginName,
          accessToken: data?.accessToken,
          timerEnd: nowTime.getTime() + 2 * 60 * 1000,
          roles: data?.roles,
        },
      });
    }
  }

  const navigate = useNavigate();
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgb(90, 130, 255)",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <div
        className="d-flex flex-column align-items-start"
        style={{
          width: "100vh",
          gap: "2vh",
          backgroundColor: "rgb(255, 250, 230)",
          padding: "5vh 3vh 5vh 3vh",
          borderRadius: "2vh",
        }}
      >
        <h1
          style={{
            borderBottomStyle: "solid",
            borderColor: "rgb(90, 130, 255)",
            borderWidth: "1px",
            width: "55vh",
            textAlign: "left",
          }}
        >
          Login Page
        </h1>
        <label>Your Name:</label>
        <input
          type="text"
          className="form-control"
          onChange={(ev) => setLoginName(ev.target.value)}
          style={{ width: "95vh" }}
        />
        <label>Your Password:</label>
        <input
          type="password"
          className="form-control"
          onChange={(ev) => setLoginPassword(ev.target.value)}
          style={{ width: "95vh" }}
        />
        <button className="btn btn-primary" onClick={onClick}>
          Login
        </button>
      </div>
      {alertVisible && (
        <Alert
          message={alertMessage}
          bottomVH={"10vh"}
          alertType="alert-info"
          onClose={() => setAlertVisible(false)}
        />
      )}
    </div>
  );
}

export default LoginPage;
