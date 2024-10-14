import axios from "axios";

export default async function ControllLoginData(
  usernameLog: String,
  passwordLog: String
) {
  //Check imported data, if are empty
  //a. set res message
  let errMessage = "You must import ";
  if (usernameLog === "" && passwordLog === "")
    errMessage += "the username and the password";
  else if (usernameLog === "") errMessage += "the username";
  else if (passwordLog === "") errMessage += "the password";
  //b. check the res message
  if (errMessage !== "You must import ") {
    //errMessage's changes mean that some imported data are missing
    return {
      //In this case,sends the message, the username and the accesstoken as empty String
      message: errMessage,
      accessToken: "",
      username: usernameLog,
    };
  }

  //Call API with AXIOS and return data
  try {
    const res = await axios.post("http://localhost:3500/logIn", {
      name: usernameLog,
      password: passwordLog,
    });
    //Return data and message
    return {
      //In this case,sends the username, the accesstoken and the message as empty String
      message: "",
      accessToken: res.data.accesstoken,
      username: usernameLog,
      roles: res.data.rolesCodes,
    };
  } catch (error) {
    console.log(error);
    return {
      //In this case,sends the username, the accesstoken and the message as empty String
      message: "Not user found",
      accessToken: "",
      username: usernameLog,
      roles: [0],
    };
  }
}
