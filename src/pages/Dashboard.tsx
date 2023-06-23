import { useEffect } from "react";
import { User } from "firebase/auth";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts";
import { Button } from "../components";

export default function Dashboard() {
	const { logout, currentUser } = useAuth() as {
		currentUser: User | null | undefined;
		logout: () => Promise<void>;
	};
	const navigate = useNavigate();

	async function handleLogout() {
		try {
			await logout();
			navigate("/login");
		} catch (error) {
			if (error instanceof FirebaseError)
				toast.error((error as FirebaseError).code);
		}
	}

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		}
	});

	return (
		<div>
			<div>{currentUser?.email}</div>
			<Button onClick={handleLogout}>Logout</Button>
		</div>
	);
}
