import axios from "axios";

export default async function DeleteEmployee(
  token: String,
  emplAFM: number | string,
  emplRoles: number[]
) {
  try {
    await axios.delete("http://localhost:3500/homePage", {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        roles: emplRoles,
        data: {
          afm: emplAFM,
        },
      },
    });
    return `The Employee with AFM:${emplAFM}, deleted successfully`;
  } catch (error) {
    //if the error is from axios
    if (axios.isAxiosError(error)) {
      //If the token has expired (status code 403)
      if (error.response?.status === 403) {
        return `Delete Error: Your Access Token has expired.`;
      }
      //In that case, the user is not autorized (status code 401)
      return `Delete Error: You are not authorized to delete Employees`;
    }
    return "Something is going wrong, please try again!!!";
  }
}
