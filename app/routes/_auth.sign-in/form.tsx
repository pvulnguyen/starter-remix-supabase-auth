import {Button, LoadingOverlay, PasswordInput, Text, TextInput, Title} from '@mantine/core';
import {useForm} from '@mantine/form';
import {Link} from '@remix-run/react';
import {zodResolver} from 'mantine-form-zod-resolver';
import {userCredentialsSchema} from '~/lib/validation';
import css from './sign-in.module.css';

import type {UserCredentials} from '~/lib/validation';

type SignInFormProps = {
  onSubmit: (params: UserCredentials) => unknown;
  isLoading: boolean;
};

export function SignInForm({onSubmit, isLoading}: SignInFormProps) {
  const form = useForm<UserCredentials>({
    initialValues: {email: '', password: ''},
    validate: zodResolver(userCredentialsSchema),
  });

  return (
    <div className={css['root']}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        loaderProps={{type: 'bars'}}
        overlayProps={{radius: 'sm', blur: 2}}
      />
      <form className={css['form-container']} onSubmit={form.onSubmit(onSubmit)}>
        <Title size="h2" ta="center">
          Sign In
        </Title>
        <TextInput
          mt="md"
          label="Email"
          placeholder="your-email@address.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          mt="xs"
          label="Password"
          placeholder="••••••••"
          {...form.getInputProps('password')}
        />
        <Button type="submit" mt="xl" fullWidth>
          Login
        </Button>
      </form>
      <Text mt="md" ta="center">
        Need an account?&nbsp;<Link to="/sign-up">Sign up</Link>
      </Text>
    </div>
  );
}
