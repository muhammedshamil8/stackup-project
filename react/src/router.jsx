import {Navigate, createBrowserRouter } from "react-router-dom";
import Signup from "./pages/signup.jsx";
import Users from "./pages/users.jsx";
import Login from "./pages/login.jsx";
import NotFound from "./pages/Notfound.jsx";
import DefualtLayout from "./components/DefualtLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./pages/dashboard.jsx";
import { AuthProvider } from "./AuthContext.jsx";
import Index from "./pages/index.jsx";
import CreateTask from "./pages/createTask.jsx";
import Taskdone from "./pages/taskdone.jsx";
import Todolist from "./pages/todolist.jsx";
import Onprogress from "./pages/taskonprogress.jsx";
import Project from "./pages/project.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element:<Index />
   },
    {
        path: '/',
        element:<DefualtLayout />,
        children: [
            {
                path: '/',
                element:<Navigate to="/users"/>
                // if url not need to show users then 
                // element:<Users />

           },
            {
                path: '/dashboard',
                element:<AuthProvider><Dashboard /></AuthProvider>
           },
            {
                path: '/users',
                element:<AuthProvider><Users /></AuthProvider>
           },
            {
                path: '/addtask',
                element: <AuthProvider><CreateTask /></AuthProvider>
           },
            {
                path: '/taskdone',
                element: <AuthProvider><Taskdone/></AuthProvider>
           },
            {
                path: '/todolist',
                element: <AuthProvider><Todolist/></AuthProvider>
           },
            {
                path: '/taskonprogress',
                element: <AuthProvider><Onprogress/></AuthProvider>
           },
            {
                path: '/project',
                element: <AuthProvider><Project /></AuthProvider>
           },
        
        ]
    },
    {
        path: '/',
        element:<GuestLayout />,
        children: [
            {
                path: '/login',
                element:<Login />
            },
            {
                path: '/signup',
                element:<Signup />
           }
        ]
    },
   
   {
        path: '*',
        element:<NotFound />
   }
])

export default router;