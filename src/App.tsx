import Header from './components/Header/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { TmdbProvider } from './context/TmdbApiContext';
import MovieModal from './components/Modal/MovieModal';
import { ToastContainer, Bounce } from 'react-toastify'; // Bounce를 import
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header />
      <TmdbProvider>
        <Outlet />
        <MovieModal />
      </TmdbProvider>
      <ToastContainer
        position='top-right'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
      <Footer />
    </>
  );
}

export default App;
