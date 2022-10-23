import React, { useState } from 'react';
import {Login, SignUp} from './';

function LoginPage() {
    const [signupToggle, setSignupToggle ] = useState(false);
    const [loginToggle, setLoginToggle ] = useState(true);

    const handleLoginToggle = () => {  
        !loginToggle && setSignupToggle(false);
        setLoginToggle(!loginToggle);
        
        
    }

    const handleSignupToggle = () => {
        !signupToggle && setLoginToggle(false);
        setSignupToggle(!signupToggle);
    }

   return (<div>
        <h1 className="text-center text-2xl m-3">Welcome to Logins Monitor!</h1>
        
        <div className="flex justify-center">
            <div className="flex flex-col w-1/2">
                <Login toggle={loginToggle} handleToggle={handleLoginToggle}/>
                <SignUp toggle={signupToggle} handleToggle={handleSignupToggle}/>
            </div>
        </div>
    </div>)
}

export default LoginPage;