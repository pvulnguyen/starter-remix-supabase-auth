import {Center, Stack, Text} from '@mantine/core';
import {redirect} from '@remix-run/node';
import {getSupabaseClient} from '../../lib/supabase.server';

import type {LoaderFunctionArgs} from '@remix-run/node';

export async function loader({request}: LoaderFunctionArgs) {
  const {supabase, headers} = getSupabaseClient(request);

  const {
    data: {session},
  } = await supabase.auth.getSession();

  if (!session) throw redirect('/sign-in', {headers});

  return null;
}

export default function RequireSession() {
  return (
    <Center h="100%">
      <Stack>
        <Text>You are logged in.</Text>
      </Stack>
    </Center>
  );
}
