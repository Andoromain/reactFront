import {createBrowserRouter, Navigate} from 'react-router-dom'
import DefaultLayout from './Component/DefaultLayout';
import GuestLayout from './Component/GuestLayout';
import Dashboard from './Dashboard';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Signup from './views/Signup';
import User from './views/Users';
import UserForm from './views/UserForm';

const router=createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout/>,
        children:[
            {
                path:'/',
                element:<Navigate to="/user" />
            },
            {
                path:'/dashboard',
                element:<Dashboard/>
            },
            {
                path:'/user',
                element:<User/>
            },
            {
                path:'/user/new',
                element:<UserForm key="UserCreate"/>
            },
            {
                path:'/user/:id',
                element:<UserForm key="userUpdate"/>
            },

        ]

    },
    {
        path:'/',
        element:<GuestLayout/>,
        children:[
             {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signup',
                element:<Signup/>
            },
        ]
    },


    // {
    //     path:'*',
    //     element:<NotFound/>
    // },
])

export default router;
