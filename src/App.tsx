import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TmdbProvider } from './context/TmdbApiContext';

const queryClient = new QueryClient();
function App() {
  return (
    <div>
      <Header />
      <TmdbProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </TmdbProvider>
      <Footer />
    </div>
  );
}

export default App;
