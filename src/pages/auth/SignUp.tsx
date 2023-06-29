import { useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCredential } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";

import { useAuth } from "../../contexts";
import { Button, Input, Label } from "../../components";
import { GithubIcon, GoogleIcon } from "../../global/Icons";

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
	const { signup, githubLogin, googleLogin } = useAuth() as {
		signup: (email: string, password: string) => Promise<UserCredential>;
    githubLogin: () => Promise<UserCredential>;
    googleLogin: () => Promise<UserCredential>;
	};
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	function normalSignup() {
		if (state.password === state.confirmPassword) {
			setLoading(true);
			toast.promise(signup(state.email, state.password), {
				loading: "Loading",
				success: () => {
					setTimeout(() => null, 1000);
					return "Welcome";
				},
				error: (error) => {
					if (error instanceof FirebaseError) {
						setLoading(false);
						return (error as FirebaseError).code;
					}
					return "Unknown error";
				},
			});
			setLoading(false);
			navigate("/");
		} else {
			toast.error("Passwords don't match");
		}
	}

  function githubSignin(){
    setLoading(true);
		toast.promise(githubLogin(), {
			loading: "Loading",
			success: () => {
				setTimeout(() => null, 1000);
				return "Logged in";
			},
			error: (error) => {
				if (error instanceof FirebaseError) {
					setLoading(false);
					return (error as FirebaseError).code;
				}
				return "Unknown error";
			},
		});
		setLoading(false);
		navigate("/");
  }

  function googleSignin(){
    setLoading(true);
		toast.promise(googleLogin(), {
			loading: "Loading",
			success: () => {
				setTimeout(() => null, 1000);
				return "Logged in";
			},
			error: (error) => {
				if (error instanceof FirebaseError) {
					setLoading(false);
					return (error as FirebaseError).code;
				}
				return "Unknown error";
			},
		});
		setLoading(false);
		navigate("/");
  }

	return (
		<div className="w-full h-screen flex flex-col gap-y-4 justify-center items-center">
			<div className="flex flex-col gap-y-2 w-full max-w-xs p-4 rounded-xl bg-slate-200">
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
						value={state.confirmPassword}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							dispatch({ type: "confirmPassword", value: e.target.value })
						}
					/>
				</div>
				<Button onClick={normalSignup} disabled={loading}>
					Sign Up
				</Button>
			</div>
      <div className="flex gap-x-4">
        <button onClick={googleSignin} className="h-8 w-8"><GoogleIcon /></button>
        <button onClick={githubSignin} className="h-8 w-8"><GithubIcon /></button>
      </div>
			<div className="flex flex-col items-center">
				<div>Already have an account ?</div>
				<Link to="/login" className="font-semibold text-green-500">
					Login
				</Link>
			</div>
		</div>
	);
}
