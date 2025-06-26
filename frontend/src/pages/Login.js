import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './loginregister.css'
import { useGlobalContext_User } from '../context/userContext'
import Loading from '../components/Loading'

const Login = () => {
    const nav = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {isLoading,login} = useGlobalContext_User()
  return (
    <div className="container mt">
      <div className="login-center">
        <h1>فرم ورود</h1>
        <label>ایمیل:</label>
        <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="ایمیل خود را وارد کنید ..." />
        <label>رمز عبور:</label>
        <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="پسورد خود را وارد کنید ..." />
        {isLoading ? <Loading /> : <button onClick={()=>login({email,password})}>ورود</button> }
        {/* <button>ورود</button> */}
        <p>
            عضو نشدی؟ <span onClick={()=>nav('/register')}>عضویت</span>
        </p>
      </div>
    </div>
  )
}

export default Login