import {useNavigate} from '@remix-run/react';
import {useCallback} from 'react';
import {SignInFormWrapper} from './form-wrapper';

import type {MetaFunction} from '@remix-run/node';

export const meta: MetaFunction = () => [{title: 'Sign In'}];

export default function SignIn() {
  const navigate = useNavigate();

  const onLogin = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return <SignInFormWrapper onLogin={onLogin} />;
}
