export type Metric = {
  title: string;
  description: string;
  minValue: number;
  maxValue: number;
  recommendedMin: number;
  recommendedMax: number;
  latestValue: number;
  previousValue: number;
  unit: string;
}

export type UserInformation = {
  name: string;
  age: number;
  sex: string;
  dob: string;
}

export type ReportInformation = {
  generatedDate: string;
  currentLabReportResultDate: string;
  previousLabReportResultDate: string;
  currentLabReportSampleDate: string;
  previousLabReportSampleDate: string;
}

export type IntroductionSection = {
  title: string;
  description: string;
  data: {
    title: string;
    description: string;
  }[];
}

export type PatientHealthOverviewSection = {
  title: string;
  description: string;
  data: {
    title: string;
    description: string;
  }[];
}

export type LabResultAnalysisDataType = {
  id: string;
  title: string;
  description: string;
  minValue: number;
  maxValue: number;
  womanMinValue: number | null;
  womanMaxValue: number | null;
  recommendedMin: number;
  recommendedMax: number;
  womanRecommendedMin: number | null;
  womanRecommendedMax: number | null;
  latestValue: number | null;
  previousValue: number | null;
  unit: string;
  explaination: string | null;
}

export type LabResultAnalysisSection = {
  title: string;
  description: string;
  data: {
    category: string;
    items: LabResultAnalysisDataType[];
  }[];
}

export type AssessmentSection = {
  title: string;
  description: string;
  data: Record<string, unknown>;
}

export type RecommendationSection = {
  title: string;
  description: string;
  data: {
    diet: {
      title: string;
      description: string;
      category: {
        categoryName: string;
        include: string[];
        avoid: string[];
      }[];
      generalSuggestions: string[];
    };
  };
}

export type ReportData = {
  title: string;
  userInformation: UserInformation;
  reportInformation: ReportInformation;
  introductionSection: IntroductionSection;
  patientHealthOverviewSection: PatientHealthOverviewSection;
  labResultAnalysisSection: LabResultAnalysisSection;
  assessmentSection: AssessmentSection;
  recommendationSection: RecommendationSection;
  metrics: Metric[];
}