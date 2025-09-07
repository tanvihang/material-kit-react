'use client';

import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Stack,
} from '@mui/material';
import type { LabResultAnalysisDataType } from '@/types/health';

interface EditLabItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: LabResultAnalysisDataType) => void;
  item: LabResultAnalysisDataType | null;
}

export function EditLabItemDialog({ 
  open, 
  onClose, 
  onSave, 
  item 
}: EditLabItemDialogProps): React.JSX.Element {
  const [formData, setFormData] = React.useState<LabResultAnalysisDataType | null>(null);

  React.useEffect(() => {
    if (item) {
      setFormData({ ...item });
    }
  }, [item]);

  const handleSave = () => {
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  const handleFieldChange = (field: keyof LabResultAnalysisDataType, value: any) => {
    if (formData) {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  if (!formData) return <></>;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Lab Result: {formData.title}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            multiline
            rows={3}
            fullWidth
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Reference Min"
                type="number"
                value={formData.minValue}
                onChange={(e) => handleFieldChange('minValue', parseFloat(e.target.value))}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Reference Max"
                type="number"
                value={formData.maxValue}
                onChange={(e) => handleFieldChange('maxValue', parseFloat(e.target.value))}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Optimal Min"
                type="number"
                value={formData.recommendedMin}
                onChange={(e) => handleFieldChange('recommendedMin', parseFloat(e.target.value))}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Optimal Max"
                type="number"
                value={formData.recommendedMax}
                onChange={(e) => handleFieldChange('recommendedMax', parseFloat(e.target.value))}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Latest Value"
                type="number"
                value={formData.latestValue || ''}
                onChange={(e) => handleFieldChange('latestValue', e.target.value ? parseFloat(e.target.value) : null)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Previous Value"
                type="number"
                value={formData.previousValue || ''}
                onChange={(e) => handleFieldChange('previousValue', e.target.value ? parseFloat(e.target.value) : null)}
                fullWidth
              />
            </Grid>
          </Grid>

          <TextField
            label="Unit"
            value={formData.unit}
            onChange={(e) => handleFieldChange('unit', e.target.value)}
            fullWidth
          />

          <TextField
            label="Explanation"
            value={formData.explaination || ''}
            onChange={(e) => handleFieldChange('explaination', e.target.value)}
            multiline
            rows={2}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}