import React from 'react';
import { useStitchAuth } from '../context/auth/StitchAuth';
import styled from 'styled-components';

const Login = () => {
	const {
		actions: { handleLogin },
	} = useStitchAuth();
	return (
		<LoginBox>
			<h3>Quick login to start</h3>
			<GoogleButton provider="google" onClick={() => handleLogin('google')}>
				<GoogleIcon>
					<GoogleImg
						src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
						alt="google icon"
					/>
				</GoogleIcon>
				<ButtonText>
					<b>Sign in with Google</b>
				</ButtonText>
			</GoogleButton>

			<FacebookButton onClick={() => handleLogin('facebook')}>
				Continue with Facebook
			</FacebookButton>
		</LoginBox>
	);
};

export default Login;

const GoogleButton = styled.div`
	width: 184px;
	height: 42px;
	background-color: #4285f4;
	border-radius: 2px;
	box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
	&:hover {
		cursor: pointer;
	}
`;

const GoogleIcon = styled.div`
	position: absolute;
	margin-top: 1px;
	margin-left: 1px;
	width: 40px;
	height: 40px;
	border-radius: 2px;
	background-color: #fff;
`;

const GoogleImg = styled.img`
	position: absolute;
	margin-top: 11px;
	margin-left: 11px;
	width: 18px;
	height: 18px;
`;

const ButtonText = styled.p`
	float: right;
	margin: 11px 11px 0 0;
	color: #fff;
	font-size: 14px;
	letter-spacing: 0.2px;
	font-family: 'Roboto';
`;

const LoginBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

const FacebookButton = styled.button`
	background-color: #4267b2;
	border-radius: 2px;
	color: #fff;
	height: 55px;
	width: 200px;
`;
