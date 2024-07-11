import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface GetDataProps {
  data: {
    phoneNumber: string;
    countryCode: string;
  };
}

export const getInvestorData: React.FC<GetDataProps> = async ({ data }) => {
  try {
    const response = await axios.post(`${API_URL}/investor-details/get`, data);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching");
  }
};
