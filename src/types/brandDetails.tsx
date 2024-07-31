// Banner (About us)
interface MediaProps {
  type: "image" | "video";
  src: string;
  thumb?: string;
}
interface BrandContent {
  brandTitle?: string;
  brandDesc: string;
  media: MediaProps[];
}

// USP section
interface UspPointProps {
  imagePath: string;
  uspPoints: string[];
}

// Expansion Plan
interface PlanDetail {
  planTitle: string;
  planDesc: string;
}
interface ExpansionProps {
  brandName?: string;
  plans: PlanDetail[];
}

// Training
interface TrainingItemsProps {
  label: string;
  value: string;
}
interface TrainingProps {
  brandName: string;
  trainingItems: TrainingItemsProps[];
}

// Cost & Investment
interface OperationProps {
  commenced: string;
  franchiseCommenced: string;
}

interface FranchiseDetailsProps {
  investment: string;
  likelyPayBackPeriod: string;
  industry: string;
  franchiseModel: string[];
}

interface FranchiseCostInvestmentProps {
  operations: OperationProps;
  franchiseDetails: FranchiseDetailsProps;
}
