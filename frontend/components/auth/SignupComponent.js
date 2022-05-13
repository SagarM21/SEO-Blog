import React, { useState } from "react";

const SignupComponent = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: "",
		loading: false,
		message: "",
		showForm: true,
	});

	const { name, email, password, message, error, loading, showForm } = values;

	const handleSubmit = (e) => {
		e.preventDefault();
		console.table({ name, email, password, message, error, loading, showForm });
	};
	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const signupForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						value={name}
						onChange={handleChange("name")}
						type='text'
						placeholder='Enter your name'
						className='form-control'
					/>
				</div>

				<div className='form-group'>
					<input
						value={email}
						onChange={handleChange("email")}
						type='email'
						placeholder='Enter your email'
						className='form-control'
					/>
				</div>

				<div className='form-group'>
					<input
						value={password}
						onChange={handleChange("password")}
						type='text'
						placeholder='Enter your password'
						className='form-control'
					/>
				</div>

				<button className='btn btn-primary'>Signup</button>
			</form>
		);
	};
	return <React.Fragment>{signupForm()}</React.Fragment>;
};

export default SignupComponent;
