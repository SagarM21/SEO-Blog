import React, { useState } from "react";
import { APP_NAME } from "../config";
import Link from "next/link";
import {
	Navbar,
	NavbarBrand,
	NavbarToggler,
	Nav,
	Collapse,
	NavLink,
	NavItem,
} from "reactstrap";
import { isAuth, signout } from "../actions/auth";
import Router from "next/router";
import nProgress from "nprogress";

import ".././node_modules/nprogress/nprogress.css";

Router.onRouteChangeStart = (url) => nProgress.start();
Router.onRouteChangeComplete = (url) => nProgress.done();
Router.onRouteChangeError = (url) => nProgress.done();

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div>
			<Navbar color='light' light expand='md'>
				<Link href='/'>
					<NavLink className='font-weight-bold'>{APP_NAME}</NavLink>
				</Link>

				<NavbarToggler className='me-2' onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='ml-auto' navbar>
						{!isAuth() && (
							<React.Fragment>
								<NavItem>
									<Link href='/signin'>
										<NavLink>Signin</NavLink>
									</Link>
								</NavItem>
								<NavItem>
									<Link href='/signup'>
										<NavLink>Signup</NavLink>
									</Link>
								</NavItem>
							</React.Fragment>
						)}

						{isAuth() && isAuth().role === 1 && (
							<NavItem>
								<Link href='/admin'>
									<NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
								</Link>
							</NavItem>
						)}

						{isAuth() && isAuth().role === 0 && (
							<NavItem>
								<Link href='/user'>
									<NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
								</Link>
							</NavItem>
						)}

						{isAuth() && (
							<NavItem>
								<NavLink
									style={{ cursor: "pointer" }}
									onClick={() => signout(() => Router.push("/signin"))}
								>
									Signout
								</NavLink>
							</NavItem>
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Header;
