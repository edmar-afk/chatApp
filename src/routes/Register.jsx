import { useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
function Register() {
	const navigateTo = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		first_name: "",
		password: "",
	});
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		if (name === "password") {
			setIsButtonDisabled(value.length < 8);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission
		const { username, first_name, password } = formData; // Extract values from formData

		try {
			const response = await axios.post(
				"https://chatapimain.pythonanywhere.com/api/register/",
				{
					username,
					first_name,
					password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 201) {
				// Handle successful registration
				// Assuming 'history' is defined elsewhere in your component
				navigateTo("/");
				swal.fire({
					title: "Registration Successful, Login Now",
					icon: "success",
					toast: true,
					timer: 6000,
					position: "top-right",
					timerProgressBar: true,
					showConfirmButton: false,
				});
			}
		} catch (error) {
			// Handle registration failure
			console.error("An Error Occurred", error.response);
			swal.fire({
				title: "An Error Occurred",
				text: error.response,
				icon: "error",
				toast: true,
				timer: 6000,
				position: "top-right",
				timerProgressBar: true,
				showConfirmButton: false,
			});
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="username"
				value={formData.username}
				onChange={handleChange}
				placeholder="School ID"
				required
			/>
			<input
				type="text"
				name="first_name"
				value={formData.first_name}
				onChange={handleChange}
				placeholder="Full Name"
				required
			/>
			<input
				type="password"
				name="password"
				value={formData.password}
				onChange={handleChange}
				placeholder="Password"
				required
			/>

			<button
				type="submit"
				disabled={isButtonDisabled}>
				Register
			</button>
		</form>
	);
}

export default Register;
