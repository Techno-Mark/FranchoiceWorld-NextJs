import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ContactForm {
    fullName: string;
    countryCode: string;
    phoneNumber: string;
    emailId: string;
    companyName: string;
    otherInformation: string;
    whoAmI: string;
    acceptTerms: boolean;
  }
export const CreateContact = async (body: ContactForm) => {
    try {
      const response = await axios.post(
        `${API_URL}/contact-us/create`,
        body
      );
      return response.data;
    } catch (error) {
      throw new Error("Error fetching");
    }
  };