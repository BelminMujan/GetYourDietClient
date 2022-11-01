import Account from "../../Screens/Admin/Account/Account";
import Articles from "../../Screens/Admin/Articles/Articles";
import Dashboard from "../../Screens/Admin/Dashboard/Dashboard";
import DietRequests from "../../Screens/Admin/DietRequests/DietRequests";
import Transactions from "../../Screens/Admin/Transactions/Transactions";
import Users from "../../Screens/Admin/Users/Users";

export const adminPanelSidebarRoutes = [
  {
    title: "Dashboard",
    path: "dashboard",
    element: <Dashboard/>
  },
  {
    title: "Account",
    path: "account",
    element: <Account/>
  },
  {
    title: "Transactions",
    path: "transactions",
    element: <Transactions/>
  },
  {
    title: "Diet requests",
    path: "diet-requests",
    element: <DietRequests/>
  },
  {
    title: "Users",
    path: "users",
    element: <Users/>
  },
  {
    title: "Articles",
    path: "articles",
    element: <Articles/>
  },
  {
    title: "Blog",
    path: "blog",
    element: <Articles/>
  }
];
