import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";import {
	faArrowRightFromBracket,
	faClock,
	faPeopleGroup,
	faPersonChalkboard,
	faSearch,
	faUser,
	faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
function Sidebar() {
	// eslint-disable-next-line react/prop-types
	const [staffUsers, setStaffUsers] = useState([]);
	const [students, setStudents] = useState([]);
	const [toggleSideBar, setToggleSideBar] = useState(false);
	const [toggleUsers, setToggleUsers] = useState(true);
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
				if (toggleUsers) {
					// Fetch staff users
					const staffUsersResponse = await axios.get("https://chatapimain.pythonanywhere.com/api/staffs/");
					setStaffUsers(staffUsersResponse.data);
				} else {
					// Fetch student users
					const studentUserResponse = await axios.get(
						`https://chatapimain.pythonanywhere.com/api/users/messaged/${currentUser}/`
					);
					setStudents(studentUserResponse.data);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData(); // Fetch data initially

		const interval = setInterval(() => {
			fetchData(); // Fetch data at regular intervals
		}, 8000); // Refresh every 8 seconds (adjust as needed)

		// Cleanup function to clear the interval when component unmounts
		return () => clearInterval(interval);
	}, [currentUser, toggleUsers]);

	const handleLogout = () => {
		// Clear JWT token from local storage
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		// Redirect to login page
		navigate("/");
	};

	const isDesktop = window.innerWidth >= 768; // for sidebar disable if desktop size
	return (
		<>
			<div className="fixed z-40 top-0 w-full">
				{toggleSideBar && (
					<div
						className="flex text-green-400 bg-slate-950/70 w-full h-screen z-30"
						onClick={() => setToggleSideBar(!toggleSideBar)}></div>
				)}
				<button
					type="button"
					onClick={() => setToggleSideBar(!toggleSideBar)}
					className="items-center p-2 my-2 ms-3 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-slate-900 focus:ring-slate-800">
					<span className="sr-only">Open sidebar</span>
					<svg
						className="w-6 h-6"
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path
							clipRule="evenodd"
							fillRule="evenodd"
							d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
					</svg>
				</button>
				<aside
					className={`fixed top-0 left-0 border-r-[1px] border-slate-900 z-40 w-72 h-screen transition-transform ${
						window.innerWidth < 768 ? (toggleSideBar ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
					}`}>
					<div className="flex flex-row">
						<div className="flex flex-col justify-center h-screen bg-slate-950 z-20 w-[70px]">
							<div className="text-center">
								<FontAwesomeIcon
									icon={faPeopleGroup}
									className="text-white border-2 p-3 rounded-xl bg-slate-900 border-green-900"
								/>
								<p className="text-xs text-white">Groups</p>
							</div>

							<div
								className="text-center my-8"
								onClick={() => setToggleUsers(true)}>
								<FontAwesomeIcon
									icon={faPersonChalkboard}
									className={`text-white border-4 mx-2 hover:cursor-pointer p-3 rounded-xl bg-slate-900 ${
										toggleUsers ? "border-cyan-400 duration-300" : "border-green-900 duration-300"
									}`}
								/>
								<p className="text-xs text-cyan-400">Staffs</p>
							</div>

							<div
								className="text-center"
								onClick={() => setToggleUsers(false)}>
								<FontAwesomeIcon
									icon={faUser}
									className={`text-white border-4 mx-2 p-3 rounded-xl hover:cursor-pointer bg-slate-900 ${
										toggleUsers ? "border-green-900 duration-300" : "border-cyan-400 duration-300"
									}`}
								/>
								<p className="text-xs text-white">Students</p>
							</div>
							<div className="text-sm w-full fixed bottom-0 left-0">
								<button
									onClick={handleLogout}
									className="p-2 hover:bg-slate-950 rounded-md mt-4 duration-300 text-white">
									<FontAwesomeIcon
										icon={faArrowRightFromBracket}
										className="bg-slate-900 p-3 rounded-xl border-2 border-red-400 text-red-400"
									/>
									<p className="text-xs">Logout</p>
								</button>
							</div>
						</div>

						<div className="h-screen px-3 py-4 overflow-y-auto overflow-x-hidden bg-slate-900">
							<div className="flex flex-row items-center justify-center text-white font-bold text-center text-2xl sticky top-[-16px] z-50 bg-slate-900 w-full h-12">
								<img
									src={Logo}
									className="w-12 h-12 mr-4"
									alt=""
								/>
								JHCSC
							</div>

							<ul className="space-y-14 font-medium">
								{/* Your search form */}
								<li className="sticky top-8 z-50">
									<form className="mt-4 shadow-xl">
										<label
											htmlFor="search"
											className="mb-2 text-sm font-medium sr-only text-white">
											Search
										</label>
										<div className="relative">
											<input
												type="search"
												id="search"
												className="block w-full p-4 ps-4 text-sm rounded-lg bg-slate-950 border-green-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
												placeholder="Search"
												required
											/>
											<p className="text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-slate-950">
												<FontAwesomeIcon icon={faSearch} />
											</p>
										</div>
									</form>
								</li>

								{/* List based on toggleUsers */}
								{toggleUsers ? (
									<li>
										<p className="text-green-400 my-4 text-xs">Staffs</p>
										{staffUsers.map((lists) => {
											const { id, first_name } = lists;
											return (
												<Link
													to={`/messages/a2Bc4DfGh6Jk8Mn0Qp2Rs4U/${userId}/t5Yv7Xz9Wb1Cd3Ef5Gh7Ij9K/${id}/Lm3Op5Nr7Qt9Sv1Uw3Xy5Za7`}
													key={id}
													onClick={() => (isDesktop ? null : setToggleSideBar(!toggleSideBar))}
													className="p-2 text-white py-4 relative">
													<div className="flex flex-row items-center justify-between hover:border-l-4 rounded-md border-cyan-400 hover:duration-200 ">
														<div className="flex flex-row items-center ">
															<FontAwesomeIcon
																icon={faUserAlt}
																className="w-4 h-4 ml-2"
															/>
															<div className="flex flex-col">
																<p className="text-sm  ms-3 whitespace-nowrap truncate uppercase">{first_name}</p>
																<p className="text-xs ms-3 text-orange-400 font-bold">{id} unread message/s</p>
															</div>
														</div>
														<p className="text-xs bg-green-400 rounded-full p-1"></p>
													</div>
												</Link>
											);
										})}
									</li>
								) : (
									<li>
										<p className="text-green-400 my-4 text-xs">Students</p>
										{students.length === 0 ? (
											<>
												<div className="text-center text-white">
													<FontAwesomeIcon
														icon={faClock}
														className="text-4xl animate-spin mt-4"
													/>
													<p className="text-sm mt-4">No students here....</p>
													<p className="text-sm mt-2">Use Search to start conversation</p>
												</div>
											</>
										) : (
											students.map((lists) => {
												const { id, first_name, is_staff } = lists;
												return (
													<Link
														to={`/messages/a2Bc4DfGh6Jk8Mn0Qp2Rs4U/${userId}/t5Yv7Xz9Wb1Cd3Ef5Gh7Ij9K/${id}/Lm3Op5Nr7Qt9Sv1Uw3Xy5Za7`}
														key={id}
														onClick={() => (isDesktop ? null : setToggleSideBar(!toggleSideBar))}
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
											})
										)}
									</li>
								)}
							</ul>
						</div>
					</div>
				</aside>
			</div>
		</>
	);
}

export default Sidebar;
