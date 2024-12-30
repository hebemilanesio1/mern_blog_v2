import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import DeletePost from './pages/DeletePost';
import Logout from './pages/Logout';
import MyPost from './pages/MyPost';
import AllPost from './pages/AllPost';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {index:true, element: <Home />},
      {path:"posts/:id", element: <PostDetail />},
      {path:"register", element: <Register />},
      {path:"login", element: <Login/>},
      {path:"profile/:id", element: <UserProfile />},
      {path:"create", element: <CreatePost />},
      {path:"posts/:id/edit", element: <EditPost />},
      {path:"posts/:id/delete", element: <DeletePost />},
      { path: "my-posts", element: <MyPost /> },
      { path: "all-post", element: <AllPost /> },
      {path:"logout", element: <Logout />},


    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


