import { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "firebase/auth";
import toast from "react-hot-toast";

import { useAuth } from "../contexts";
import { Button, Input, Label } from "../components";

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

export default function UpdateProfile() {
	const { currentUser, updateUserEmail, updateUserPassword } = useAuth() as {
		currentUser: User | null | undefined;
		updateUserEmail: (email: string) => Promise<void> | undefined;
		updateUserPassword: (email: string) => Promise<void> | undefined;
	};
	const [state, dispatch] = useReducer(reducer, {
		email: currentUser?.email ?? "",
		password: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);

	function handleSubmit() {
		if (state.password === state.confirmPassword) {
			setLoading(true);
			const promises: (Promise<void> | undefined)[] = [];

			if (currentUser?.email !== state.email) {
				promises.push(updateUserEmail(state.email));
			}
			if (state.password.length >= 6) {
				promises.push(updateUserPassword(state.password));
			}

			Promise.all(promises)
				.then(() => {
					toast.success("Profile Updated");
					dispatch({ type: "password", value: "" });
					dispatch({ type: "confirmPassword", value: "" });
				})
				.catch((error) => console.log(error))
				.finally(() => setLoading(false));
		} else {
			toast.error("Passwords don't match");
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
						type="password"
						placeholder="Leave blank to keep the same password"
						value={state.password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							dispatch({ type: "password", value: e.target.value })
						}
					/>
				</div>
				<div>
					<Label>Confirm Password</Label>
					<Input
						type="password"
						placeholder="Leave blank to keep the same password"
						value={state.confirmPassword}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							dispatch({ type: "confirmPassword", value: e.target.value })
						}
					/>
				</div>
				<Button onClick={handleSubmit} disabled={loading}>
					Update Profile
				</Button>
			</div>
			<div className="flex flex-col items-center">
				<Link to="/">Cancel</Link>
			</div>
		</div>
	);
}
