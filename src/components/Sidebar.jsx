import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
function Sidebar() {
	// eslint-disable-next-line react/prop-types
	const [staffUsers, setStaffUsers] = useState([]);
	const [students, setStudents] = useState([]);
	const navigate = useNavigate();
	const token = localStorage.getItem("access_token");
	let { currentUser } = useParams();
	// Decode the token to get the user_id
	let userId = null;
	if (token) {
		const decodedToken = jwtDecode(token);
		userId = decodedToken.user_id;
	}
	useEffect(() => {
		const fetchData = async () => {
			try {
				// First Axios request
				const staffUsersResponse = await axios.get("https://chatapimain.pythonanywhere.com/api/staffs/");
				setStaffUsers(staffUsersResponse.data);

				// Second Axios request
				const studentUserResponse = await axios.get(
					`https://chatapimain.pythonanywhere.com/api/users/messaged/${currentUser}/`
				);
				setStudents(studentUserResponse.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData(); // Fetch data initially

		const interval = setInterval(() => {
			fetchData(); // Fetch data at regular intervals
		}, 8000); // Refresh every 5 seconds (adjust as needed)

		// Cleanup function to clear the interval when component unmounts
		return () => clearInterval(interval);
	}, [currentUser]);

	const handleLogout = () => {
		// Clear JWT token from local storage
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		// Redirect to login page
		navigate("/");
	};

	return (
		<>
			<div className="fixed bg-gray-900 z-40 top-0 w-full">
				<aside
					id="message-sidebar"
					className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
					aria-label="Sidebar">
					<div className="h-full px-3 py-4 overflow-y-auto overflow-x-hidden bg-gray-800">
						<p className="text-white font-bold text-center text-2xl sticky top-[-16px] z-50 bg-gray-800 w-full h-12">
							Messages
						</p>

						<ul className="space-y-14 font-medium">
							<li className="sticky top-8 z-50">
								<form className="mt-4">
									<label
										htmlFor="search"
										className="mb-2 text-sm font-medium sr-only text-white">
										Search
									</label>
									<div className="relative">
										<input
											type="search"
											id="search"
											className="block w-full p-4 ps-4 text-sm rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
											placeholder="Search"
											required
										/>
										<button
											type="submit"
											className="text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-green-600 hover:bg-green-700 focus:ring-green-800">
											<FontAwesomeIcon icon={faSearch} />
										</button>
									</div>
								</form>
							</li>

							<li className="">
								<p className="text-green-400 my-4 text-xs">Staffs</p>
								{staffUsers.map((lists) => {
									const { id, first_name, is_staff } = lists;
									return (
										<Link
											to={`/messages/a2Bc4DfGh6Jk8Mn0Qp2Rs4U/${userId}/t5Yv7Xz9Wb1Cd3Ef5Gh7Ij9K/${id}/Lm3Op5Nr7Qt9Sv1Uw3Xy5Za7`}
											key={id}
											className="flex items-center hover:border-r-4 hover:bg-gray-950 border-green-400 hover:duration-200 p-2 text-white py-4 relative">
											<FontAwesomeIcon
												icon={faUserAlt}
												className="w-6 h-6"
											/>
											<span className="flex-1 ms-3 whitespace-nowrap truncate uppercase">{first_name}</span>
											<p className="text-xs text-green-300">{is_staff}</p>
											<p className="absolute top-2 left-1 p-0.5 px-1.5 text-[8px] rounded-full bg-green-400/80 animate-pulse text-gray-900 font-bold">
												3
											</p>
										</Link>
									);
								})}
							</li>

							<li className="border-t-2 border-gray-700">
								<p className="text-green-400 my-4 text-xs">Students</p>
								{students.map((lists) => {
									const { id, first_name, is_staff } = lists;
									return (
										<Link
											to={`/messages/a2Bc4DfGh6Jk8Mn0Qp2Rs4U/${userId}/t5Yv7Xz9Wb1Cd3Ef5Gh7Ij9K/${id}/Lm3Op5Nr7Qt9Sv1Uw3Xy5Za7`}
											key={id}
											className="flex items-center hover:border-r-4 hover:bg-gray-950 border-green-400 hover:duration-200 p-2 text-white py-4 relative">
											<FontAwesomeIcon
												icon={faUserAlt}
												className="w-6 h-6"
											/>
											<span className="flex-1 ms-3 whitespace-nowrap truncate uppercase">{first_name}</span>
											<p className="text-xs text-green-300">{is_staff}</p>
											<p className="absolute top-2 left-1 p-0.5 px-1.5 text-[8px] rounded-full bg-green-400/80 animate-pulse text-gray-900 font-bold">
												3
											</p>
										</Link>
									);
								})}
							</li>
						</ul>

						<div className="text-sm text-green-400 text-center p-3 bg-gray-800 w-full sticky bottom-[-17px]">
							<button
								onClick={handleLogout}
								className="bg-red-400 p-2 rounded-md mt-4 text-white">
								Logout
							</button>
						</div>
					</div>
				</aside>
			</div>
		</>
	);
}

export default Sidebar;
