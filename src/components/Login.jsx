
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithRedirect } from 'firebase/auth'
import { useState } from 'react';
import firebaseApp from "../firebase";
const auth = getAuth(firebaseApp)

function Login() {
    const [login, setLogin] = useState(false)
    const [ registerEmail, setRegisterEmail ] = useState('');
    const [ registerPassword, setRegisterPassword ] = useState('');
    const [ loginEmail, setLoginEmail ] = useState('');
    const [ loginPassword, setLoginPassword ] = useState('');

    const handleLoginBtn = () => {
        setLogin(true)
    }

    const handleRegisterBtn = () => {
        setLogin(false)
    }

    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Let's Chat</h2>
                
                <div className='emailLogin'>
                    {login
                        ?
                        <>
                            <h3>Login</h3>
                            <label className='login'>
                                <input 
                                    type="email" 
                                    placeholder='Email'
                                    onChange={(e) => {setLoginEmail(e.target.value)}}
                                />
                            </label>
                            <label className='login'>
                                <input 
                                    type="password" 
                                    placeholder='Password'
                                    onChange={(e) => {setLoginPassword(e.target.value)}}
                                />
                            </label>
                        </>
                        :
                        <>
                            <h3>Register</h3>
                            <label className='register'>
                                <input 
                                    type="email" 
                                    placeholder='Email' 
                                    onChange={(e) => {setRegisterEmail(e.target.value)}}
                                />
                            </label>
                            <label className='register'>
                                <input 
                                    type="password" 
                                    placeholder='Password' 
                                    onChange={(e) => {setRegisterPassword(e.target.value)}}
                                />
                            </label>
                        </>
                    }


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