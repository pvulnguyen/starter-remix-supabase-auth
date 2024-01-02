import {createServerClient, parse, serialize} from '@supabase/ssr';

export function getSupabaseClient(request: Request) {
  // parse the cookies from the request
  const cookies = parse(request.headers.get('Cookie') ?? '');

  // create a new Headers instance
  const headers = new Headers();

  // create an authenticated Supabase client
  const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      get: (key) => {
        return cookies[key];
      },
      set: (key, value, options) => {
        headers.append('Set-Cookie', serialize(key, value, options));
      },
      remove: (key, options) => {
        headers.append('Set-Cookie', serialize(key, '', options));
      },
    },
  });

  return {supabase, headers};
}
