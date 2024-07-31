import axios from "axios";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

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
  city?: number | null;
  pincode?: string | null;
  // educationQualification?: number | null;
  // occupation?: number | null;
  industryType?: number | null;
  investmentRange?: number | null;
  availableCapital?: number | null;
  needForLoan?: boolean | null;
  likeToInvest?: number | null;
  lookingFor?: number | null;
  lookingForState?: [];
  lookingForCity?: [];
  ownProperty?: boolean | null;
}

interface GetVerifyOtp {
  phoneNumber: string | null;
  countryCode: string | null;
  submittedOTP: string | null;
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

export const GetOtp = async (body: GetInvestorDataProps) => {
  try {
    const response = await axios.post(`${API_URL}/form-details/getOTP`, body);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

export const VerifyOtp = async (body: GetVerifyOtp) => {
  try {
    const response = await axios.post(`${API_URL}/form-details/verifyOTP`, body);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching");
  }
};
