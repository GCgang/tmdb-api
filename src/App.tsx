import Header from './components/Header/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { TmdbProvider } from './context/TmdbApiContext';
import MovieModal from './components/Modal/MovieModal';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
function App() {
  return (
    <Wrapper>
      <Header />
      <Content>
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
      </Content>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  width: 100%;
  overflow-x: hidden;
`;

export default App;
