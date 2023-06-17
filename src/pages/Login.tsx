import { useReducer, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Input, Label } from "../components/Basic";
import { Link, useNavigate } from "react-router-dom";
import { UserCredential } from "firebase/auth";

function reducer(
	state: { email: string; password: string },
	action: { type: string; value: string }
) {
	if (["email", "password"].includes(action.type)) {
		return {
			...state,
			[action.type]: action.value,
		};
	} else {
		throw Error("Unknown action");
	}
}

export default function Login() {
	const [state, dispatch] = useReducer(reducer, {
		email: "",
		password: "",
	});
	const { login } = useAuth() as {
		login: (email: string, password: string) => Promise<UserCredential>;
	};
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit() {
		try {
			setLoading(true);
			await login(state.email, state.password);
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className="w-full h-screen flex flex-col gap-y-4 justify-center items-center">
			<div className="flex flex-col gap-y-2 max-w-xs p-4 rounded-xl bg-slate-200">
				<div>
					<Label>Email</Label>
					<Input
						value={state.email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							dispatch({ type: "email", value: e.target.value })
						}
					/>
				</div>
				<div>
					<Label>Password</Label>
					<Input
						value={state.password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							dispatch({ type: "password", value: e.target.value })
						}
					/>
				</div>
				<button
					className="bg-blue-400 py-2 px-2 rounded-md mt-2 text-white"
					onClick={handleSubmit}
					disabled={loading}
				>
					Login
				</button>
			</div>
			<div className="flex flex-col items-center">
				<div>Need an account ?</div>
				<Link to="/signup">Sign Up</Link>
			</div>
		</div>
	);
}
