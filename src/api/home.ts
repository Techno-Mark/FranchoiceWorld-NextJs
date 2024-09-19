import axios from "axios";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

interface EventRegisterProp {
  name: string;
  email: string;
  phoneNumber: string;
  state: number[];
  city: number[];
}

const extractErrorMessage = (error: any) => {
  if (error.response) {
    const data = error.response.data;
    if (data.ResponseStatus === "failure") {
      return data.Message || "An unknown error occurred";
    }
    return "An unknown error occurred";
  }
  return "An unknown error occurred";
};

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

export const getFranchiseList = async (param: string) => {
  try {
    const response = await axios.get(`${API_URL}${param}`);
    return response.data.ResponseData.brands;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

export const eventRegister = async (param: EventRegisterProp) => {
  try {
    const response = await axios.post(`${API_URL}/register-eventdetails/create` ,param);

    if (response.data.ResponseStatus === "failure") {
      const errorMessage = response.data.Message || "An unknown error occurred";
      return { success: false, message: errorMessage };
    } else {
      return { success: true, data: response.data.ResponseData };
    }
  } catch (error: any) {
    console.error("Error registering event:", error);
    throw new Error(error);
  }
};
