import Layout from "../../components/Layout";
import Link from "next/link";
import Private from "../../components/auth/Private";
import ProfileUpdate from "../../components/auth/ProfileUpdate";

const UserProfileUpdate = () => {
	return (
		<Layout>
			<Private>
				<div className='row'>
					<ProfileUpdate />
				</div>
			</Private>
		</Layout>
	);
};

export default UserProfileUpdate;
