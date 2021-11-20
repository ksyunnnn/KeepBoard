import type { NextPage } from 'next';
import Layout from '../components/Layout';
import KeepInput from '../container/KeepInput';
import KeepView from '../container/KeepView';

const Home: NextPage = () => (
  <Layout>

    <KeepView />
    <KeepInput />
  </Layout>
);

export default Home;
