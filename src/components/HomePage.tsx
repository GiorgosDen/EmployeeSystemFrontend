import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GetAllEmployeesData from "../functions/GetAllEmployeesData";
import Timer from "./Timer";
import EmployeeForm from "./EmployeeForm";
import DeleteEmployee from "../functions/DeleteEmployee";
import Alert from "./Alert";

interface Employee {
  employeeAFM: number;
  employeeFullName: string;
  employeeJob: string;
  employeeAge: number;
  employeeEmail: string;
  employeeDescription: string;
}

function HomePage() {
  //variables
  const { state } = useLocation();
  const navigate = useNavigate();
  const nowTime = new Date();
  //Hooks
  const [emplInfo, setEmplInfo] = useState([
    "Select a Employee",
    "----------",
    "Email",
    "Job Title",
    0,
    "Description",
  ]);
  const [employeesAPI, setEmployeesAPI] = useState<Employee[]>([]);
  const [selectEmplIndex, setSelectEmplIndex] = useState(-1);
  const [FormVisible, setFormVisible] = useState(false);
  const [employeeFormRole, setEmplFormRole] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const callAPIforEmployees = async () => {
    //Load all employees from API using the GetAllEmployeesData function
    const employeesAPIRes = await GetAllEmployeesData(state.accessToken);
    const employeesAPIData: Employee[] = Object.values(employeesAPIRes);
    setEmployeesAPI(employeesAPIData);
  };
  //Effect
  useEffect(() => {
    callAPIforEmployees();
  }, []);

  //Functions
  //1.changes emplInfo state
  function handleClick(id: number) {
    const selectedEmpl = employeesAPI[id];
    const emplInfoArray = [
      selectedEmpl.employeeFullName,
      selectedEmpl.employeeAFM,
      selectedEmpl.employeeEmail,
      selectedEmpl.employeeJob,
      selectedEmpl.employeeAge,
      selectedEmpl.employeeDescription,
    ];
    setEmplInfo(emplInfoArray);
  }
  //2. Logout
  function logOutHandler() {
    //clear access token
    state.accessToken = "";
    //navigate to login page
    navigate("/");
  }

  //3. Handle delete
  const handleDeleteEmployee = async () => {
    if (selectEmplIndex >= 0) {
      const message = await DeleteEmployee(
        state.accessToken,
        emplInfo[1],
        state.roles
      );
      setAlertMessage(message);
      setAlertVisible(true);
      await callAPIforEmployees();
    } else {
      setAlertMessage("Select an Employee to delete");
      setAlertVisible(true);
    }
  };
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "rgb(90, 130, 255)",
        }}
      >
        <div
          className="d-flex flex-column"
          style={{
            width: "90vw",
            height: "90vh",
            backgroundColor: "rgb(255, 250, 230)",
            borderRadius: "2vh",
            marginLeft: "5vw",
            marginTop: "5vh",
          }}
        >
          <nav
            className="d-flex flex-row justify-content-between align-self-center"
            style={{
              backgroundColor: "rgb(255, 250, 230)",
              paddingBottom: "1vh",
              marginBottom: "2vh",
              borderRadius: "2vh 2vh 0vh 0vh ",
              borderBottomStyle: "solid",
              borderColor: "rgb(90, 130, 255)",
              borderWidth: "1vh",
              width: "90vw",
            }}
          >
            <div
              className="flex-xxl-fill"
              style={{
                marginLeft: "35vw",
                marginTop: 10,
              }}
            >
              <h1>Home Page</h1>
              <p style={{ marginBottom: 1 }}>Welcome {state.username}</p>
            </div>
            <div
              className="d-flex justify-content-around align-items-end"
              style={{
                marginLeft: 100,
                width: "20vw",
              }}
            >
              <h6 style={{ marginBottom: 0 }}>
                {" "}
                Time Left:
                {
                  //Timer
                  //timeProperty (timePro)= the time after 2 min has login - the current time
                  <Timer
                    timePro={Math.floor(
                      (state.timerEnd - nowTime.getTime()) / 1000 //divide by 1000 to take seconds
                    )}
                  />
                }
              </h6>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  logOutHandler();
                }}
              >
                Logout
              </button>
            </div>
          </nav>
          <div
            className="d-flex"
            style={{ height: "100vh", paddingTop: "2vh" }}
          >
            <aside className="col " style={{ paddingLeft: "5vw" }}>
              <h3
                style={{
                  borderBottomStyle: "solid",
                  borderColor: "rgb(90, 130, 255)",
                  borderWidth: "1px",
                }}
              >
                Employees
              </h3>
              <nav
                className="navbar-nav-scroll d-flex justify-content-center"
                style={{
                  height: "50vh",
                }}
              >
                <ul
                  className="list-group list-group-flush"
                  style={{ width: "29vw" }}
                >
                  {
                    //Employees Names
                    employeesAPI.map((emp, index) => (
                      <li
                        key={index}
                        className="list-group-item"
                        style={{
                          backgroundColor:
                            selectEmplIndex === index
                              ? "rgb(200,240,255)"
                              : "rgb(150, 200, 255)",
                        }}
                        onClick={() => {
                          setSelectEmplIndex(index);
                          handleClick(index);
                        }}
                      >
                        {emp.employeeFullName}
                      </li>
                    ))
                  }
                </ul>
              </nav>
              <button
                className="btn btn-success"
                style={{ marginTop: "1vh" }}
                onClick={() => {
                  setFormVisible(true);
                  setEmplInfo([
                    "Select a Employee",
                    "----------",
                    "Email",
                    "Job Title",
                    0,
                    "Description",
                  ]);
                  setEmplFormRole("Add");
                }}
              >
                Add
              </button>
            </aside>
            <main
              className="col d-flex flex-column align-items-center"
              style={{ paddingRight: "5vw" }}
            >
              {
                //Bootsrap card
              }
              <div
                className="card text-bg-info "
                style={{ width: "45vw", height: "65vh", marginLeft: "5vw" }}
              >
                <div className="card-header ">
                  <h3>Selected Employee</h3>
                </div>
                <div className="card-body ">
                  <h5 className="card-title">Name: {emplInfo[0]}</h5>
                  <p className="card-text">
                    AFM: {emplInfo[1]}, Age: {emplInfo[4]}
                  </p>
                  <p className="card-text">email: {emplInfo[2]}</p>
                  <p className="card-text">Job: {emplInfo[3]}</p>
                  <div className="card-text">About: {emplInfo[5]}</div>
                  <div
                    className=" d-flex justify-content-evenly"
                    style={{
                      margin: "2vh",
                      width: "35vw",
                    }}
                  >
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => {
                        setFormVisible(true);
                        setEmplFormRole("Update");
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteEmployee()}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
          {FormVisible && (
            <EmployeeForm
              formRole={employeeFormRole}
              EmployeeF={emplInfo}
              extraData={{
                token: state.accessToken,
                roles: state.roles,
                currAFM: emplInfo[1],
              }}
              onClose={async () => {
                setSelectEmplIndex(-1);
                setEmplInfo([
                  "Select a Employee",
                  "----------",
                  "Email",
                  "Job Title",
                  0,
                  "Description",
                ]);
                setFormVisible(false);
                await callAPIforEmployees();
              }}
            />
          )}
          <div className="d-flex justify-content-center align-items-center flex-column">
            {alertVisible && (
              <Alert
                message={alertMessage}
                bottomVH={"30vh"}
                alertType="alert-danger"
                onClose={() => setAlertVisible(false)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
