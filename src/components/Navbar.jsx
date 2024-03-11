import { useState, useEffect } from "react";import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
function Navbar() {
	const [receiver, setReceiver] = useState([]);
	// eslint-disable-next-line react/prop-types

	let { receiverId } = useParams();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`https://chatapimain.pythonanywhere.com/api/users/${receiverId}/`);
				setReceiver(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [receiverId]);

	return (
		<>
			<div className="bg-slate-950 sticky top-0 z-30">
				<div className="flex justify-between mx-4 items-center py-4 border-b-2 border-slate-900 text-lg md:text-2xl">
					<div className="flex flex-row items-center">
						<p className="text-white font-bold ml-3 text-sm sm:text-xl">{receiver.first_name}</p>
					</div>
					<a
						href="call/index.html"
						target="_blank"
						className="text-center text-white hover:text-green-400 duration-300 font-bold rounded-xl">
						<FontAwesomeIcon
							icon={faVideo}
							className="text-green-400"
						/>
						<p className="text-xs">Create/Join Room</p>
					</a>
				</div>
			</div>
		</>
	);
}

export default Navbar;
