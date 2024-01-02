import {Outlet, redirect, useOutletContext} from '@remix-run/react';
import {getSupabaseClient} from '~/lib/supabase.server';

import type {LoaderFunctionArgs} from '@remix-run/node';
import type {SupabaseClient} from '@supabase/supabase-js';

export async function loader({request}: LoaderFunctionArgs) {
  const {supabase, headers} = getSupabaseClient(request);

  const {
    data: {session},
  } = await supabase.auth.getSession();

  if (session) {
    return redirect('/', {headers});
  }

  return null;
}

export default function Auth() {
  const {supabase} = useOutletContext<{supabase: SupabaseClient}>();

  return <Outlet context={{supabase}} />;
}
