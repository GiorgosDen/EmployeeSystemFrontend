import axios from "axios";

export default async function GetAllEmployeesData(token: String) {
  try {
    const res = await axios.get("http://localhost:3500/homePage", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const employees = await res.data;
    //console.log(employees);
    return employees;
  } catch (error) {
    //console.log("Error while pull employees' data: " + error);
  }
}
