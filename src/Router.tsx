import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import TopRate from './pages/TopRate';
import Popular from './pages/Popular';
import UpCommming from './pages/UpComming';
import NowPlaying from './pages/NowPlaying';
import SearchResults from './pages/SearchResults';
import MovieDetail from './components/MovieDetail';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/home', element: <Home /> },
      { path: '/home/:keyword', element: <SearchResults /> },
      { path: '/toprated', element: <TopRate /> },
      { path: '/popular', element: <Popular /> },
      { path: '/upcomming', element: <UpCommming /> },
      { path: '/nowplaying', element: <NowPlaying /> },
      { path: '/movie/:movieId', element: <MovieDetail /> },
    ],
  },
]);
