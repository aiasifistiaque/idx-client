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
		//localStorage.removeItem(tokenName);

		router.push('/login');
	};
	const [dat, setData] = useState();

	const getInfo = async () => {
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
			//router.push('/login');
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
			}}>
			<h2>Login Successful</h2>
			<p>{JSON.stringify(dat)}</p>
			{dat && (
				<div>
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
		<div>
			<h6>{title}</h6>
			<p>{children}</p>
		</div>
	);
};
