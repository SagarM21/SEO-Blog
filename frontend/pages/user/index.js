import Layout from "../../components/Layout";
import Link from "next/link";
import Private from "../../components/auth/Private";

const UserIndex = () => {
	return (
		<Layout>
			<Private>
				<div className='row'>
					<div className='col-md-12 pt-5 pb-5'>
						<h2>User DashBoard</h2>
					</div>
					<div className='col-md-4'>
						<ul className='list-group'>
							<li className='list-group-item'>
								<a href='/user/crud/blog'>Create Blog</a>
							</li>

							<li className='list-group-item'>
								<Link href='/user/crud/blogs'>
									<a>Update/Delete Blogs</a>
								</Link>
							</li>
							<li className='list-group-item'>
								<Link href='/user/update'>
									<a>Update Profile</a>
								</Link>
							</li>
						</ul>
					</div>
					<div className='col-md-8'>right</div>
				</div>
			</Private>
		</Layout>
	);
};

export default UserIndex;
