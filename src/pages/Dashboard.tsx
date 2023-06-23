import { User } from "firebase/auth";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts";

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
		<div className="flex flex-col w-max gap-y-2 mx-auto h-screen justify-center items-center">
			<div>You are logged in as</div>
			<div className="font-semibold">{currentUser?.email}</div>
			<Link
				to="/update-profile"
				className="bg-blue-400 py-2 px-2 rounded-md mt-2 text-white text-center w-full"
			>
				Update Profile
			</Link>
			<button
				className="hover:bg-red-500 border-2 border-red-500 duration-200 text-red-500 hover:text-white py-2 px-2 rounded-md mt-2 w-full"
				onClick={handleLogout}
			>
				Logout
			</button>
		</div>
	);
}
