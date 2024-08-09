interface iconProps {
  className?: string;
  color?: string;
}

interface InvestorDataResponse {
  id: number;
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  address: string;
  country: number | null;
  state: number | null;
  city: number | null;
  pincode: number | null;
  educationQualification: number | null;
  occupation: number | null;
  industryType: number | null;
  investmentRange: number;
  availableCapital: number | null;
  needForLoan: boolean;
  likeToInvest: number | null;
  lookingFor: number | null;
  lookingForState: number | null;
  lookingForCity: number | null;
  ownProperty: boolean;
}

interface ApiResponse {
  ResponseData: InvestorDataResponse;
}
interface BusinessOpportunity {
  id?: number;
  title: string;
  category: string;
  image?: string;
  investmentRange: string;
  areaRequired: string;
  franchiseOutlet: string;
  favorite: boolean;
}

interface TopBrandSliderProps {
  sectionTitle: string;
  items: BusinessOpportunity[];
}