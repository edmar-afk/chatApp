import Login from "../routes/Login";
import Messages from '../routes/Messages'
import Register from '../routes/Register'

export const nav = [
	{ path: "/", name: "Home", element: <Login />, isMenu: false, isPrivate: false },
	{ path: "/register", name: "Register", element: <Register />, isMenu: false, isPrivate: false },
	{ path: "/messages", name: "Messages", element: <Messages />, isMenu: false, isPrivate: true },
];
