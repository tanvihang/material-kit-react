'use client';

import { LabResultAnalysisDataType } from '@/types';
import { Button } from '@mui/material';
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

  return (
    <div className="metric-section" key={index}>
        
        <div>
            <div>
                <div className="metric-name">{title}</div>
                <div className="metric-description">{description}</div>
            </div>

            <div>
                {
                    isEditing && (
                        <Button
                            size='small'
                            onClick={() => {onDelete()}}
                        >
                            Delete
                        </Button>
                    )
                }

                {
                    isEditing && (
                        <Button
                            size='small'
                            onClick={() => {onEdit()}}
                        >
                            Edit
                        </Button>
                    )
                }
            </div>
        </div>

      
      <div className="metric-value">
        <div className={`current-value ${isLatestInRange ? '' : 'out-of-range'}`}>
          {hasLatestValue ? `${latestValue} ${unit}` : 'No data'}
        </div>
        <div className="status-text">{statusText}</div>
      </div>
      
      <div className="range-container">
        <div 
          ref={rangeBarRef}
          className="range-bar"
        ></div>
        {hasLatestValue && (
          <div 
            ref={latestMarkerRef}
            className={`value-marker latest-marker ${isLatestInRange ? '' : 'out-of-range'}`}
          ></div>
        )}
        {hasPreviousValue && (
          <div 
            ref={previousMarkerRef}
            className={`value-marker previous-marker ${isPreviousInRange ? '' : 'out-of-range'}`}
          ></div>
        )}
      </div>
      
      <div className="range-labels">
        <span>{effectiveMinValue}</span>
        <span>{effectiveMaxValue}</span>
      </div>
    </div>
  );
}
