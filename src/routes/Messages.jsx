import Sidebar from "../components/Sidebar";import Chatbox from "../components/Chatbox";import Navbar from "../components/Navbar";import Messagebox from "../components/Messagebox";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Messages() {
	let { receiverId } = useParams();
	const location = useLocation();
	const decoded = location.state ? location.state.decoded : null;

	// Check if decoded is not null before accessing its properties
	const staff = decoded ? decoded.is_staff : null;
	const sender = decoded ? decoded.user_id : null;
	const token = localStorage.getItem("access_token");
	const currentUser = decoded ? decoded.user_id : null;
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		// Check if user is authenticated
		if (token) {
			setAuthenticated(true);
		} else {
			setAuthenticated(false);
		}
		// console.log(sender);
		// Scroll to the bottom of the page on component mount
		window.scrollTo(0, document.body.scrollHeight);
	}, [sender, token]);

	return (
		<>
			<Sidebar
				staff={staff}
			/>
			<div className="p-4 sm:ml-72 mt-12 sm:mt-0 overflow-x-visible">
				<Navbar messageId={currentUser} />
				<Chatbox />
				{authenticated ? (
					<Messagebox
						nameId={currentUser}
						sender={currentUser}
						token={token}
						receiver={receiverId}
					/>
				) : (
					<div>
						<p className="text-white text-5xl text-center mt-4 mb-4">Please log in to send messages.</p>
						{/* You can add a login link or any other UI element here */}
					</div>
				)}
			</div>
		</>
	);
}

export default Messages;
