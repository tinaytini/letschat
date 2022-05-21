
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons'; 
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithRedirect } from 'firebase/auth'
import firebaseApp from "../firebase";  

const auth = getAuth(firebaseApp)

function Login() {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Let's Chat</h2>
                <div 
                    className='login-button google'
                    onClick={() => signInWithRedirect(auth, new GoogleAuthProvider())}
                >
                    <GoogleOutlined/> Login with Google
                </div>
                <br/><br/>
                <div 
                    className='login-button google'
                    onClick={() => signInWithRedirect(auth, new FacebookAuthProvider())}
                > 
                    <FacebookOutlined/> Login with FaceBook
                </div>
            </div> 
        </div>
    )
}
  
export default Login;