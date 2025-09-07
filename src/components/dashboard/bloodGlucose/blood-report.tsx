'use client';

import * as React from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import type { ReportData, LabResultAnalysisDataType } from '@/types/health';
import '../../../../public/css/blood-report.css';
import { Printer } from '@phosphor-icons/react';
import images from '@/constants/images';
import Image from 'next/image';
import TitleDescription from './title-description';
import { LabResultAnalysis } from './lab-result-analysis';

interface BloodReportProps {
  data: ReportData;
  onEdit: (categoryIndex: number, itemIndex: number, item: LabResultAnalysisDataType) => void;
  onAddItem: (categoryIndex: number) => void;
  onAddCategory: () => void;
  onDeleteItem: (categoryIndex: number, itemIndex: number) => void;
  isEditing?: boolean;
}

  const handlePrint = async () => {
    const printContent = document.querySelector('#printable-report');
    if (!printContent) return;

    try {
      // Fetch CSS content from file
      const cssResponse = await fetch('/css/blood-report.css');
      const cssContent = await cssResponse.text();

      const printWindow = globalThis.open('', '_blank');
      if (!printWindow) return;

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Blood Report</title>
            <meta charset="utf-8">
            <style>
              /* Reset and base styles */
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              
              /* Include the fetched CSS */
              ${cssContent}
              
              /* Additional print-specific overrides */
              @media print {
                @page {
                  margin: 0.5in;
                  size: A4 portrait;
                }
                
                body {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);

      printWindow.document.close();
      
      // Wait for content and styles to load
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 500); // Increased timeout to ensure CSS loads
      
    } catch (error) {
      console.error('Failed to load CSS file:', error);
      
      // Fallback with inline styles
      const printWindow = globalThis.open('', '_blank');
      if (!printWindow) return;
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Blood Report</title>
            <meta charset="utf-8">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              
              #printable-report h1 { font-size: 48px; font-weight: 700; margin-bottom: 16px; }
              #printable-report h4 { font-size: 18px; font-weight: 500; margin-bottom: 8px; }
              #printable-report small { font-size: 12px; opacity: 0.8; display: block; }
              
              .print-cover {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 40px;
                page-break-after: always;
              }
              
              .print-cover * { color: white; }
              
              @media print {
                @page { margin: 0.5in; size: A4 portrait; }
                body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                .print-cover { 
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                  min-height: 100vh !important;
                  page-break-after: always !important;
                }
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      
      printWindow.document.close();
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };


export function BloodReport({ data, onEdit, onAddItem, onAddCategory, onDeleteItem, isEditing = false }: BloodReportProps): React.JSX.Element {


  return (
    <Box sx={{ '@media print': { '& .no-print': { display: 'none !important' } } }}>
      {/* Header with Print Button */}
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{ mb: 3 }}
        className="no-print"
      >
        <Typography variant="h4" component="h1">
          {data.title}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Printer />}
          onClick={handlePrint}
        >
          Print Report
        </Button>
      </Stack>

      {/* Print Section */}
      <div id='printable-report'>
        {/* Banner Page */}
        <div className='hero-section'>
            {/* Top Section */}
            <div className='hero-top'>
                <Image src={images.signsbeatLogo} alt='Company Logo' className='print-hero-logo' width={250} />
            </div>

            {/* Mid Section */}
            <div className='hero-mid'>
                <small>Prepared for</small>
                <h1>{data.userInformation.name}</h1>
                <h4>Optimized Lifestyle Recommendations</h4>
            </div>

            {/* Bottom Section */}
            <div className='hero-bottom'>
                <div>
                    <h6><b>Date of Birth</b></h6>
                    <h6><b>Age</b></h6>
                    <h6><b>Sex</b></h6>
                    <h6><b>Generated on:</b></h6>
                    <h6><b>Based on the lab results dated:</b></h6>
                </div>
                <div>
                    <h6>{data.userInformation.dob}</h6>
                    <h6>{data.userInformation.age}</h6>
                    <h6>{data.userInformation.sex}</h6>
                    <h6>{data.reportInformation.generatedDate}</h6>
                    <h6>{data.reportInformation.currentLabReportSampleDate}</h6>
                </div>
            </div>

        </div>

        {/* Introduction Page */}
        <div className='intro-section'>
            <h2 className='component-title'>{data.introductionSection.title}</h2>

            {data.introductionSection.data.map((item, index) => (
                <TitleDescription key={index} title={item.title} description={item.description}/>
            ))}
        </div>

        {/* Patient Health Overview Page */}
        <div className='patient-health-overview-section'>
          <h2 className='component-title'>{data.patientHealthOverviewSection.title}</h2>

          {data.patientHealthOverviewSection.data.map((item, index) => (
            <TitleDescription key={index} title={item.title} description={item.description}/>
          ))}
        </div>

        {/* Lab Result Analysis Page */}
        <LabResultAnalysis
          data={data.labResultAnalysisSection}
          onEdit={onEdit}
          onAddItem={onAddItem}
          onAddCategory={onAddCategory}
          onDeleteItem={onDeleteItem}
          isEditing={isEditing}
        />

        {/* Assessment Page */}
        <div className='assessment-section'>
        
          <h2 className='component-title'>{data.assessmentSection.title}</h2>

          {/* Assessment Introduction */}
          <div>
            <p>{data.assessmentSection.description}</p>
          </div>

        </div>

        {/* Recommendation */}
        <div className='recommendation-section'>
          <h2 className='component-title'>{data.recommendationSection.title}</h2>
        </div>

      </div>


    </Box>
  );
}