import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Login from '../components/auth/Login';
import useAuth from '../hooks/useAuth';
import { tokenName } from '../lib/constants';

const login = () => {
	//const { token, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem(tokenName);
		if (token != 'undefined') {
			router.push('/');
		} else {
			console.log('ues token');
		}
	}, []);
	return <Login />;
};

export default login;
