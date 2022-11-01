import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LandingPage from "./Screens/Landing/LandingPage";
import Sidebar from "./Components/Sidebar/Sidebar";
import { adminPanelSidebarRoutes } from "./Components/Constants/adminPanel";
import { Provider } from "react-redux"
import store from "./store";
import { loadUser } from "./redux/userSlice";
import AdminWrapper from "./Screens/Admin/AdminWrapper";
import Login from "./Screens/Auth/Login";
const root = ReactDOM.createRoot(document.getElementById("root"));
const routes = createBrowserRouter([
    {
        path: "",
        element: <LandingPage />,
    },
    {
        path: "login",
        element: <Login/>
    },
    {
        path: "admin",
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
