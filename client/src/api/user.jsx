import axios from "axios";

//create user cart
export const createUserCart = async (token, cart) => {
  // code body
  return axios.post("http://localhost:5555/api/user/cart", cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//list user cart
export const listUserCart = async (token) => {
  return axios.get("http://localhost:5555/api/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const saveUserAddress = async (token, address) => {
  return axios.post(
    "http://localhost:5555/api/user/address",
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const saveOrder = async (token, payload) => {
  return axios.post("http://localhost:5555/api/user/order", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getOrder = async (token) => {
  return axios.get("http://localhost:5555/api/user/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
