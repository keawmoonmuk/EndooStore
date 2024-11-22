import axios from "axios";

export const currentUser = async (token) =>
 await axios.post(
    "http://localhost:5555/api/current-user",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export  const currentAdmin =async (token) => {
  return await axios.post(
    "http://localhost:5555/api/current-admin",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export  const loginUser =async (form) => {
  return await axios.post("http://localhost:5555/api/login",form, );
};

export  const registerUser =async (form) => {
  return await axios.post(
    "http://localhost:5555/api/register",form
  );
};



