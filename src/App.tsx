import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

export default function App() {
	return (
		<div className="min-h-screen w-screen">
			<Toaster />
			<Router>
				<AuthProvider>
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</AuthProvider>
			</Router>
		</div>
	);
}
