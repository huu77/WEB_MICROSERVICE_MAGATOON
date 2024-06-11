import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import MainLayout from './layouts/MainLayout'
import Home from './pages/home';
import Error from './pages/Error';
import Login from './pages/login';
import Register from './pages/register';
import Follow from './pages/follow';
import Hot from './pages/hot';
import History from './pages/hitstory';
import MangaDetailPage from './pages/Pagemanga/index';
import VeiwManga from './pages/veiw-manga/index';
import PaymentPage from './pages/PayMentPage/index';
import Wallet from './pages/Wallet/index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/Register",
        element: <Register />
      },
      {
        path: "/wallet",
        element: <Wallet />
      },
      {
        path: "/follow",
        element: <Follow />
      },
      {
        path: "/paymentpage",
        element: <PaymentPage />
      },
      // {
      //   path: "/rating",
      //   element: <Rating />
      // },
      {
        path: "/hot",
        element: <Hot />
      },
      {
        path: "/history",
        element: <History />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "story/:storyId/chapter/:chapterId",
        element: < VeiwManga />
      },
      {
        path: "story/:id",
        element: < MangaDetailPage />
        ,
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />
}