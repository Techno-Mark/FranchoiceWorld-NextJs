import axios from "axios";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const getData = async (param: string) => {
  if (param === "/") {
    param = "/home";
  }
  try {
    const response = await axios.get(`${API_URL}${param}.json`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching");
  }
};
