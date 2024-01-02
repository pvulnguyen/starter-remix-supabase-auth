import {useDisclosure} from '@mantine/hooks';
import {showNotification} from '@mantine/notifications';
import {useCallback} from 'react';
import css from '~/ui/notification.module.css';
import {SignUpForm} from './form';
import {useSignUpWithEmail} from './use-sign-up-with-email';

import type {UserCredentials} from '~/lib/validation';

export function SignUpFormWrapper({onSignUp}: {onSignUp: () => unknown}) {
  const [loading, {open, close}] = useDisclosure(false);
  const signUp = useSignUpWithEmail();

  const onSubmit = useCallback(
    async (params: UserCredentials) => {
      open();
      try {
        await signUp(params);
        onSignUp();
      } catch (error) {
        if (error instanceof Error) {
          showNotification({
            color: 'red',
            message: error.message.includes('Password should')
              ? 'Please choose a stronger password'
              : error.message,
            classNames: css,
          });
        }
      } finally {
        close();
      }
    },

    [close, onSignUp, open, signUp],
  );

  return <SignUpForm onSubmit={onSubmit} isLoading={loading} />;
}
