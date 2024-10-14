import axios from "axios";

interface Employee {
  employeeAFM: number | string;
  employeeFullName: number | string;
  employeeJob: number | string;
  employeeAge: number | string;
  employeeEmail: number | string;
  employeeDescription: number | string;
}

export default async function UpdateEmployee(
  token: String,
  emplRoles: number[],
  currEmplAFM: number | string,
  updEmployee: Employee
) {
  try {
    await axios.put(
      "http://localhost:3500/homePage",
      {
        roles: emplRoles,
        currentAFM: currEmplAFM,
        data: {
          afm: updEmployee.employeeAFM,
          fullname: updEmployee.employeeFullName,
          job: updEmployee.employeeJob,
          age: updEmployee.employeeAge,
          email: updEmployee.employeeEmail,
          description: updEmployee.employeeDescription,
        },
      },
      {
        headers: {
          Authorization: `Bear ${token}`,
        },
      }
    );
    return `Employee with AFM:${currEmplAFM}, updated`;
  } catch (error) {
    //if the error is from axios
    if (axios.isAxiosError(error)) {
      //If the token has expired (status code 403)
      if (error.response?.status === 403) {
        return `Update Error: Your Access Token has expired.`;
      }
      //If we have afm conflict (status code 409)
      if (error.response?.status === 409) {
        return `Update Error: The new AFM already used`;
      }
      //In that case, the user is not autorized (status code 401)
      return `Update Error: You are not authorized to update Employees`;
    }
    return "Something is going wrong, please try again!!!";
  }
}
