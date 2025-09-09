import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Notifications } from '@/components/dashboard/settings/notifications';
import { UpdatePasswordForm } from '@/components/dashboard/settings/update-password-form';
import { ThemeSettings } from '@/components/dashboard/settings/theme-setting';
import { LanguageSettings } from '@/components/dashboard/settings/language-setting';
import { appConfig } from '@/config/index';

export const metadata = { title: `Settings | Dashboard | ${appConfig.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Settings</Typography>
      </div>
      <Notifications />
      <LanguageSettings />
      <ThemeSettings/>
      <UpdatePasswordForm />
    </Stack>
  );
}
