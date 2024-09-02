import Header from './components/Header/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { TmdbProvider } from './context/TmdbApiContext';
import MovieModal from './components/MovieModal';

function App() {
  return (
    <>
      <Header />
      <TmdbProvider>
        <Outlet />
        <MovieModal />
      </TmdbProvider>
      <Footer />
    </>
  );
}

export default App;
