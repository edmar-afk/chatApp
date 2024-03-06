import { useEffect, useState } from "react";import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
	const navigateTo = useNavigate();
	const [authenticated, setAuthenticated] = useState(false);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const accessToken = localStorage.getItem("access_token");
		if (accessToken) {
			const decodedToken = jwtDecode(accessToken);
			setUserData(decodedToken);
			setAuthenticated(true);
		} else {
			// If not authenticated, redirect to login page
			navigateTo("/");
		}
	}, [navigateTo]);

	const handleLogout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		setAuthenticated(false);
		navigateTo("/");
	};

	return (
		<>
			{authenticated ? (
				<div className="flex flex-col items-center justify-center h-screen">
					<h1 className="text-7xl text-white font-bold mb-4">Welcome, {userData.username}</h1>
					<button
						onClick={handleLogout}
						className="bg-red-500 hover:bg-red-600 text-2xl text-white font-semibold py-8 px-12 rounded">
						Logout
					</button>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</>
	);
};

export default Dashboard;
