import { useReducer, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button, Input, Label } from "../components/Basic";
import { Link, useNavigate } from "react-router-dom";
import { UserCredential } from "firebase/auth";

function reducer(
	state: { email: string; password: string; confirmPassword: string },
	action: { type: string; value: string }
) {
	if (["email", "password", "confirmPassword"].includes(action.type)) {
		return {
			...state,
			[action.type]: action.value,
		};
	} else {
		throw Error("Unknown action");
	}
}

export default function SignUp() {
	const [state, dispatch] = useReducer(reducer, {
		email: "",
		password: "",
		confirmPassword: "",
	});
	const { signup } = useAuth() as {
		signup: (email: string, password: string) => Promise<UserCredential>;
	};
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit() {
		if (state.password === state.confirmPassword) {
			try {
				setLoading(true);
				await signup(state.email, state.password);
				navigate("/");
			} catch (err) {
				console.log(err);
			}
		} else {
			console.log("Passwords don't match");
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
				<div>
					<Label>Confirm Password</Label>
					<Input
						value={state.confirmPassword}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							dispatch({ type: "confirmPassword", value: e.target.value })
						}
					/>
				</div>
				<Button
					onClick={handleSubmit}
					disabled={loading}
				>
					Sign Up
				</Button>
			</div>
			<div className="flex flex-col items-center">
				<div>Already have an account ?</div>
				<Link to="/login">Login</Link>
			</div>
		</div>
	);
}
