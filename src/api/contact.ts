import axios from "axios";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

interface ContactForm {
  fullName: string;
  //   countryCode?: string;
  phoneNumber: string;
  emailId: string;
  companyName: string;
  otherInformation: string;
  whoAmI: number | null;
  //   acceptTerms?: boolean;
}
export const CreateContact = async (body: ContactForm) => {
  try {
    const response = await axios.post(`${API_URL}/contact-us/create`, body);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

interface inquiryForm {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  city: number | null;
  whoAmI: string;
  termsAggrement: boolean;
}

export const CreateInquiry = async (body: inquiryForm) => {
  try {
    const response = await axios.post(`${API_URL}/inquiry/create`, body);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

interface Askexp{
  fullName: string;
  emailId: string;
  countryCode: string;
  phoneNumber: string;
  city: number | null;
  termsAggrement: boolean;
}

export const AskExperts = async (body: Askexp) => {
  try {
    const response = await axios.post(`${API_URL}/expert/create`, body);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching");
  }
};
