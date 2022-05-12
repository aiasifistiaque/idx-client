import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../components/buttons/Button';
import useAuth from '../hooks/useAuth';
import { tokenName } from '../lib/constants';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import * as lib from '../lib/constants';

export default function Home() {
	const auth = useAuth();
	const router = useRouter();
	const logout = () => {
		localStorage.setItem(tokenName, undefined);
		localStorage.removeItem(tokenName);

		router.push('/login');
	};
	const [dat, setData] = useState({ name: '', email: '' });

	const getInfo = async () => {
		console.log(localStorage.getItem(tokenName));
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					authorization: auth.token,
				},
			};

			const { data } = await axios.get(
				`${lib.api.backend}/user/self`,
				{},
				config
			);
			setData(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		const tkn = localStorage.getItem(tokenName);
		if (tkn == 'undefined') {
			router.push('/login');
		}
	}, []);
	useEffect(() => {
		if (!auth.loading) getInfo();
	}, [auth.loading]);
	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				flexDirection: 'column',
				background: 'whitesmoke',
			}}>
			<h2>Login Successful</h2>
			<p>{JSON.stringify(dat)}</p>
			{dat && (
				<div
					style={{
						border: '1px solid rgba(0,0,0,.1)',
						padding: '16px 128px',
						margin: '32px 0',
						borderRadius: 8,
						backgroundColor: 'White',
					}}>
					<Item title='Name'>{dat.name}</Item>{' '}
					<Item title='Email'>{dat.email}</Item>
				</div>
			)}
			<Button onClick={logout}>logout</Button>
		</div>
	);
}

const Item = ({ title, children }) => {
	return (
		<div style={{ marginTop: 8, marginBottom: 16, display: 'flex' }}>
			<div style={{ flex: 1, marginRight: 32 }}>
				<h6>{title}:</h6>
			</div>
			<div style={{ flex: 1 }}>
				<p>{children}</p>
			</div>
		</div>
	);
};
