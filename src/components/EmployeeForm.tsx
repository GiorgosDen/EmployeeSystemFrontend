//Returns a form to update or add emplyoee

import { useState } from "react";
import UpdateEmployee from "../functions/UpdateEmployee";
import AddEmployee from "../functions/AddEmployee";
import Alert from "./Alert";
import AlertFieldInfo from "./AlertFieldInfo";

//Authorization interface
interface Authorization {
  token: String;
  roles: number[];
  currAFM: number | string;
}

//Component properties
interface Props {
  formRole: String;
  onClose: () => void;
  extraData: Authorization;
  EmployeeF: (string | number)[];
}
function EmployeeForm({ formRole, EmployeeF, extraData, onClose }: Props) {
  //Functions
  //1. select the correct functin (base on formRole) to add or update an employee
  const chooseCorrectFunction = async () => {
    let retMessage: string; //Keep response message
    //checks form data (That function returns an empty string when form inputs are fine)
    if (checkFormData() === "") {
      if (formRole === "Add") {
        //Call handleAddEmployee function
        retMessage = await handleAddEmployee();
      } else {
        //Call handleUpdateEmployee function
        retMessage = await handleUpdateEmployee();
      }
    } else {
      retMessage = "Unvalid Form Data";
    }

    //Show response message with alert
    //!error message structure = <Request Method> Error: ${error}

    //a. look to find 'Error:' in resMessage
    //!! If have success,the splitResMessage equals to "with", else equals to "Error:"/"Form"
    const splitResMessage = retMessage.split(" ");
    splitResMessage[1] === "Error:" || splitResMessage[1] === "Form"
      ? setAlertType("alert-danger")
      : setAlertType("alert-info");
    //b. set alert message
    setAlertMessage(retMessage);
    //g. show alert
    setAlertVisible(true);
  };
  //2. Add employee
  async function handleAddEmployee() {
    const employee = {
      employeeAFM: emplAFM,
      employeeFullName: emplName,
      employeeJob: emplJob,
      employeeAge: emplAge,
      employeeEmail: emplEmail,
      employeeDescription: emplDesc,
      userID: -1,
    };
    let res = ""; //res:has the response message (success or error)
    res = await AddEmployee(extraData.token, extraData.roles, employee);
    return res;
  }
  //3. Update employee
  async function handleUpdateEmployee() {
    const employee = {
      employeeAFM: emplAFM,
      employeeFullName: emplName,
      employeeJob: emplJob,
      employeeAge: emplAge,
      employeeEmail: emplEmail,
      employeeDescription: emplDesc,
      userID: -1,
    };
    //res:has the response message (success or error)
    const res = await UpdateEmployee(
      extraData.token,
      extraData.roles,
      extraData.currAFM,
      employee
    );
    return res;
  }

  //4. CheckFormData (from hooks)
  function checkFormData() {
    let unvalidFields = "";
    if (emplName === "Select a Employee" || emplName === "")
      unvalidFields += " Full Name,";
    if (emplAFM === "----------" || emplAFM === "") unvalidFields += " AFM,";
    if (emplEmail === "") unvalidFields += " Email,";
    if (emplJob === "") unvalidFields += " Job Title,";
    if (emplAge === "") unvalidFields += " Age,";

    //If found a unvalid form input
    if (unvalidFields !== "")
      return unvalidFields + " please check the form data.";
    return unvalidFields;
  }

  //5.Show field info alert
  function showFieldInfo(info: string, bottom: number) {
    //Process the hooks which are connect with alertfieldinfo
    setAlertFieldMessage(info);
    setAlertFieldBottom(bottom);
    setAlertFieldVisible(true);
  }

  //6. Hide field info alert
  function hideFieldInfo() {
    //Process the hook,that hide the alert
    setAlertFieldVisible(false);
  }

  //Hooks
  //1. form's fields
  const [emplName, setEmplName] = useState(EmployeeF[0]);
  const [emplAFM, setEmplAFM] = useState(EmployeeF[1]);
  const [emplEmail, setEmplEmail] = useState(EmployeeF[2]);
  const [emplJob, setEmplJob] = useState(EmployeeF[3]);
  const [emplAge, setEmplAge] = useState(EmployeeF[4]);
  const [emplDesc, setEmplDesc] = useState(EmployeeF[5]);
  //2. Alert message fields
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("alert-info");
  //3. Field Info message hooks
  const [alertFieldVisible, setAlertFieldVisible] = useState(false);
  const [alertFieldMessage, setAlertFieldMessage] = useState("");
  const [alertFieldBottom, setAlertFieldBottom] = useState(50);

  return (
    <>
      <div
        style={{
          height: "90vh",
          width: "40vw",
          backgroundColor: "rgb(200,225,255)",
          position: "absolute",
          top: "5vh",
          left: "30vw",
          borderRadius: "2vh",
          textAlign: "left",
        }}
      >
        <div style={{ margin: "5vh" }}>
          <h1>{formRole} Employee</h1>
          <label style={{ marginLeft: "1vw" }}>
            Full Name:{" "}
            <span
              style={{
                backgroundColor: "rgb(0,170,170)",
                paddingLeft: "1vh",
                paddingRight: "1vh",
                borderRadius: "5vh",
              }}
              onMouseEnter={() =>
                showFieldInfo("!: max length: 45 characters with space", 75)
              }
              onMouseLeave={() => hideFieldInfo()}
            >
              !
            </span>
          </label>
          <input
            type="text"
            className="form-control"
            maxLength={45}
            style={{ width: "35vw" }}
            onChange={(ev) => setEmplName(ev.target.value)}
            value={emplName}
          />
          <label style={{ marginLeft: "1vw" }}>AFM:</label>
          <span
            style={{
              backgroundColor: "rgb(0,170,170)",
              paddingLeft: "1vh",
              paddingRight: "1vh",
              borderRadius: "5vh",
            }}
            onMouseEnter={() =>
              showFieldInfo("!: max length: 9 characters, only numbers", 65)
            }
            onMouseLeave={() => hideFieldInfo()}
          >
            !
          </span>
          <input
            type="text"
            className="form-control"
            maxLength={9}
            style={{ width: "35vw" }}
            onChange={(ev) => setEmplAFM(ev.target.value)}
            value={emplAFM}
          />
          <label style={{ marginLeft: "1vw" }}>Email:</label>
          <span
            style={{
              backgroundColor: "rgb(0,170,170)",
              paddingLeft: "1vh",
              paddingRight: "1vh",
              borderRadius: "5vh",
            }}
            onMouseEnter={() =>
              showFieldInfo("!: max length: 75 characters", 55)
            }
            onMouseLeave={() => hideFieldInfo()}
          >
            !
          </span>
          <input
            type="text"
            className="form-control"
            maxLength={75}
            style={{ width: "35vw" }}
            onChange={(ev) => setEmplEmail(ev.target.value)}
            value={emplEmail}
          />
          <label style={{ marginLeft: "1vw" }}>Job Title:</label>
          <span
            style={{
              backgroundColor: "rgb(0,170,170)",
              paddingLeft: "1vh",
              paddingRight: "1vh",
              borderRadius: "5vh",
            }}
            onMouseEnter={() =>
              showFieldInfo(
                "!: max length: 45 characters (spaces includes)",
                41
              )
            }
            onMouseLeave={() => hideFieldInfo()}
          >
            !
          </span>
          <input
            type="text"
            className="form-control"
            maxLength={45}
            style={{ width: "35vw" }}
            onChange={(ev) => setEmplJob(ev.target.value)}
            value={emplJob}
          />
          <label style={{ marginLeft: "1vw" }}>Age:</label>
          <span
            style={{
              backgroundColor: "rgb(0,170,170)",
              paddingLeft: "1vh",
              paddingRight: "1vh",
              borderRadius: "5vh",
            }}
            onMouseEnter={() =>
              showFieldInfo("!: max length: 3 characters, only numbers", 35)
            }
            onMouseLeave={() => hideFieldInfo()}
          >
            !
          </span>
          <input
            type="text"
            className="form-control"
            maxLength={3}
            style={{ width: "35vw" }}
            onChange={(ev) => setEmplAge(ev.target.value)}
            value={emplAge}
          />
          <label style={{ marginLeft: "1vw" }}>Description:</label>
          <span
            style={{
              backgroundColor: "rgb(0,170,170)",
              paddingLeft: "1vh",
              paddingRight: "1vh",
              borderRadius: "5vh",
            }}
            onMouseEnter={() =>
              showFieldInfo(
                "!: max length: 120 characters (spaces includes), It is not mandatory",
                21
              )
            }
            onMouseLeave={() => hideFieldInfo()}
          >
            !
          </span>
          <textarea
            rows={3}
            cols={45}
            maxLength={125}
            className="form-control"
            style={{ width: "35vw", resize: "none" }}
            onChange={(ev) => setEmplDesc(ev.target.value)}
            value={emplDesc}
          />
          <div style={{ margin: "2vh" }}>
            <button
              className="btn btn-success btn-sm"
              style={{ marginRight: "1vw", marginBottom: "2vh" }}
              onClick={chooseCorrectFunction}
            >
              {formRole}
            </button>
            <button
              className="btn btn-warning btn-sm"
              style={{ marginBottom: "2vh" }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column">
        {alertVisible && (
          <Alert
            message={alertMessage}
            bottomVH={"40vh"}
            alertType={alertType}
            onClose={() => setAlertVisible(false)}
          />
        )}
      </div>
      {alertFieldVisible && (
        <AlertFieldInfo
          message={alertFieldMessage}
          bottomVH={alertFieldBottom}
          leftVW={42}
        />
      )}
    </>
  );
}

export default EmployeeForm;
