'use client';

import { LabResultAnalysisDataType } from '@/types';
import { Box, Button, Typography, Stack } from '@mui/material';
import * as React from 'react';
import { useEffect, useRef } from 'react';

interface RangeComponentProps {
  data: LabResultAnalysisDataType;
  isWomen: boolean;
  index: number;
  isEditing?: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

export default function RangeComponent({ data, isWomen, index, isEditing, onDelete, onEdit }: RangeComponentProps) {
  const rangeBarRef = useRef<HTMLDivElement>(null);
  const latestMarkerRef = useRef<HTMLDivElement>(null);
  const previousMarkerRef = useRef<HTMLDivElement>(null);

  const {
    title,
    description,
    minValue,
    maxValue,
    recommendedMin,
    recommendedMax,
    latestValue,
    previousValue,
    unit,
    womanMaxValue,
    womanMinValue,
    womanRecommendedMax,
    womanRecommendedMin
  } = data;

  // Use women-specific values if available and user is a woman, otherwise use general values
  const effectiveMinValue = isWomen && womanMinValue !== null ? womanMinValue : minValue;
  const effectiveMaxValue = isWomen && womanMaxValue !== null ? womanMaxValue : maxValue;
  const effectiveRecommendedMin = isWomen && womanRecommendedMin !== null ? womanRecommendedMin : recommendedMin;
  const effectiveRecommendedMax = isWomen && womanRecommendedMax !== null ? womanRecommendedMax : recommendedMax;

  // Handle null values for latest and previous values
  const hasLatestValue = latestValue !== null;
  const hasPreviousValue = previousValue !== null;

  const isLatestInRange = hasLatestValue && latestValue >= effectiveRecommendedMin && latestValue <= effectiveRecommendedMax;
  const isPreviousInRange = hasPreviousValue && previousValue >= effectiveRecommendedMin && previousValue <= effectiveRecommendedMax;
  
  const statusText = hasLatestValue ? (isLatestInRange ? 'In Range' : 'Out of Range') : 'No Data';

  useEffect(() => {
    // Calculate percentages for the range bar using effective values
    const totalRange = effectiveMaxValue - effectiveMinValue;
    const startPercentage = ((effectiveRecommendedMin - effectiveMinValue) / totalRange) * 100;
    const endPercentage = ((effectiveRecommendedMax - effectiveMinValue) / totalRange) * 100;

    // Update range bar background
    if (rangeBarRef.current) {
      rangeBarRef.current.style.setProperty('--start-percentage', `${startPercentage}%`);
      rangeBarRef.current.style.setProperty('--end-percentage', `${endPercentage}%`);
    }

    // Position latest value marker only if value exists
    if (hasLatestValue && latestMarkerRef.current) {
      const latestPercentage = ((latestValue - effectiveMinValue) / totalRange) * 100;
      latestMarkerRef.current.style.left = `${Math.max(1, Math.min(99, latestPercentage))}%`;
      latestMarkerRef.current.style.display = 'block';
    } else if (latestMarkerRef.current) {
      latestMarkerRef.current.style.display = 'none';
    }

    // Position previous value marker only if value exists
    if (hasPreviousValue && previousMarkerRef.current) {
      const previousPercentage = ((previousValue - effectiveMinValue) / totalRange) * 100;
      previousMarkerRef.current.style.left = `${Math.max(1, Math.min(99, previousPercentage))}%`;
      previousMarkerRef.current.style.display = 'block';
    } else if (previousMarkerRef.current) {
      previousMarkerRef.current.style.display = 'none';
    }
  }, [
    effectiveMinValue,
    effectiveMaxValue,
    effectiveRecommendedMin,
    effectiveRecommendedMax,
    latestValue,
    previousValue,
    hasLatestValue,
    hasPreviousValue
  ]);

  if(!latestValue) return <></>

  return (
    <Box className="metric-section" key={index}>
        {/* Header Section with Title, Description, and Action Buttons */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
            {/* Title and Description Section */}
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6" className="metric-name">{title}</Typography>
                <Typography variant="body2" color="text.secondary" className="metric-description">
                    {description}
                </Typography>
            </Box>

            {/* Action Buttons Section */}
            {isEditing && (
                <Stack direction="row" spacing={1}>
                    <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={onEdit}
                    >
                        Edit
                    </Button>
                </Stack>
            )}
        </Stack>

      
      <Box className="metric-value" sx={{ mt: 2 }}>
        <Typography 
          variant="h5" 
          className={`current-value ${isLatestInRange ? '' : 'out-of-range'}`}
          sx={{ fontWeight: 'bold' }}
        >
          {hasLatestValue ? `${latestValue} ${unit}` : 'No data'}
        </Typography>
        <Typography variant="body2" className="status-text" color="text.secondary">
          {statusText}
        </Typography>
      </Box>
      
      {/* Range Visualization Section */}
      <Box className="range-container" sx={{ position: 'relative', mt: 2 }}>
        <Box 
          ref={rangeBarRef}
          className="range-bar"
        />
        {hasLatestValue && (
          <Box 
            ref={latestMarkerRef}
            className={`value-marker latest-marker ${isLatestInRange ? '' : 'out-of-range'}`}
          />
        )}
        {hasPreviousValue && (
          <Box 
            ref={previousMarkerRef}
            className={`value-marker previous-marker ${isPreviousInRange ? '' : 'out-of-range'}`}
          />
        )}
      </Box>
      
      {/* Range Labels Section */}
      <Stack direction="row" justifyContent="space-between" className="range-labels" sx={{ mt: 1 }}>
        <Typography variant="caption" color="text.secondary">
          {effectiveMinValue}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {effectiveMaxValue}
        </Typography>
      </Stack>
    </Box>
  );
}
