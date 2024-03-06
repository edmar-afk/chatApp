import { useState } from "react";import axios from "axios";import Swal from "sweetalert2";import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://127.0.0.1:8000/api/token/", {
				username,
				password,
			});
			const userData = response.data;
			localStorage.setItem("access_token", response.data.access);
			localStorage.setItem("refresh_token", response.data.refresh);
			// console.log(userData); // Log userData to check its structure
			// console.log("Login successful");
			const token = userData.access;

			// console.log("ACCESS TOKEN FOR AUTHENTICATION", localStorage.getItem("access_token"));
			// Decode the token to get user information
			const decodedToken = jwtDecode(token);
			// console.log(decodedToken); // Log decoded token

			// Extract user ID from decoded token
			const user_id = decodedToken.user_id;

			// Redirect to message page upon successful login
			navigate(`/messages/a2Bc4DfGh6Jk8Mn0Qp2Rs4U/${user_id}/t5Yv7Xz9Wb1Cd3Ef5Gh7Ij9K/${5}/Lm3Op5Nr7Qt9Sv1Uw3Xy5Za7`, {
				state: { decoded: decodedToken },
			});
		} catch (error) {
			console.error("Login failed", error);
			// Handle login failure (e.g., show error message)
			Swal.fire({
				icon: "error",
				title: "Login Failed",
				text: "Invalid Username/School ID or Password",
			});
		}
	};

	return (
		<>
			<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="#"
						alt="Login"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white animate-jump animate-once">
						Login
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						className="space-y-6"
						onSubmit={handleSubmit}>
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="username"
									className="block text-sm font-medium leading-6 text-white">
									Username
								</label>
								<div className="text-sm">
									<p className="font-semibold text-xs text-green-300 hover:text-orange-500">School ID for students</p>
								</div>
							</div>

							<div className="mt-2">
								<input
									id="username"
									name="username"
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-white">
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
								Sign in
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						No account?
						<Link
							to="/register"
							className="font-semibold leading-6 ml-1 text-indigo-600 hover:text-indigo-500">
							Register Here
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default Login;
