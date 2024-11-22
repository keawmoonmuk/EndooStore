import axios from "axios";

//create product
export const createProduct = async (token, form) => {
  return axios.post("http://localhost:5555/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//list product
export const listProduct = async (count = 20) => {
  return axios.get("http://localhost:5555/api/products/" + count);
};

//read product by id
export const readProduct = async (token, id) => {
  return axios.get("http://localhost:5555/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//delete product by id
export const deleteProduct = async (token, id) => {
  // console.log("token: " , token);
  // console.log("id: " , id);

  return axios.delete("http://localhost:5555/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//update product
export const updateProduct = async (token, id, form) => {
  return axios.put("http://localhost:5555/api/product/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//upload files
export const uploadFiles = async (token, form) => {
  // console.log(data);
  return axios.post(
    "http://localhost:5555/api/images",
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
//upload files
export const removeFiles = async (token, public_id) => {
  // console.log(data);
  return axios.post(
    "http://localhost:5555/api/removeimages",
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//search filter product
export const searchFilters = async (arg) => {
  return axios.post("http://localhost:5555/api/search/filters", arg);
};

//product by
export const listProductBy = async (sort, order, limit) => {
  return axios.post("http://localhost:5555/api/productby", {
    sort,
    order,
    limit,
  });
};
