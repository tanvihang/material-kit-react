'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/material';
import { useTranslations } from 'next-intl';


export function ThemeSettings(): React.JSX.Element {
   const {setColorScheme, colorScheme} = useColorScheme();
   const t =useTranslations('Dashboard.Settings');


  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode = event.target.value as 'light' | 'dark';
    setColorScheme(newMode)
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    // Theme is already applied in real-time, but you could save to localStorage here
  };

  return (
    <form onSubmit={handleSave}>
      <Card>
        <CardHeader 
          subheader="Customize the appearance of the application" 
          title= {t('themeSettings')}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid
              size={{
                md: 6,
                sm: 8,
                xs: 12,
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h6">Color Scheme</Typography>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Select theme mode</FormLabel>
                  <RadioGroup
                    value={colorScheme}
                    onChange={handleThemeChange}
                    name="theme-mode"
                  >
                    <FormControlLabel 
                      value="light" 
                      control={<Radio />} 
                      label="Light theme"
                    />
                    <FormControlLabel 
                      value="dark" 
                      control={<Radio />} 
                      label="Dark theme"
                    />
                  </RadioGroup>
                </FormControl>
                
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    The theme will be applied immediately. Your preference will be saved for future sessions.
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            
            <Grid
              size={{
                md: 6,
                sm: 4,
                xs: 12,
              }}
            >
              <Stack spacing={2}>
                <Typography variant="h6">Preview</Typography>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    Current theme: <strong>{colorScheme}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is how your interface looks with the selected theme.
                  </Typography>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            Save preferences
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
