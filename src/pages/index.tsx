import type { NextPage } from 'next';
import Layout from '../components/Layout';
import KeepInput from '../container/KeepInput';
import KeepView from '../container/KeepView';

const Home: NextPage = () => (
  <Layout>

    <KeepInput />

    <KeepView />

  </Layout>
);

export default Home;
