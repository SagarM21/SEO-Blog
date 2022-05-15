import Layout from "../../../components/Layout";
import Link from "next/link";
import Admin from "../../../components/auth/Admin";

const CategoryTag = () => {
	return (
		<Layout>
			<Admin>
				<div className='row'>
					<div className='col-md-12 pt-5 pb-5'>
						<h2>Manage Categories and Tags</h2>
					</div>
					<div className='col-md-6'>
						<p>categories</p>
					</div>
					<div className='col-md-6'>
						<p>Tag</p>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};

export default CategoryTag;
