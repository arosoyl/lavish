import React, { useState } from 'react';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    console.log(username);
    

    const onSubmitLogin = () => {
        console.log({
            username,
            password
        })
    }



    return (
        <div>
            <div>
                Đăng nhập
                <input type='text' name='username' onChange={e => setUsername(e.target.value)}/>
                <input type='password' name='password' onChange={e => setPassword(e.target.value)}/>
                <button type='submit' onClick={onSubmitLogin}>Đăng nhập</button>
            </div>
        </div>
    )
}

export default Login;
