'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/use-auth';

export function ResetPasswordForm(): React.JSX.Element {

  const t = useTranslations('Auth.ResetPassword');

  const schema = React.useMemo(() => zod.object({
    email: zod
      .string()
      .min(1, { message: t('Validation.emailRequired') })
      .email({ message: t('Validation.emailInvalid') }),
  }), [t]);

  const resolver = React.useMemo(() => zodResolver(schema), [schema]);

  type Values = zod.infer<typeof schema>;

  const defaultValues = { email: '' } satisfies Values;


  //* Custom Hooks
  const {resetPassword} = useAuth();


  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: resolver });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      try{
        await resetPassword.mutateAsync(values);

        setIsPending(false);
      }
      catch(error: unknown){

        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.log("Reset Password Error:", errorMessage);
        setError('root', { type: 'server', message: errorMessage });
        setIsPending(false);

      }
    },
    [setError, resetPassword]
  );

  return (
    <Stack spacing={4}>
      <Typography variant="h5">{t('resetPassword')}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>{t('emailAddress')}</InputLabel>
                <OutlinedInput {...field} label={t('emailAddress')} type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            {t('sendNewPassword')}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
