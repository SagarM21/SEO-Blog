import Router from "next/router";
import React, { useEffect, useState } from "react";
import { authenticate, isAuth, signin } from "../../actions/auth";

const SigninComponent = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		loading: false,
		message: "",
		showForm: true,
	});

	const { email, password, message, error, loading, showForm } = values;

	useEffect(() => {
		isAuth() && Router.push("/");
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		//console.table({ name, email, password, message, error, loading, showForm });
		setValues({ ...values, loading: true, error: false });
		const user = { email, password };

		signin(user).then((data) => {
			if (data.error) {
				console.log(data.error);
				setValues({ ...values, error: data.error, loading: false });
			} else {
				authenticate(data, () => {
					if (isAuth() && isAuth().role === 1) {
						Router.push("/admin");
					} else {
						Router.push("/user");
					}
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

	const signinForm = () => {
		return (
			<form onSubmit={handleSubmit}>
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
						type='password'
						placeholder='Enter your password'
						className='form-control'
					/>
				</div>

				<button className='btn btn-primary'>Signin</button>
			</form>
		);
	};
	return (
		<React.Fragment>
			{showError()}
			{showLoading()}
			{showMessage()}

			{showForm && signinForm()}
		</React.Fragment>
	);
};

export default SigninComponent;
