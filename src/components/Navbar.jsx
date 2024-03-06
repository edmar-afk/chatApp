
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Navbar() {
	const [receiver, setReceiver] = useState([]);
	// eslint-disable-next-line react/prop-types

	let { receiverId } = useParams();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`http://127.0.0.1:8000/api/users/${receiverId}/`);
				setReceiver(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [receiverId]);

	return (
		<>
			<div className="bg-gray-900 sticky top-0">
				<div className="flex justify-between mx-4 items-center py-4 border-b-2 border-green-400 text-lg md:text-2xl">
					<div className="flex flex-row items-center">
						<button
							data-drawer-target="message-sidebar"
							data-drawer-toggle="message-sidebar"
							aria-controls="message-sidebar"
							type="button"
							className="items-center p-2 my-2 ms-3 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
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
						<p className="text-white font-bold ml-3 text-sm sm:text-xl">{receiver.first_name}</p>
					</div>
					<a
						href="call/index.html"
						target="_blank"
						className="text-xs text-center text-white bg-green-700 hover:bg-green-400 hover:text-gray-800 duration-300 font-bold p-1 sm:p-3 rounded-xl">
						Create/Join Room
					</a>
				</div>
			</div>
		</>
	);
}

export default Navbar;
