import React, { useState } from "react";
import { signup } from "../../actions/auth";

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
		//console.table({ name, email, password, message, error, loading, showForm });
		setValues({ ...values, loading: true, error: false });
		const user = { name, email, password };

		signup(user).then((data) => {
			if (data.error) {
				console.log(data.error);
				setValues({ ...values, error: data.error, loading: false });
			} else {
				setValues({
					...values,
					name: "",
					email: "",
					password: "",
					error: "",
					message: data.message,
					loading: false,
					showForm: false,
				});
			}
		});
	};
	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const showLoading = () =>
		loading ? <div className='alert alert-info'>Loading...</div> : "";

	const showError = () =>
		error ? <div className='alert alert-danger'>{error}</div> : "";
	const showMessage = () =>
		message ? <div className='alert alert-info'>{message}</div> : "";

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
	return (
		<React.Fragment>
			{showError()}
			{showLoading()}
			{showMessage()}

			{showForm && signupForm()}
		</React.Fragment>
	);
};

export default SignupComponent;
