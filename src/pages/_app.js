import { Toaster } from 'react-hot-toast';
import Layout from '../components/layout';
import ContextProvider from '../store/context-provider';
import '../styles/bootstrap.min .css';
import '../styles/globals.css';
import '../styles/responsive.css';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
        <Toaster position='top-center' reverseOrder={false} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;
