import Cookies from 'universal-cookie';
import { setAccessToken } from '../accesToken';
import { useNavigate } from 'react-router-dom';

export const Logout = () =>{
    console.log("in logout page");
    const cookies = new Cookies();
    cookies.set('jid', '');
    setAccessToken('')
   
}