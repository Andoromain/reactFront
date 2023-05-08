import { useEffect, useState } from "react"
import axiosClient from "../axios.client";
import UserForm from "./UserForm";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function User(){

    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        getUsers();
    },[])
     const {setNotification}=useStateContext()
    const getUsers=()=>{

        setLoading(true)
        axiosClient.get('/users').then(({data})=>{
            setLoading(false)
            setUsers(data.data);
        }).catch(()=>{
            setLoading(false)
        })
    }

    const onDelete=(u)=>{
        if(!window.confirm("Etes vous sur de supprimer ?")){
            return
        }

        axiosClient.delete(`/users/${u.id}`).then(()=>{
            setNotification("User supprimé avec succes")
            getUsers()
        })
    }

    return <div>
       <div>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                <h1>Users one</h1>
                <Link to="/User/new" className="btn-add">New User</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    </tbody>}
                    {!loading &&
                    <tbody>
                        {users.map(u=>(
                            <tr>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.created_at}</td>
                                <td>
                                    <Link className="btn-edit" to={'/User/'+u.id}>Edit</Link>
                                    &nbsp;
                                    <button onClick={evt=>onDelete(u)} className="btn-delete">Delete</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>

            </div>
        </div>
    </div>
}
