import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AllPosts from './Pages/AllPosts.jsx';
import AddPost from './Pages/AddPost.jsx';
import EditPost from './Pages/EditPost.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,

      },
      {
        path: '/login',
        element: (
          <AuthLayoyt authentication = {false}>
            <Login />
          </AuthLayoyt>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayoyt authentication = {false}>
            <Signup />
          </AuthLayoyt>
        )
      },
      {
        path: '/all-posts',
        element: (
          <AuthLayoyt authentication >
            {" "}
            <AllPosts />
          </AuthLayoyt>
        )
      },
      {
        path: '/add-post',
        element: (
          <AuthLayoyt authentication >
            {""}
            <AddPost />
          </AuthLayoyt>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayoyt authentication >
            {""}
            <EditPost />
          </AuthLayoyt>
        )
      },
      {
        path: '/post',
        element: <Post />
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router = {router}/>
    </Provider>
  </React.StrictMode>,
);
