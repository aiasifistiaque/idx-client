import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../components/buttons/Button';
import useAuth from '../hooks/useAuth';
import { tokenName } from '../lib/constants';
import styles from '../styles/Home.module.css';

export default function Home() {
	const auth = useAuth();
	const router = useRouter();
	const logout = () => {
		localStorage.setItem(tokenName, undefined);
		//localStorage.removeItem(tokenName);

		router.push('/login');
	};
	useEffect(() => {
		const tkn = localStorage.getItem(tokenName);
		if (tkn == 'undefined') {
			router.push('/login');
		}
	}, []);
	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				flexDirection: 'column',
			}}>
			<h2>You Are Logged In</h2>
			<Button onClick={logout}>logout</Button>
		</div>
	);
}
