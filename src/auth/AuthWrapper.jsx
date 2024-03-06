import { createContext, useContext, useState } from "react";import axios from "axios"; // Import Axios library

import { RenderRoutes } from "../structure/RenderNavigation";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
	const [user, setUser] = useState({ name: "", isAuthenticated: false });

	const login = (username, password) => {
		return new Promise((resolve, reject) => {
			// Make a call to the authentication API to check the username
			axios
				.post("http://127.0.0.1:8000/api/token/", { username, password })
				.then((response) => {
					// Assuming the response contains authentication status
					if (response.data.isAuthenticated) {
						setUser({ name: username, isAuthenticated: true });
						resolve("success");
					} else {
						reject("Authentication failed");
					}
				})
				.catch((error) => {
					reject("Error occurred during authentication", error);
				});
		});
	};

	const logout = () => {
		setUser({ ...user, isAuthenticated: false });
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			<>
				<RenderRoutes />
			</>
		</AuthContext.Provider>
	);
};
