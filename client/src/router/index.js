import { createBrowserRouter, redirect } from "react-router-dom";
import Root from '../views/Root'
import Login from '../views/Login'
import InputPerusahaan from "../views/InputPerusahaan";
import InputTransaksi from "../views/InputTransaksi";
import DownloadTransactions from "../views/DownloadTransactions";



const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
        loader : ()=>{
            const loggedIn = localStorage.getItem('access_token')
            if(loggedIn){
                return redirect('/')
            }
            return loggedIn
        }
    }, 
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <InputPerusahaan />
            },
            {
                path: "/inputTransaksi",
                element: <InputTransaksi />
            },
            {
                path: "/downloadTransactions",
                element: <DownloadTransactions />
            }
        ],
        loader : ()=>{
            const loggedIn = localStorage.getItem('access_token')
            if(!loggedIn){
                return redirect('/login')
            }
            return loggedIn
        }
    }
]);

export default router