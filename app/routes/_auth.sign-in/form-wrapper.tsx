import {useDisclosure} from '@mantine/hooks';
import {showNotification} from '@mantine/notifications';
import {useCallback} from 'react';
import css from '~/ui/notification.module.css';
import {SignInForm} from './form';
import {useLoginWithEmail} from './use-login-with-email';

import type {UserCredentials} from '~/lib/validation';

export function SignInFormWrapper({onLogin}: {onLogin: () => unknown}) {
  const [loading, {open, close}] = useDisclosure(false);
  const login = useLoginWithEmail();

  const onSubmit = useCallback(
    async (params: UserCredentials) => {
      open();
      try {
        await login(params);
        onLogin();
      } catch (error) {
        if (error instanceof Error) {
          showNotification({
            color: 'red',
            message: error.message,
            classNames: css,
          });
        }
      } finally {
        close();
      }
    },

    [close, onLogin, open, login],
  );

  return <SignInForm onSubmit={onSubmit} isLoading={loading} />;
}
