import { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";

import { useAuth } from "../contexts";
import { Input, Label } from "../components";

function reducer(
	state: { email: string },
	action: { type: string; value: string }
) {
	if (["email"].includes(action.type)) {
		return {
			...state,
			[action.type]: action.value,
		};
	} else {
		throw Error("Unknown action");
	}
}

export default function ForgotPassword() {
	const [state, dispatch] = useReducer(reducer, {
		email: "",
	});
	const { resetPassword } = useAuth() as {
		resetPassword: (email: string) => Promise<void>;
	};
	const [loading, setLoading] = useState(false);

	async function handleSubmit() {
		try {
			setLoading(true);
			await resetPassword(state.email);
			toast.success("Check your inbox");
		} catch (error) {
			if (error instanceof FirebaseError) {
				toast.error((error as FirebaseError).code);
				setLoading(false);
			}
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
				<button
					className="bg-blue-400 py-2 px-2 rounded-md mt-2 text-white"
					onClick={handleSubmit}
					disabled={loading}
				>
					Reset Your Password
				</button>
			</div>
			<div className="flex flex-col items-center">
				<div>Got your password ?</div>
				<Link to="/login">Login</Link>
			</div>
			<div className="flex flex-col items-center">
				<div>Need an account ?</div>
				<Link to="/signup">Sign Up</Link>
			</div>
		</div>
	);
}
