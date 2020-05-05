import React from 'react';
import { useStitchAuth } from '../context/auth/StitchAuth';

const Login = () => {
	const {
		actions: { handleLogin },
	} = useStitchAuth();
	return (
		<div>
			<button provider="google" onClick={() => handleLogin('google')}>
				Log In with Google
			</button>
			<button onClick={() => handleLogin('facebook')}>
				Log In with Facebook
			</button>
		</div>
	);
};

export default Login;
