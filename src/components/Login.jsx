import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { 
    GoogleAuthProvider, 
    FacebookAuthProvider, 
    signInWithRedirect,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth'
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext"


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate("/chats", {replace: true});
        } 
    }, [user])

    const handleLoginBtn = async() => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log(user)
        } catch(error) {
            console.log(error.message)
        }
    }
    
    const handleRegisterBtn = async() => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password)
            console.log(user)
            setEmail("")
            setPassword("")
        } catch(error) {
            console.log(error.message)
        }
    }

    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Let's Chat</h2>
                
                <div className='emailLogin'>
                    <h3>Login</h3>
                    <label className='login'>
                        <input 
                            type="email" 
                            placeholder='Email'
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            required
                        />
                    </label>
                    <label className='login'>
                        <input 
                            type="password" 
                            placeholder='Password'
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            required
                        />
                    </label>

                    <div className='email-btns'>
                        <button onClick={handleLoginBtn} >Login</button>
                        <button onClick={handleRegisterBtn}>Register</button>
                    </div>
                </div>
                <button
                    className='login-button google'
                    onClick={() => signInWithRedirect(auth, new GoogleAuthProvider())}
                >
                    <GoogleOutlined /> Login with Google
                </button>
                <br /><br />
                <button
                    className='login-button google'
                    onClick={() => signInWithRedirect(auth, new FacebookAuthProvider())}
                >
                    <FacebookOutlined /> Login with FaceBook
                </button>
            </div>
        </div>
    )
}
export default Login;