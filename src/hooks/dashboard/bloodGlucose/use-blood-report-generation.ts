import * as React from 'react';
import { bloodReportTemplate } from './blood-report-template';
import { ReportData } from '@/types';

// Type for extracted raw data from the blood report image
interface ExtractedBloodData {
  userInformation: {
    name: string;
    age: number;
    sex: string;
  };
  reportInformation: {
    currentLabReportSampleDate: string;
    currentLabReportResultDate: string;
  };
  reportData: Record<string, number | null>;
}

interface BloodReportGenerationState {
  isUploading: boolean;
  uploadedFile: File | null;
  uploadError: string | null;
  previewUrl: string | null;
  isProcessing: boolean;
  extractedData: ExtractedBloodData | null;
  finalReportData: ReportData | null;
  processingError: string | null;
}

interface BloodReportGenerationActions {
  uploadFile: (file: File) => void;
  removeFile: () => void;
  resetState: () => void;
  processImage: () => Promise<void>;
  generateFinalReport: () => void;
}

/**
 * This hook do steps shown below:
 * 1. Retrieve blood report image from user uploads
 * 2. Process the image to extract RAW data
 * 3. Generate a structured blood report json structure based on the extracted data
 */
const useBloodReportGeneration = (): BloodReportGenerationState & BloodReportGenerationActions => {
  const [state, setState] = React.useState<BloodReportGenerationState>({
    isUploading: false,
    uploadedFile: null,
    uploadError: null,
    previewUrl: null,
    isProcessing: false,
    extractedData: null,
    finalReportData: null,
    processingError: null,
  });

  // Step 1: Retrieve blood report image from user uploads
  const uploadFile = React.useCallback((file: File) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setState(prev => ({
        ...prev,
        uploadError: 'Please upload a valid image file (JPEG, PNG, WebP) or PDF document.',
      }));
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setState(prev => ({
        ...prev,
        uploadError: 'File size must be less than 10MB.',
      }));
      return;
    }

    setState(prev => ({
      ...prev,
      isUploading: true,
      uploadError: null,
    }));

    // Create preview URL for images
    let previewUrl: string | null = null;
    if (file.type.startsWith('image/')) {
      previewUrl = URL.createObjectURL(file);
    }

    // Simulate upload process (replace with actual upload logic)
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        isUploading: false,
        uploadedFile: file,
        previewUrl,
        uploadError: null,
      }));
    }, 1000);
  }, []);

  const removeFile = React.useCallback(() => {
    // Clean up preview URL to prevent memory leaks
    if (state.previewUrl) {
      URL.revokeObjectURL(state.previewUrl);
    }

    setState(prev => ({
      ...prev,
      uploadedFile: null,
      previewUrl: null,
      uploadError: null,
    }));
  }, [state.previewUrl]);

  const resetState = React.useCallback(() => {
    // Clean up preview URL
    if (state.previewUrl) {
      URL.revokeObjectURL(state.previewUrl);
    }

    setState({
      isUploading: false,
      uploadedFile: null,
      uploadError: null,
      previewUrl: null,
      isProcessing: false,
      extractedData: null,
      finalReportData: null,
      processingError: null,
    });
  }, [state.previewUrl]);

  // Step 2: Process the image to extract RAW data
  const processImage = React.useCallback(async (): Promise<void> => {
    if (!state.uploadedFile) {
      setState(prev => ({
        ...prev,
        processingError: 'No file uploaded to process.',
      }));
      return;
    }

    setState(prev => ({
      ...prev,
      isProcessing: true,
      processingError: null,
    }));

    try {
      // Simulate image processing (replace with actual OCR/AI processing)
      // In a real implementation, this would call an API to process the image
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock extracted data (based on BloodReportOutputExample.json)
      const mockExtractedData: ExtractedBloodData = {
        userInformation: {
          name: "Johnatan Doe",
          age: 30,
          sex: "Male"
        },
        reportInformation: {
          currentLabReportSampleDate: "2024-07-23T14:52:00Z",
          currentLabReportResultDate: "2024-07-23T14:52:00Z"
        },
        reportData: {
          "Haemoglobin (HGB)": 13.5,
          "Red Blood Cells": 14.5,
          "Haematocrit (HCT)": 40.1,
          "Mean Cell Volume (MCV)": null,
          "Red Cell Distribution Width (RDW)": null,
          "Mean Cell Haemoglobin (MCH)": null,
          "MCHC": null,
          "Platelets": 250,
          "Platelet Volume (MPV)": null,
          "White Blood Cells": 7.2,
          "Neutrophils": null,
          "Monocytes": null,
          "Basophils": null,
          "Eosinophils": null,
          "Lymphocytes": null,
          "Ferritin": null,
          "Iron": null,
          "T.I.B.C": null,
          "Transferin Saturation": null,
          "ESR": null,
          "Hs C-Reactive Protein (hsCRP)": null,
          "Homocysteine": null,
          "Calcium": null,
          "Calcium/Albumin Ratio": null,
          "Sodium": null,
          "Potassium": null,
          "Sodium/Potassium Ratio": null,
          "Chloride": null,
          "Phosphate/ Phosphorus": null,
          "Anion cap": null,
          "Magnesium": null,
          "Globulin": null,
          "Albumin": 4.5,
          "Albumin/Globulin Ratio": null,
          "Total Protein": null,
          "Glucose": 5,
          "HbA1c": null,
          "Fructosamine": null,
          "Fasting Insulin": null,
          "Cystatin C": null,
          "Urea": 0.48,
          "Creatinine": 79.56,
          "eGFR(MDRD)(Caucasian only)": null,
          "Blood Urea Nitrogenn (BUN)": null,
          "Aspartate Aminotransferase (AST)": 30,
          "Alk Phosphatase (ALP)": 70,
          "Alanine Transaminase (ALT)": 25,
          "Gamma-Glutamyl Transferase (GGT)": null,
          "Total Bilirubin": 1.2,
          "Lactase dehydrogenase (LDH)": null,
          "Creatine Kinase (CK)": null,
          "Cholesterol (Total)": 4.79,
          "High-Density Lipoprotein (HDL)": null,
          "Low-Density Lipoprotein (LDL)": null,
          "Triglycerides (TG)": null,
          "Non-HDL": null,
          "Chol:HDL ratio": null,
          "Uric acid": null,
          "Cortisol (Random)": null,
          "Testosterone": null,
          "Free-Testosterone (Calculated)": null,
          "Prolactin": null,
          "Oestradiol": null,
          "Progesterone": null,
          "Luteinizing Hormone (LH)": null,
          "Follicle-Stimulating Hormone (FSH)": null,
          "DHEA-Sulphate": null,
          "Sex Hormone Binding Globulin (SHBG)": null,
          "Thyroid Stimulating Hormone (TSH)": 2.1,
          "Free T4 (Thyroxine)": 1.2,
          "Free T3 (Triiodothyronine)": null,
          "Reverse T3 (RT3)": null,
          "Anti-Thyroid Peroxidase Antibodies (Anti-TPO Abs)": null,
          "Anti-Thyroglobulin Antibodies (Anti-Tg Abs)": null,
          "Total PSA": null,
          "Vitamin D (25 OH)": null,
          "B12-Active": null,
          "B6(Pyridoxine)": null,
          "B9(Folate)": null
        }
      };

      setState(prev => ({
        ...prev,
        isProcessing: false,
        extractedData: mockExtractedData,
        processingError: null,
      }));

    } catch {
      setState(prev => ({
        ...prev,
        isProcessing: false,
        processingError: 'Failed to process the image. Please try again.',
      }));
    }
  }, [state.uploadedFile]);

  // Step 3: Generate a structured blood report JSON structure based on the extracted data
  const generateFinalReport = React.useCallback(() => {
    if (!state.extractedData) {
      setState(prev => ({
        ...prev,
        processingError: 'No extracted data available to generate report.',
      }));
      return;
    }

    try {
      // Clone the template
      const finalReport: ReportData = structuredClone(bloodReportTemplate);

      // Update user information
      finalReport.userInformation = {
        ...finalReport.userInformation,
        name: state.extractedData.userInformation.name,
        age: state.extractedData.userInformation.age,
        sex: state.extractedData.userInformation.sex,
      };

      // Update report information
      finalReport.reportInformation = {
        ...finalReport.reportInformation,
        currentLabReportSampleDate: state.extractedData.reportInformation.currentLabReportSampleDate,
        currentLabReportResultDate: state.extractedData.reportInformation.currentLabReportResultDate,
        generatedDate: new Date().toISOString(),
      };

      // Map extracted data to lab result analysis items
      for (const category of finalReport.labResultAnalysisSection.data) {
        for (const item of category.items) {
          const extractedValue = state.extractedData?.reportData[item.id];
          if (extractedValue !== undefined) {
            item.latestValue = extractedValue;
          }
        }
      }

      setState(prev => ({
        ...prev,
        finalReportData: finalReport,
        processingError: null,
      }));

    } catch {
      setState(prev => ({
        ...prev,
        processingError: 'Failed to generate final report. Please try again.',
      }));
    }
  }, [state.extractedData]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (state.previewUrl) {
        URL.revokeObjectURL(state.previewUrl);
      }
    };
  }, [state.previewUrl]);

  return {
    // State
    isUploading: state.isUploading,
    uploadedFile: state.uploadedFile,
    uploadError: state.uploadError,
    previewUrl: state.previewUrl,
    isProcessing: state.isProcessing,
    extractedData: state.extractedData,
    finalReportData: state.finalReportData,
    processingError: state.processingError,
    // Actions
    uploadFile,
    removeFile,
    resetState,
    processImage,
    generateFinalReport,
  };
};

export default useBloodReportGeneration;