// prettier-ignore
import { SignUp, Login, Dashboard, Error404, ForgotPassword, UpdateProfile } from "./pages";
import { AuthProvider, useAuth } from "./contexts";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { User } from "firebase/auth";

export default function App() {
	return (
		<div className="min-h-screen w-screen">
			<Toaster />
			<Router>
				<AuthProvider>
					<Routes>
						<Route
							path="/"
							element={
								<RedirectAuth redirectTo="/login">
									<Dashboard />
								</RedirectAuth>
							}
						/>
						<Route
							path="/update-profile"
							element={
								<RedirectAuth redirectTo="/login">
									<UpdateProfile />
								</RedirectAuth>
							}
						/>
						<Route
							path="/signup"
							element={
								<RedirectAuth redirectTo="/" auth>
									<SignUp />
								</RedirectAuth>
							}
						/>
						<Route
							path="/login"
							element={
								<RedirectAuth redirectTo="/" auth>
									<Login />
								</RedirectAuth>
							}
						/>
						<Route
							path="/forgot-password"
							element={
								<RedirectAuth redirectTo="/" auth>
									<ForgotPassword />
								</RedirectAuth>
							}
						/>
						<Route path="*" element={<Error404 />} />
					</Routes>
				</AuthProvider>
			</Router>
		</div>
	);
}

interface RedirectAuthProps {
	children: React.ReactNode;
	redirectTo: string;
	auth?: boolean;
}

function RedirectAuth({
	children,
	redirectTo,
	auth = false,
}: RedirectAuthProps) {
	const { currentUser } = useAuth() as {
		currentUser: User | null | undefined;
	};
	return +Boolean(currentUser) ^ +auth ? (
		children
	) : (
		<Navigate to={redirectTo} />
	);
}
