import {useNavigate} from '@remix-run/react';
import {useCallback} from 'react';
import {SignUpFormWrapper} from './form-wrapper';

import type {MetaFunction} from '@remix-run/node';

export const meta: MetaFunction = () => [{title: 'Sign In'}];

export default function SignUp() {
  const navigate = useNavigate();

  const onSignUp = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return <SignUpFormWrapper onSignUp={onSignUp} />;
}
