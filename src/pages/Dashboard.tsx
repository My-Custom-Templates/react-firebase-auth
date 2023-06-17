import { User } from "firebase/auth";
import { Button } from "../components/Basic";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div>
			<div>{currentUser?.email}</div>
			<Button onClick={handleLogout}>Logout</Button>
		</div>
	);
}
