import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './Screens/Landing/LandingPage';
import { adminPanelSidebarRoutes } from './Components/Constants/adminPanel';
import { Provider } from 'react-redux'
import store from './store';
import AdminWrapper from './Screens/Admin/AdminWrapper';
import Login from './Screens/Auth/Login';
import GetDiet from './Screens/GetDiet/GetDiet';
import Blog from './Screens/Blog/Blog';
import Blogs from './Screens/Blogs/Blogs';
const root = ReactDOM.createRoot(document.getElementById('root'));
const routes = createBrowserRouter([
    {
        path: '',
        element: <LandingPage />,
    },
    {
        path: 'login',
        element: <Login/>
    },
    {
        path: 'get-diet',
        element: <GetDiet/>
    },
    {
        path: 'blog',
        children: [
            {
                path: '',
                element: <Blogs/>,  
            },
            {
                path: ':id',
                element: <Blog/>
            }
        ]
    },
    {
        path: 'admin',
        element: <AdminWrapper/>,
        children: [...adminPanelSidebarRoutes],
    },
]);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={routes}></RouterProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
