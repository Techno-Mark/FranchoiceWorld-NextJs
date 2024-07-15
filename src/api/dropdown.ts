import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getIndustry = async (param: string) => {
  try {
    const response = await axios.get(`${API_URL}${param}`);
    return response.data.ResponseData;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

export const getSubCategory = async (param: string, body: any) => {
  try {
    const response = await axios.post(`${API_URL}${param}`, body);
    return response.data.ResponseData;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

export const getService = async (param: string, body: any) => {
  try {
    const response = await axios.post(`${API_URL}${param}`, body);
    return response.data.ResponseData;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

export const getState = async (param: string) => {
  try {
    const response = await axios.get(`${API_URL}${param}`);
    return response.data.ResponseData;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

export const getCity = async (param: string, body: any) => {
  try {
    const response = await axios.post(`${API_URL}${param}`, body);
    return response.data.ResponseData;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

export const getAreaRequired = async (param: string) => {
  try {
    const response = await axios.get(`${API_URL}${param}`);
    return response.data.ResponseData;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

export const getInvestmentRange = async (param: string) => {
  try {
    const response = await axios.get(`${API_URL}${param}`);
    return response.data.ResponseData;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

export const getSalesRevanue = async (param: string) => {
  try {
    const response = await axios.get(`${API_URL}${param}`);
    return response.data.ResponseData;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

export const getPaybackProvide = async (param: string) => {
  try {
    const response = await axios.get(`${API_URL}${param}`);
    return response.data.ResponseData;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

export const getSupportProvide = async (param: string) => {
  try {
    const response = await axios.get(`${API_URL}${param}`);
    return response.data.ResponseData;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

export const getHeadquarters = async (param: string) => {
  try {
    const response = await axios.get(`${API_URL}${param}`);
    return response.data.ResponseData;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

export const getOutlets = async (param: string) => {
  try {
    const response = await axios.get(`${API_URL}${param}`);
    return response.data.ResponseData;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

export const getLookingFor = async () => {
  try {
    const response = await axios.get(`${API_URL}/dropdown/looking-for`);
    return response.data.ResponseData;
  } catch (error) {
    throw new Error("Error fetching");
  }
};
export const getInvestmentDuration = async () => {
  try {
    const response = await axios.get(`${API_URL}/dropdown/investment-durations`);
    return response.data.ResponseData;
  } catch (error) {
    throw new Error("Error fetching");
  }
};
