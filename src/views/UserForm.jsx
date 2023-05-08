import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios.client";
import { useStateContext } from "../context/ContextProvider";

export default function UserForm(){
    const {id}=useParams();
    const [loading,setLoading]=useState(false);
    const [errors,setErrors]=useState(null)
    const navigate=useNavigate()
    const [user,setUser]=useState({
        id:null,
        name:'',
        email:'',
        password:'',
        password_confirmation:''
    })
    const {setNotification}=useStateContext()

    const onSubmit=(ev)=>{
        ev.preventDefault();
        if(user.id){
            axiosClient.put(`/users/${user.id}`,user).then(()=>{
                setNotification("User modifié avec succes")
                navigate('/user')
            }).catch(err=>{
                const response=err.response;
                if(response && response.status==422){
                    console.log(response.data.errors)
                    setErrors(response.data.errors)
                }
            })
        }else{
            console.log(user)
            axiosClient.post(`/users/`,user).then(()=>{
                setNotification("User ajouté avec succes")
                navigate('/user')
            }).catch(err=>{
            const response=err.response;
                if(response && response.status==422){
                    console.log(response.data.errors)
                    setErrors(response.data.errors)
                }
            })
        }
    }

    if(id){
        useEffect(()=>{
            setLoading(true);
            axiosClient.get(`/users/${id}`).then(({data})=>{
                setLoading(false)
                setUser(data)
            }).catch(()=>{
                setLoading(false)
            });
        },[])
    }
    return(
        <did>
            {user.id && <h1>Update User : {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            {loading &&
            <div className="text-center">Loading...</div>}
            {errors && <div className="alert">
                {Object.keys(errors).map(key=>(
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>
            }
            <form onSubmit={onSubmit}>

                <input value={user.name} onChange={evt=>setUser({...user,name:evt.target.value})} placeholder="Name"/>
                <input value={user.email} onChange={evt=>setUser({...user,email:evt.target.value})} placeholder="Email"/>
                <input onChange={evt=>setUser({...user,password:evt.target.value})} placeholder="Password"/>
                <input onChange={evt=>setUser({...user,password_confirmation:evt.target.value})} placeholder="Password confirmation"/>
                <button type="submit" className="btn">Save</button>
            </form>
        </did>
    )
}
