import Layout from "../components/Layout";
import Link from "next/link";

const index = () => {
	return (
		<Layout>
			<h2>Welcome to Home Page</h2>
			<Link href='/signup'>
				<a>Signup</a>
			</Link>
		</Layout>
	);
};

export default index;
