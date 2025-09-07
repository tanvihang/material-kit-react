'use client';

import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import type { LabResultAnalysisDataType } from '@/types/health';

interface AddLabItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: LabResultAnalysisDataType) => void;
  categories: string[];
  selectedCategory?: string;
}

const createEmptyLabItem = (): LabResultAnalysisDataType => ({
  id: `lab-item-${Date.now()}`,
  title: '',
  description: '',
  minValue: 0,
  maxValue: 100,
  womanMinValue: null,
  womanMaxValue: null,
  recommendedMin: 10,
  recommendedMax: 90,
  womanRecommendedMin: null,
  womanRecommendedMax: null,
  latestValue: null,
  previousValue: null,
  unit: '',
  explaination: null,
});

export function AddLabItemDialog({ 
  open, 
  onClose, 
  onSave, 
  categories,
  selectedCategory 
}: AddLabItemDialogProps): React.JSX.Element {
  const [formData, setFormData] = React.useState<LabResultAnalysisDataType>(createEmptyLabItem());
  const [category, setCategory] = React.useState<string>(selectedCategory || '');

  React.useEffect(() => {
    if (open) {
      setFormData(createEmptyLabItem());
      setCategory(selectedCategory || '');
    }
  }, [open, selectedCategory]);

  const handleSave = () => {
    if (formData.title && formData.unit && category) {
      onSave(formData);
      onClose();
    }
  };

  const handleFieldChange = (field: keyof LabResultAnalysisDataType, value: string | number | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Lab Item</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Title *"
            value={formData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            multiline
            rows={3}
            fullWidth
          />

          <TextField
            label="Unit *"
            value={formData.unit}
            onChange={(e) => handleFieldChange('unit', e.target.value)}
            fullWidth
            required
            placeholder="e.g., mg/dL, g/L, IU/L"
          />

          <Typography variant="h6" sx={{ mt: 2 }}>
            Reference Ranges
          </Typography>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Reference Min"
              type="number"
              value={formData.minValue}
              onChange={(e) => handleFieldChange('minValue', Number.parseFloat(e.target.value) || 0)}
              fullWidth
            />
            <TextField
              label="Reference Max"
              type="number"
              value={formData.maxValue}
              onChange={(e) => handleFieldChange('maxValue', Number.parseFloat(e.target.value) || 0)}
              fullWidth
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Optimal Min"
              type="number"
              value={formData.recommendedMin}
              onChange={(e) => handleFieldChange('recommendedMin', Number.parseFloat(e.target.value) || 0)}
              fullWidth
            />
            <TextField
              label="Optimal Max"
              type="number"
              value={formData.recommendedMax}
              onChange={(e) => handleFieldChange('recommendedMax', Number.parseFloat(e.target.value) || 0)}
              fullWidth
            />
          </Stack>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Women-specific Ranges (Optional)
          </Typography>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Women Reference Min"
              type="number"
              value={formData.womanMinValue || ''}
              onChange={(e) => handleFieldChange('womanMinValue', e.target.value ? Number.parseFloat(e.target.value) : null)}
              fullWidth
            />
            <TextField
              label="Women Reference Max"
              type="number"
              value={formData.womanMaxValue || ''}
              onChange={(e) => handleFieldChange('womanMaxValue', e.target.value ? Number.parseFloat(e.target.value) : null)}
              fullWidth
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Women Optimal Min"
              type="number"
              value={formData.womanRecommendedMin || ''}
              onChange={(e) => handleFieldChange('womanRecommendedMin', e.target.value ? Number.parseFloat(e.target.value) : null)}
              fullWidth
            />
            <TextField
              label="Women Optimal Max"
              type="number"
              value={formData.womanRecommendedMax || ''}
              onChange={(e) => handleFieldChange('womanRecommendedMax', e.target.value ? Number.parseFloat(e.target.value) : null)}
              fullWidth
            />
          </Stack>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Test Values (Optional)
          </Typography>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Latest Value"
              type="number"
              value={formData.latestValue || ''}
              onChange={(e) => handleFieldChange('latestValue', e.target.value ? Number.parseFloat(e.target.value) : null)}
              fullWidth
            />
            <TextField
              label="Previous Value"
              type="number"
              value={formData.previousValue || ''}
              onChange={(e) => handleFieldChange('previousValue', e.target.value ? Number.parseFloat(e.target.value) : null)}
              fullWidth
            />
          </Stack>

          <TextField
            label="Explanation"
            value={formData.explaination || ''}
            onChange={(e) => handleFieldChange('explaination', e.target.value || null)}
            multiline
            rows={2}
            fullWidth
            placeholder="Additional explanation for this biomarker..."
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          disabled={!formData.title || !formData.unit || !category}
        >
          Add Item
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (categoryName: string) => void;
}

export function AddCategoryDialog({ 
  open, 
  onClose, 
  onSave 
}: AddCategoryDialogProps): React.JSX.Element {
  const [categoryName, setCategoryName] = React.useState('');

  React.useEffect(() => {
    if (open) {
      setCategoryName('');
    }
  }, [open]);

  const handleSave = () => {
    if (categoryName.trim()) {
      onSave(categoryName.trim());
      onClose();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Category</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          onKeyPress={handleKeyPress}
          fullWidth
          sx={{ mt: 1 }}
          placeholder="e.g., Cardiovascular Markers, Liver Function"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          disabled={!categoryName.trim()}
        >
          Add Category
        </Button>
      </DialogActions>
    </Dialog>
  );
}
