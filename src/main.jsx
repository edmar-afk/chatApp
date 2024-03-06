import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/Login.jsx";
import Messages from "./routes/Messages.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<App />}>
					<Route
						index
						element={<Login />}
					/>
					<Route
						path="messages/a2Bc4DfGh6Jk8Mn0Qp2Rs4U/:currentUser/t5Yv7Xz9Wb1Cd3Ef5Gh7Ij9K/:receiverId/Lm3Op5Nr7Qt9Sv1Uw3Xy5Za7"
						element={<Messages />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
