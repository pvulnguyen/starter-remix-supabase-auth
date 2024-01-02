import {Anchor, Button, LoadingOverlay, PasswordInput, Text, TextInput, Title} from '@mantine/core';
import {useForm} from '@mantine/form';
import {Link} from '@remix-run/react';
import {zodResolver} from 'mantine-form-zod-resolver';
import {userCredentialsSchema} from '~/lib/validation';
import css from './sign-up.module.css';

import type {UserCredentials} from '~/lib/validation';

export function SignUpForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (params: UserCredentials) => unknown;
  isLoading: boolean;
}) {
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
          Sign Up
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
          Create Account
        </Button>
      </form>
      <Text mt="md" ta="center">
        Already have an account?&nbsp;
        <Anchor component={Link} to="/sign-in">
          Sign in
        </Anchor>
      </Text>
    </div>
  );
}
