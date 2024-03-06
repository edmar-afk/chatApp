import { faCommentAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

function Messagebox(props) {
	// eslint-disable-next-line react/prop-types
	const { receiver } = props;
	const [message, setMessage] = useState("");
	const token = localStorage.getItem("access_token");

	// Decode the token to get the user_id
	let userId = null;
	if (token) {
		const decodedToken = jwtDecode(token);
		userId = decodedToken.user_id;
	}
	const handleMessageChange = (e) => {
		setMessage(e.target.value);
	};

	const handleSendMessage = async (e) => {
		e.preventDefault();
		try {
			// const accessToken = localStorage.getItem("access_token");
			// console.log("Access Token:", accessToken); // Log access token for debugging
			const response = await axios.post(
				"https://chatapimain.pythonanywhere.com/api/messages/",
				{
					message,
					sender: userId,
					receiver,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
					},
				},
				setMessage("")
			);
			const messageData = response.data;
			console.log("Message Sent:", messageData); // Log message data for debugging
		} catch (error) {
			console.error("Message was not sent", error);
			Swal.fire({
				icon: "error",
				title: "Message not Sent",
				text: error.data,
			});
		}
	};

	return (
		<>
			<div className="sticky bottom-0 w-full bg-gray-900 p-4">
				<div>
					<label
						htmlFor="message"
						className="mb-2 text-sm font-medium sr-only text-white">
						message
					</label>
					<div className="">
						<div className="absolute inset-y-0 start-0 flex items-center ps-7 pointer-events-none">
							<FontAwesomeIcon
								icon={faCommentAlt}
								className="text-white"
							/>
						</div>
						<form onSubmit={handleSendMessage}>
							<input
								type="text"
								id="message"
								name="message"
								value={message}
								onChange={handleMessageChange}
								className="block w-full p-4 ps-10 text-sm rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
								placeholder="Type Message here..."
								required
							/>

							<button
								type="submit"
								className="text-white absolute end-6 bottom-6 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-green-600 hover:bg-green-700 focus:ring-green-800 duration-300">
								<FontAwesomeIcon icon={faPaperPlane} />
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Messagebox;
