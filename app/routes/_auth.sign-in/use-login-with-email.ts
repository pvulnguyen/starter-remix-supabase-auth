import {useOutletContext} from '@remix-run/react';
import {useCallback} from 'react';

import type {SupabaseClient} from '@supabase/supabase-js';
import type {UserCredentials} from '~/lib/validation';

export function useLoginWithEmail() {
  const {supabase} = useOutletContext<{supabase: SupabaseClient}>();

  return useCallback(
    async (credentials: UserCredentials) => {
      await supabase.auth.signInWithPassword(credentials).then((result) => {
        if (result.error) throw new Error(result.error.message);
      });
    },

    [supabase],
  );
}
