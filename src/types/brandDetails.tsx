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
