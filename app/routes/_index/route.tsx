import {Container, Title} from '@mantine/core';

import type {MetaFunction} from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    {title: 'Remix Supabase Auth'},
    {name: 'description', content: 'Remix starter with Supabase Auth and Mantine UI'},
  ];
};

export default function Index() {
  return (
    <Container>
      <Title>Hello, World!</Title>
    </Container>
  );
}
