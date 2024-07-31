import axios from "axios";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const getBrandDetails = async (Id: number) => {
  try {
    const response = await axios.get(`${API_URL}/form-details/detail/${Id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching");
  }
};
