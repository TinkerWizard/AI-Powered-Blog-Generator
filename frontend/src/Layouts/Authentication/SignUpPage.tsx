import { Button, FormControl, FormHelperText, Input, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUpPage: React.FC<{}> = () => {
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [emailError, setEmailError] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const navigate = useNavigate();
    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };
    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
        setUsernameError('');
    }
    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
        setEmailError('');
    }
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }
    const handleSignInNavigation = () => {
        navigate('/signin');
    }
    const handleSignUpClick = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, username, email, password })
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                navigate(`/signin`);
            }
            else {
                if (data.usernameError) {
                    setUsernameError(data.usernameError);
                }
                if (data.emailError) {
                    setEmailError(data.emailError);
                }
            }
        }
        catch (error: any) {
            console.error('Error:', error);
        }
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
                                required>Name</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text"
                                onChange={handleNameChange}
                                value={name}
                            />
                            <FormHelperText id="my-helper-text"></FormHelperText>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="my-input"
                                required>Email address</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text"
                                onChange={handleEmailChange}
                                value={email}
                            />
                            <FormHelperText 
                            className="text-danger"
                            id="my-helper-text">{emailError}</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="my-input"
                                required>Username</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text"
                                onChange={handleUsernameChange}
                                value={username}
                            />
                            <FormHelperText className="text-danger" id="my-helper-text">{usernameError}</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="my-input"
                                required>Password</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text"
                                onChange={handlePasswordChange}
                                value={password}
                            />
                            <FormHelperText id="my-helper-text">{passwordError ? password : "Must be between 8-12 characters"}</FormHelperText>
                        </FormControl>
                        <Button
                            variant="contained"
                            onClick={handleSignUpClick}
                        >
                            Sign Up
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleSignInNavigation}
                        >
                            Have an account?
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