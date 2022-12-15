import { Outlet } from "react-router-dom";
import Account from "../../Screens/Admin/Account/Account";
import Food from "../../Screens/Admin/Food/Food";
import Blog from "../../Screens/Admin/Blog/Blog";
import Builder from "../../Screens/Admin/Blog/Builder/Builder";
import Dashboard from "../../Screens/Admin/Dashboard/Dashboard";
import DietRequests from "../../Screens/Admin/DietRequests/DietRequests";
import DietRequestsEdit from "../../Screens/Admin/DietRequests/Edit";
import Transactions from "../../Screens/Admin/Transactions/Transactions";
import Users from "../../Screens/Admin/Users/Users";
import FoodEdit from "../../Screens/Admin/Food/Edit";
import UsersEdit from "../../Screens/Admin/Users/Edit";

export const adminPanelSidebarRoutes = [
    {
        title: "Dashboard",
        path: "dashboard",
        element: <Dashboard />,
    },
    {
        title: "Account",
        path: "account",
        element: <Account />,
    },
    {
        title: "Transactions",
        path: "transactions",
        element: <Transactions />,
    },
    {
        title: "Diet requests",
        path: "diet-requests",
        children: [
            {
                path: '',
                element: <DietRequests/>
            },
            {
                path: ':id',
                element: <DietRequestsEdit/>
            }
        ]
    },
    {
        title: "Users",
        path: "users",
        children: [
            {
                path: '',
                element: <Users/>
            },
            {
                path: ':id',
                element: <UsersEdit/>
            }
        ]
    },
    {
        title: "Food",
        path: "food",
        children: [
            {
                path: '',
                element: <Food/>
            },
            {
                path: ':id',
                element: <FoodEdit/>
            }
        ]
    },
    {
        title: "Blog",
        path: "blog",
        element: <Outlet/>,
        children: [
            {
                path: "",
                element: <Blog/>
            },
            {
                path: ":id",
                element: <Builder/>
            },
        ],
    },
];
