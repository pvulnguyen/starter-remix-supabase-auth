import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import {Notifications} from '@mantine/notifications';
import {cssBundleHref} from '@remix-run/css-bundle';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
  useRevalidator,
} from '@remix-run/react';
import {createBrowserClient} from '@supabase/ssr';
import {useEffect, useState} from 'react';
import {getSupabaseClient} from '~/lib/supabase.server';

import type {LinksFunction, LoaderFunctionArgs} from '@remix-run/node';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{rel: 'stylesheet', href: cssBundleHref}] : []),
];

export async function loader({request}: LoaderFunctionArgs) {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  const {supabase, headers} = getSupabaseClient(request);

  const {
    data: {session},
  } = await supabase.auth.getSession();

  return json({env, session}, {headers});
}

export default function App() {
  const {env, session} = useLoaderData<typeof loader>();
  const {revalidate} = useRevalidator();

  const [supabase] = useState(() => createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY));

  const serverAccessToken = session?.access_token;

  useEffect(() => {
    const {
      data: {subscription},
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== 'INITIAL_SESSION' && session?.access_token !== serverAccessToken) {
        revalidate();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, supabase, revalidate]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Outlet context={{supabase}} />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <Notifications />
        </MantineProvider>
      </body>
    </html>
  );
}
