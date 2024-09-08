import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Search from './pages/Search';
import MyWishList from './pages/MyWishList';
import NotFound from './pages/NotFound';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Navigate to='/home' /> },
      { path: '/home', element: <Home /> },
      { path: '/mywishlist', element: <MyWishList /> },
      { path: '/search/:keyword', element: <Search /> },
    ],
  },
]);
