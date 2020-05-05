import React, {
	useEffect,
	createContext,
	useContext,
	useState,
	useMemo,
} from 'react';
import {
	hasLoggedInUser,
	loginAnonymous,
	loginGoogle,
	loginFacebook,
	logoutCurrentUser,
	getCurrentUser,
	addAuthenticationListener,
	removeAuthenticationListener,
	handleOAuthRedirects,
} from '../../stitch/authentication';

// Create a React Context that lets us expose and access auth state
// without passing props through many levels of the component tree
const StitchAuthContext = createContext();

// Create a React Hook that lets us get data from our auth context
export function useStitchAuth() {
	const context = useContext(StitchAuthContext);
	if (!context) {
		throw new Error(`useStitchAuth must be used within a StitchAuthProvider`);
	}
	return context;
}

// Create a component that controls auth state and exposes it via
// the React Context we created.
export function StitchAuthProvider(props) {
	const [authState, setAuthState] = useState({
		isLoggedIn: hasLoggedInUser(),
		currentUser: getCurrentUser(),
	});

	useEffect(() => {
		const authListener = {
			onUserLoggedIn: (auth, loggedInUser) => {
				if (loggedInUser) {
					setAuthState((authState) => ({
						...authState,
						isLoggedIn: true,
						currentUser: loggedInUser,
					}));
				}
			},
			onUserLoggedOut: (auth, loggedOutUser) => {
				setAuthState((authState) => ({
					...authState,
					isLoggedIn: false,
					currentUser: null,
				}));
			},
		};
		addAuthenticationListener(authListener);
		handleOAuthRedirects();
		setAuthState((state) => ({ ...state }));
		return () => {
			removeAuthenticationListener(authListener);
		};
	}, []);

	// Authentication Actions
	const handleLogin = async (provider) => {
		if (!authState.isLoggedIn) {
			switch (provider) {
				case 'anonymous':
					return loginAnonymous();
				case 'google':
					return loginGoogle();
				case 'facebook':
					return loginFacebook();
				default: {
				}
			}
		}
	};
	const handleLogout = async () => {
		const { isLoggedIn } = authState;
		if (isLoggedIn) {
			await logoutCurrentUser();
			setAuthState({
				...authState,
				isLoggedIn: false,
				currentUser: null,
			});
		} else {
			console.log(`can't handleLogout when no user is logged in`);
		}
	};

	// We useMemo to improve performance by eliminating some re-renders
	const authInfo = useMemo(() => {
		const { isLoggedIn, currentUser } = authState;
		const value = {
			isLoggedIn,
			currentUser,
			actions: { handleLogin, handleLogout },
		};
		return value;
	}, [authState, handleLogin, handleLogout]);
	return (
		<StitchAuthContext.Provider value={authInfo}>
			{props.children}
		</StitchAuthContext.Provider>
	);
}
