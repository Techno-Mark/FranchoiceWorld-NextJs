import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface GetInvestorDataProps {
  phoneNumber: string | null;
  countryCode: string | null;
}

interface CreateInvestorDataProps {
  fullName?: string | null;
  email?: string | null;
  countryCode: string | null;
  phoneNumber: string | null;
  address?: string | null;
  country?: number | null;
  state?: number | null;
  city?: number | null;
  pincode?: string | null;
  educationQualification?: number | null;
  occupation?: number | null;
  industryType?: number | null;
  investmentRange?: number | null;
  availableCapital?: number | null;
  needForLoan?: boolean | null;
  likeToInvest?: number | null;
  lookingFor?: number | null;
  lookingForState?: string[] | null;
  lookingForCity?: string[] | null;
  ownProperty?: boolean | null;
}

export const getInvestorData = async (data: GetInvestorDataProps) => {
  try {
    const response = await axios.post(`${API_URL}/investor-details/get`, data);
    return response.data.ResponseData;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

export const CreateInvestorData = async (body: CreateInvestorDataProps) => {
  try {
    const response = await axios.post(
      `${API_URL}/investor-details/create`,
      body
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching");
  }
};
