'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { useUser } from '@/hooks/use-user';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/use-auth';

export function SignInForm(): React.JSX.Element {
  const router = useRouter();
  const t = useTranslations('Auth.SignIn');

  const schema = React.useMemo(() => zod.object({
    email: zod
      .string()
      .min(1, { message: t('Validation.emailRequired') })
      .email({ message: t('Validation.emailInvalid') }),
    password: zod
      .string()
      .min(1, { message: t('Validation.passwordRequired') })
      .min(8, { message: t('Validation.passwordMinLength') }),
  }), [t]);

  const resolver = React.useMemo(() => zodResolver(schema), [schema]);

  type Values = zod.infer<typeof schema>;

  const defaultValues = { email: '', password: '' } satisfies Values;


  //* Custom Hooks
  const { checkSession } = useUser();
  const {signIn} = useAuth();

  const [showPassword, setShowPassword] = React.useState<boolean>();

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
        await signIn.mutateAsync(values);
  
        // Refresh the auth state
        await checkSession?.();
  
        // UserProvider, for this case, will not refresh the router
        // After refresh, GuestGuard will handle the redirect
        router.refresh();
      }
      catch(error: unknown){
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          setError('root', { type: 'server', message: errorMessage });
          setIsPending(false);
      }
    },
    [checkSession, router, setError, signIn]
  );

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">{t('signIn')}</Typography>
        <Typography color="text.secondary" variant="body2">
          {t('dontHaveAnAccount')}{' '}
          <Link component={RouterLink} href={paths.auth.signUp} underline="hover" variant="subtitle2">
            {t('signUp')}
          </Link>
        </Typography>
      </Stack>
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
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>{t('password')}</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label={t('password')}
                  type={showPassword ? 'text' : 'password'}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <div>
            <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2">
              {t('forgotPassword')}
            </Link>
          </div>
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            {t('signIn')}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
