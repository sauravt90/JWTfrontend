import { useState } from "react";
import {  User } from "./Register";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../accesToken";


export interface LoginResponse{
    token: string
}

export const Login = () => {

    const [userName,setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loginResp,setLoginResp] = useState<LoginResponse>()
    const navigate = useNavigate();
    const [isLoginFailed,setLoginFailed]  = useState(false)
    return (
        <form
            onSubmit={async e => {
                e.preventDefault();
                console.log("form submitted");
                 
                const loginRequest: User  = {
                    id: userName,
                    password: password
                }

                fetch("http://localhost:8081/lognin", {
                    method: 'POST',
                    body: JSON.stringify(loginRequest)
                }).then(
                    async x => {
                        const body = await x.json();
                        console.log(body.token);
                        setAccessToken(body.token)
                        navigate('/test');
                    }).catch(() => {
                        setLoginFailed(true)
                    })
            }}
        >
            <div>
                {isLoginFailed ?  <div> invalid credentials</div> : ""}
                <input
                    value={userName}
                    placeholder="email"
                    onChange={e => {
                        setUserName(e.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    type="password"
                    value={password}
                    placeholder="password"
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}