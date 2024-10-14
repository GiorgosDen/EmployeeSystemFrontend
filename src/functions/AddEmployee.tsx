import axios from "axios";

interface Employee {
  employeeAFM: number | string;
  employeeFullName: number | string;
  employeeJob: number | string;
  employeeAge: number | string;
  employeeEmail: number | string;
  employeeDescription: number | string;
  userID: number;
}

export default async function AddEmployee(
  token: String,
  emplRoles: number[],
  addEmployee: Employee
) {
  try {
    await axios.post(
      "http://localhost:3500/homePage",
      {
        roles: emplRoles,
        data: {
          afm: addEmployee.employeeAFM,
          fullname: addEmployee.employeeFullName,
          job: addEmployee.employeeJob,
          age: addEmployee.employeeAge,
          email: addEmployee.employeeEmail,
          description: addEmployee.employeeDescription,
          userId: addEmployee.userID,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return `Employee with AFM:${addEmployee.employeeAFM}, created`;
  } catch (error) {
    //if the error is from axios
    if (axios.isAxiosError(error)) {
      //If the token has expired (status code 403)
      if (error.response?.status === 403) {
        return `Create Error: Your Access Token has expired.`;
      }
      //If we have afm conflict (status code 409)
      if (error.response?.status === 409) {
        return `Create Error: The AFM already used`;
      }
      //In that case, the user is not autorized (status code 401)
      return `Create Error: You are not authorized to create Employees`;
    }
    return "Something is going wrong, please try again!!!";
  }
}
