import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
	User,
	UserCredential,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	sendPasswordResetEmail,
	updateEmail,
	updatePassword,
} from "firebase/auth";

interface Auth {
	currentUser: User | null | undefined;
	signup: (email: string, password: string) => Promise<UserCredential>;
	login: (email: string, password: string) => Promise<UserCredential>;
	logout: () => Promise<void>;
	resetPassword: (email: string) => Promise<void>;
	updateUserEmail: (email: string) => Promise<void> | undefined;
	updateUserPassword: (email: string) => Promise<void> | undefined;
}

// const AuthContext = createContext();
const AuthContext = createContext<Auth | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [currentUser, setCurrentUser] = useState<User | null>();
	const [loading, setLoading] = useState<boolean>(true);

	function signup(email: string, password: string) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function login(email: string, password: string) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logout() {
		return signOut(auth);
	}

	function resetPassword(email: string) {
		return sendPasswordResetEmail(auth, email);
	}

	function updateUserEmail(email: string) {
		if (currentUser) {
			return updateEmail(currentUser, email);
		}
		return;
	}

	function updateUserPassword(password: string) {
		if (currentUser) {
			return updatePassword(currentUser, password);
		}
		return;
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value: Auth = {
		currentUser,
		signup,
		login,
		logout,
		resetPassword,
		updateUserEmail,
		updateUserPassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
