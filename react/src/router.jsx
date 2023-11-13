import { Navigate, createBrowserRouter } from "react-router-dom";
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
import Calendar from "./pages/calender.jsx";
import Todo from "./pages/todo.jsx";
import ProjectTodo from "./pages/projectTodoList.jsx";
import ProjectTodoDone from "./pages/projectTodoDone.jsx";
import ProjectTodoProgress from "./pages/projectTodoProgress.jsx";
import AboutUS from "./pages/aboutUs.jsx";
import ContactUs from "./pages/contactUs.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Index />
    },
    {
        path: '/',
        element: <DefualtLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/users" />
                // if url not need to show users then 
                // element:<Users />

            },
            {
                path: '/dashboard',
                element: <AuthProvider><Dashboard /></AuthProvider>
            },
            {
                path: '/users',
                element: <AuthProvider><Users /></AuthProvider>
            },
            {
                path: '/addtask',
                element: <AuthProvider><CreateTask /></AuthProvider>
            },
            {
                path: '/taskdone',
                element: <AuthProvider><Taskdone /></AuthProvider>
            },
            {
                path: '/todolist',
                element: <AuthProvider><Todolist /></AuthProvider>
            },
            {
                path: '/taskonprogress',
                element: <AuthProvider><Onprogress /></AuthProvider>
            },
            {
                path: '/project/:projectId',
                element: <AuthProvider><Project /></AuthProvider>
            },
            {
                path: '/calender',
                element: <AuthProvider><Calendar /></AuthProvider>
            },
            {
                path: '/todo/:taskId',
                element: <AuthProvider><Todo /></AuthProvider>
            },
            {
                path: '/projectTodolist/:projectId',
                element: <AuthProvider><ProjectTodo /></AuthProvider>
            },
            {
                path: '/projectTododone/:projectId',
                element: <AuthProvider><ProjectTodoDone /></AuthProvider>
            },
            {
                path: '/projectTodoprogress/:projectId',
                element: <AuthProvider><ProjectTodoProgress /></AuthProvider>
            },
            {
                path: '/about',
                element: <AuthProvider><AboutUS /></AuthProvider>
            },
            {
                path: '/contact',
                element: <AuthProvider><ContactUs /></AuthProvider>
            },

        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    },

    {
        path: '*',
        element: <NotFound />
    }
])

export default router;