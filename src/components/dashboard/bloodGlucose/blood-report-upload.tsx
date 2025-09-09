'use client';

import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Alert,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { CloudArrowUp, X, FileImage, FilePdf } from '@phosphor-icons/react';
import Image from 'next/image';
import useBloodReportGeneration from '@/hooks/dashboard/bloodGlucose/use-blood-report-generation';
import { ReportData } from '@/types';

// Helper function
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

interface BloodReportUploadProps {
  onFileUploaded?: (file: File) => void;
  onReportGenerated?: (reportData: ReportData) => void;
}

export function BloodReportUpload({ onFileUploaded, onReportGenerated }: BloodReportUploadProps): React.JSX.Element {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const {
    isUploading,
    uploadedFile,
    uploadError,
    previewUrl,
    isProcessing,
    extractedData,
    finalReportData,
    processingError,
    uploadFile,
    removeFile,
    processImage,
    generateFinalReport,
  } = useBloodReportGeneration();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
      onFileUploaded?.(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      uploadFile(file);
      onFileUploaded?.(file);
    }
  };

  const handleRemoveFile = () => {
    removeFile();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleProcessImage = async () => {
    await processImage();
  };

  const handleGenerateReport = () => {
    generateFinalReport();
  };

  // Effect to call onReportGenerated when final report is ready
  React.useEffect(() => {
    if (finalReportData && onReportGenerated) {
      onReportGenerated(finalReportData);
    }
  }, [finalReportData, onReportGenerated]);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Upload Blood Report
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Upload your blood test report as an image (JPEG, PNG, WebP) or PDF document. 
        Maximum file size: 10MB.
      </Typography>

      {uploadError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {uploadError}
        </Alert>
      )}

      {processingError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {processingError}
        </Alert>
      )}

      {uploadedFile === null ? (
        <Card
          sx={{
            border: '2px dashed',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'action.hover',
            },
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            {isUploading ? (
              <Stack spacing={2} alignItems="center">
                <CircularProgress />
                <Typography variant="body1">Uploading...</Typography>
              </Stack>
            ) : (
              <Stack spacing={2} alignItems="center">
                <CloudArrowUp size={48} />
                <Typography variant="h6">
                  Drag and drop your file here
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  or click to browse files
                </Typography>
                <Button variant="contained" component="span">
                  Choose File
                </Button>
              </Stack>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ flexShrink: 0 }}>
                {uploadedFile.type.startsWith('image/') ? (
                  <FileImage size={32} />
                ) : (
                  <FilePdf size={32} />
                )}
              </Box>
              
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="subtitle1" noWrap>
                  {uploadedFile.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatFileSize(uploadedFile.size)}
                </Typography>
              </Box>

              <IconButton
                onClick={handleRemoveFile}
                color="error"
                size="small"
              >
                <X />
              </IconButton>
            </Stack>

            {previewUrl && uploadedFile.type.startsWith('image/') && (
              <Box sx={{ mt: 2 }}>
                <Image
                  src={previewUrl}
                  alt="Blood report preview"
                  width={600}
                  height={300}
                  style={{
                    width: '100%',
                    maxHeight: '300px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                  }}
                />
              </Box>
            )}

            {/* Processing Steps */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Processing Steps
              </Typography>
              
              <Stack spacing={2}>
                {/* Step 1: File Upload - Completed */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: 'success.main',
                      color: 'success.contrastText',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    ✓
                  </Box>
                  <Typography variant="body1">File uploaded successfully</Typography>
                </Box>

                {/* Step 2: Process Image */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: extractedData ? 'success.main' : isProcessing ? 'warning.main' : 'grey.300',
                      color: extractedData ? 'success.contrastText' : isProcessing ? 'warning.contrastText' : 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    {extractedData ? '✓' : isProcessing ? '⏳' : '2'}
                  </Box>
                  <Typography variant="body1" sx={{ flex: 1 }}>
                    Extract data from image
                  </Typography>
                  {!extractedData && !isProcessing && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleProcessImage}
                    >
                      Process Image
                    </Button>
                  )}
                  {isProcessing && (
                    <CircularProgress size={20} />
                  )}
                </Box>

                {/* Step 3: Generate Final Report */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: finalReportData ? 'success.main' : extractedData ? 'primary.main' : 'grey.300',
                      color: finalReportData ? 'success.contrastText' : extractedData ? 'primary.contrastText' : 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    {finalReportData ? '✓' : '3'}
                  </Box>
                  <Typography variant="body1" sx={{ flex: 1 }}>
                    Generate structured report
                  </Typography>
                  {extractedData && !finalReportData && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleGenerateReport}
                    >
                      Generate Report
                    </Button>
                  )}
                </Box>

                {finalReportData && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    Blood report has been successfully generated and integrated into your dashboard!
                  </Alert>
                )}
              </Stack>
            </Box>
          </CardContent>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </Box>
  );
}
