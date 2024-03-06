/* eslint-disable react/prop-types */ /* eslint-disable react/no-unescaped-entities */ import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";import { faCheckCircle, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import noMessage from "../assets/no-message.png";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode

function Chatbox() {
	const [messages, setMessages] = useState([]);
	let { receiverId } = useParams();
	const token = localStorage.getItem("access_token");
	let intervalId; // Define intervalId outside of useEffect

	// Decode the token to get the user_id
	let userId = null;
	if (token) {
		const decodedToken = jwtDecode(token);
		userId = decodedToken.user_id;
	}

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await axios.get(
					`https://chatapimain.pythonanywhere.com/api/conversation/?sender_id=${userId}&receiver_id=${receiverId}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("access_token")}`,
						},
					}
				);
				setMessages(response.data);
			} catch (error) {
				console.log("Error fetching messages: ", error);
			}
		};

		// Function to check if user has scrolled to the bottom
		const isAtBottom = () => {
			return window.innerHeight + window.scrollY >= document.body.offsetHeight;
		};

		// Function to handle scroll event
		const handleScroll = () => {
			if (isAtBottom()) {
				// Restart interval if at the bottom
				if (!intervalId) {
					fetchMessages(); // Fetch messages immediately upon reaching the bottom
					intervalId = setInterval(fetchMessages, 1000); // Restart interval
				}
			} else {
				// Clear interval if not at the bottom
				clearInterval(intervalId);
				intervalId = null;
			}
		};

		// Add scroll event listener
		window.addEventListener("scroll", handleScroll);

		// Fetch initial messages
		fetchMessages();

		// Cleanup function
		return () => {
			window.removeEventListener("scroll", handleScroll);
			clearInterval(intervalId);
		};
	}, [userId, receiverId]);

	const formatTimestampToManilaTime = (timestamp) => {
		const date = new Date(timestamp);
		const options = {
			timeZone: "Asia/Manila",
			month: "short",
			day: "2-digit",
			year: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		};
		return date.toLocaleString("en-US", options);
	};

	return (
		<>
			{messages.length === 0 ? (
				<div className="flex flex-col justify-center items-center text-gray-400 py-4">
					<img
						src={noMessage}
						className="w-[500px]"
						alt=""
						draggable="false"
					/>
					<p className="font-bold mb-4">Please keep the chatbox formal as possible.</p>
				</div>
			) : (
				messages.map((message) => (
					<div key={message.id}>
						{userId == message.sender.id ? (
							<div className="flex justify-end items-start gap-2.5 py-4">
								<div className="flex flex-col w-full max-w-[270px] break-words md:max-w-[500px] leading-1.5 p-4 border-gray-200 rounded-s-xl rounded-br-xl bg-green-500">
									<div className="flex items-center space-x-2">
										<span className="text-sm font-semibold text-white">You</span>
										<span className="text-sm font-normal text-white">
											<FontAwesomeIcon icon={faCheckCircle} />
										</span>
									</div>
									<p className="text-xs sm:text-sm font-normal py-2.5 text-white">{message.message}</p>
									<span className="text-xs font-bold text-white">{formatTimestampToManilaTime(message.sent_time)}</span>
								</div>
								<FontAwesomeIcon
									icon={faUserAlt}
									className=" text-white bg-green-800 p-4 rounded-full"
								/>
							</div>
						) : (
							<div className="flex items-start gap-2.5 py-4">
								<FontAwesomeIcon
									icon={faUserAlt}
									className=" text-white bg-gray-800 p-4 rounded-full"
								/>
								<div className="flex flex-col w-full min-w-[270px] break-words sm:max-w-[500px] leading-1.5 p-4 border-gray-200 rounded-e-xl rounded-es-xl bg-gray-700">
									<div className="flex items-center space-x-2">
										<span className="text-sm font-semibold text-white ">{message.sender.first_name}</span>
										<span className="text-sm font-normal text-green-400">
											{formatTimestampToManilaTime(message.sent_time)}
										</span>
									</div>
									<p className="text-sm font-normal py-2.5 text-white">{message.message}</p>
									<span className="text-sm font-bold text-green-400">
										Delivered
										<FontAwesomeIcon
											icon={faCheckCircle}
											className="ml-1"
										/>
									</span>
								</div>
							</div>
						)}
					</div>
				))
			)}
		</>
	);
}

export default Chatbox;
