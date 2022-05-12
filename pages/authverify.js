import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { tokenName } from '../lib/constants';

const Authverify = () => {
	const router = useRouter();
	const { token } = router.query;

	useEffect(() => {
		if (token != null) {
			localStorage.setItem(tokenName, token);
			router.push('/');
		}
	}, [token]);
	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
			}}>
			<h5>Verifying, please wait</h5>
		</div>
	);
};

export default Authverify;
