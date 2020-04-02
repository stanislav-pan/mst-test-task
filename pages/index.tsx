import { useRouter } from 'next/router';

import React from 'react';
import Layout from '../components/layout';

const Home = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.replace("/about/[id]", "/about/1");
  });

  return <Layout />
}

export default Home;
