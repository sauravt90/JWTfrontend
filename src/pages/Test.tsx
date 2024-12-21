import { getAccessToken, setAccessToken } from "../accesToken";
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
import { Logout } from "./Logout";
import { useNavigate } from "react-router-dom";
import { error } from "console";


export const Test = () =>{
    const navigate = useNavigate();
    const [fetched,setFetched] = useState(false)

    useEffect(()  =>  {
        let token = getAccessToken()
        console.log("accessToken is or old token is "+token);
        if(token !== ""){
            const {exp} = jwtDecode(token);
            console.log("exp val "+exp +"cuurt time"+Date.now());
        
            if (exp && Date.now() >= exp*1000) {
                console.log("token has beeen expired refreshing the token");
                fetch("http://localhost:8081/refresh_token", {
                    method: 'POST',
                    credentials: 'include'
                }).then(async (response) => {
                    if (response.status === 200) {
                        console.log("SUCCESSS")
                        const body = await response.json();
                        console.log(body.token);
                        setAccessToken(body.token)
                        console.log(response)
                        token = body.token
                        const  resp = await handGetTestDATa(body.token)
                        setFetched(resp)
                    } else if (response.status === 403|| response.status === 400) {
                        console.log("not allowed to refresh the token please relogin")
                    }})            
            }else{
                 handGetTestDATa(token)
                 .then((r) => setFetched(r))
            }
        }else{
            console.log("token is empty refreshing the token");
            
           fetch("http://localhost:8081/refresh_token", {
                method: 'POST',
                credentials: 'include'
            }).then( async (response)  =>  {
                if (response.status === 200) {
                    console.log("SUCCESSS")
                    const body =  await response.json();
                    console.log(body.token);
                    setAccessToken(body.token)
                    console.log(response)
                    token = body.token
                    const resp = await handGetTestDATa(token)
                    setFetched(resp)
                } else if (response.status === 403 || response.status === 400) {
                    console.log("not allowed to refresh the token please relogin")
                }
            }).catch(
                error => {
                    console.log("please login first")
                    setFetched(false)

                }
            )
        }
       },[])
        
    
    const val = fetched ? 
    <div>
            <div> token valid data is </div>
            <div>
                <button onClick={() => {
                    Logout()
                    navigate('/home')
                }}>Logout</button>
            </div>
    </div> : <div>please relogin</div>
    return (
        <div>
            {val}
        </div>
    )
}

async function handGetTestDATa(token:string) {
    
    try{
        const response = await fetch("http://localhost:8081/test", {
                method: 'GET',
                headers: {
                    'Token': token,
                }}
            )
        if (response.status === 200) {
            console.log("SUCCESSS")
            console.log(response)
            return true
        } else if (response.status === 403 || response.status === 400) {
            console.log("not allowed refresh the token")
            return false
        }
    }catch(e){
        console.log("not allowed refresh the token")
    }
    return false
}