import { useEffect, useState } from "react"




export interface User {
    password: string;
    id: string;
}


export const Register = () =>{

    const [loading,setLoading] = useState(true)
    const [users,setUsers] = useState<User[]>([])
    useEffect(() =>{
        fetch("http://localhost:8081/getUsers",{
          method: 'GET'
        }).then(
            async x => {
            const  body = await x.json();
            console.log("call 1"+body);
            setUsers(body)
            setLoading(false);
        })
    },[])
    
    if(loading){
        return <div>Loading...</div>
    }

    return (<div>
        {users.map(val => <div>
            <div>Id is : {val.id}</div>
             <div>Password is : {val.password}</div>
         </div>)}
        </div>)
}