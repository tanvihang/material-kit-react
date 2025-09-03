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
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'zh-TW', name: 'Traditional Chinese', nativeName: '繁體中文', flag: '🇹🇼' }
];

export function LanguageSettings(): React.JSX.Element {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Dashboard.Settings');
  const [selectedLanguage, setSelectedLanguage] = React.useState(locale);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLocale = event.target.value;
    setSelectedLanguage(newLocale);

    router.push(pathname, { locale: newLocale });
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    // Language is already applied in real-time
    // You could save to localStorage or user preferences here
  };

  const currentLanguage = languages.find(lang => lang.code === locale);

  return (
    <form onSubmit={handleSave}>
      <Card>
        <CardHeader 
          subheader="Select your preferred language for the application interface" 
          title="Language Settings"
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
                <Typography variant="h6">Language Selection</Typography>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Choose your language</FormLabel>
                  <RadioGroup
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    name="language-selection"
                  >
                    {languages.map((language) => (
                      <FormControlLabel 
                        key={language.code}
                        value={language.code} 
                        control={<Radio />} 
                        label={
                          <Stack direction="row" spacing={1} alignItems="center">
                            <span>{language.flag}</span>
                            <Stack>
                              <Typography variant="body1">{language.name}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {language.nativeName}
                              </Typography>
                            </Stack>
                          </Stack>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    The language will be applied immediately. Your preference will be saved for future sessions.
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
                <Typography variant="h6">Current Language</Typography>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h2">{currentLanguage?.flag}</Typography>
                    <Stack>
                      <Typography variant="body1" fontWeight="medium">
                        {currentLanguage?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {currentLanguage?.nativeName}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    This is your current language setting. All interface text will be displayed in this language.
                  </Typography>
                </Card>
                
                <Card variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Language Coverage
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Navigation menus
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Settings and preferences
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Form labels and buttons
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Error and success messages
                  </Typography>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            Save Language Preference
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}