import { FormControl, InputLabel, Input, FormHelperText, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignInPage: React.FC<{}> = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [credentialsError, setCredentialsError] = useState('');
    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }
    const handleSignInClick = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        const data = await response.json();
        if(response.ok)
        {
            navigate(`/home/${username}`);
            localStorage.setItem('token', data.access_token);
            // localStorage.setItem('username', username);
        }
        else
        {
            setCredentialsError(data.detail);
        }
    }
    const handleSignUpNavigationClick = () => {
        navigate('/signup');
    }

    const handleForgotPasswordClick = () => {

    }
    return (
        <div>
            {/*Desktop  */}
            <div className="d-none d-xl-block d-xxl-block">
            <div className="d-flex justify-content-center align-items-center vh-100">
                    <form action="" className="d-flex flex-column gap-3" style={{ width: '40%' }} >
                        {/* <Stack spacing={2}> */}
                        <FormControl>
                            <InputLabel htmlFor="my-input"
                                required>Username</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text"
                            onChange={handleUsernameChange}
                            value={username}
                            />
                            <FormHelperText id="my-helper-text">{}</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="my-input"
                                required>Password</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text"
                            onChange={handlePasswordChange}
                            value={password}
                            />
                            <FormHelperText id="my-helper-text">{}</FormHelperText>
                        </FormControl>
                        <p>{credentialsError}</p>
                        <Button
                            variant="contained"
                            onClick={handleSignInClick}
                        >
                            Sign In
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleSignUpNavigationClick}
                        >
                            Create account?
                        </Button>
                        <Button
                            variant="text"
                            onClick={handleForgotPasswordClick}
                        >
                            Forgot Password?
                        </Button>
                        {/* </Stack> */}
                    </form>
                </div>
            </div>

            {/* Mobile */}
            <div className="d-block d-sm-none">
            </div>
        </div>
    );
}