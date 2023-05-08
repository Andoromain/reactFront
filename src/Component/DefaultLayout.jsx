import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios.client";
import { useStateContext } from "../context/ContextProvider";

export default function DefaultLayout(){
    const {user,token,notification,setUser,setToken}=useStateContext();

    if(!token){
        return <Navigate to="/login"/>
    }

    const onLogout=(evt)=>{
        evt.preventDefault()
        axiosClient.post('/logout',user).then(()=>{
            setUser({});
            setToken(null);
        })
    }

    return (
        <div id="defaultLayout">
           <aside>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/user'>Users</Link>
           </aside>
           <div className="content">
                <header>
                    <div>
                        header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                     <Outlet/>
                </main>
           </div>
           {notification && <div className="notification">
                {notification}
            </div>
            }
        </div>
    )
}
