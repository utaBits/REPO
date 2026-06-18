import react , { useState } from 'react' ;
import { useNavigate } from 'react-router-dom' ;
import { fetchAuth , VerifyOTP } from './api/login.auth.jsx' ;
import styles from './styles/login.module.css' ;

function Login(){
    const [username, setUsername] = useState('') ;
    const [password, setPassword] = useState('') ;
    const [OTPInput, setOTPInput] = useState(false) ;
    const navigate = useNavigate() ;

    const handleSubmit = async (e) => {
        e.preventDefault() ;
        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }
        if (!OTPInput) {
        const data = await fetchAuth(username, password)
        data.success ? setOTPInput(true) : alert(`Login failed: ${data.message}`);
        console.log(data , 'data from login.jsx') ;
    }     else {
        const userOtp = OTPInput ;
        const data = await VerifyOTP(userOtp , username) ;
        if(data.success){
            navigate('/dashboard') ;
            localStorage.setItem('username' , username) ; 

        } else {
            alert(`OTP verification failed: ${data.message}`);
        }
    }

}


    
    return(
        <div className={styles.loginContainer}>
            <h2>Login</h2>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {OTPInput && 
                    <div>
                    <label htmlFor='otpInput'>OTP:</label>
                    <input 
                    id='otpInput'
                    type="number" 
                    onChange={(e) => setOTPInput(e.target.value)}
                    />
                    </div>
                     
                        }
                </div>
                <button type="submit">Login</button>
            </form>
        </div>

    );
}

export default Login ;