import { Routes,Route,Link } from "react-router-dom"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { Test } from "./pages/Test"




export const RoutesDef: React.FC = () => {
    return (
           <div>
        <header>
            <div>
                    <Link to="/home">Home</Link>
            </div>
            <div>
                    <Link to="/login">Login</Link> 
            </div>
            <div>
                    <Link to="/test">test</Link>
            </div>
        </header>
        <Routes>
            <Route path="/home" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/test" element={<Test />} />
        </Routes>
    </div>    
    )
}

 