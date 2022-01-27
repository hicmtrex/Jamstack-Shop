import Layout from '../components/layout';
import ContextProvider from '../store/context-provider';
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/bootstrap.min .css';
import '../styles/globals.css';
import '../styles/responsive.css';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ContextProvider>
  );
}

export default MyApp;
