import axios from "axios";

export const getImages = async () => {
  return axios.get("https://picsum.photos/v2/list?page=1&limit=15" );
};


