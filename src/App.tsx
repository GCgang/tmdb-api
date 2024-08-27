import Header from './components/Header/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { TmdbProvider } from './context/TmdbApiContext';

function App() {
  return (
    <>
      <Header />
      <TmdbProvider>
        <Outlet />
      </TmdbProvider>
      <Footer />
    </>
  );
}

export default App;
