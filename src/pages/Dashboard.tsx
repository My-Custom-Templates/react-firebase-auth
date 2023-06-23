import { User } from "firebase/auth";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import { Link, useNavigate } from "react-router-dom";

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

	return (
		<div className="flex flex-col w-max gap-y-2">
			<div>
				You are logged in as
				<br /> {currentUser?.email}
			</div>
			<Link
				to="/update-profile"
				className="bg-blue-400 py-2 px-2 rounded-md mt-2 text-white text-center"
			>
				Update Profile
			</Link>
			<Button onClick={handleLogout}>Logout</Button>
		</div>
	);
}
