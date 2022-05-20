
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons'
function Login() {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Let's Chat</h2>
                <div className='login-button google'>
                    <GoogleOutlined/> Login with Google
                </div>
                <br/><br/>
                <div className='login-button google'> 
                    <FacebookOutlined/> Login with FaceBook
                </div>
            </div>
        </div>
    )
}
  
export default Login;