import React, { useEffect, useState } from 'react';
import styles from './Auth.module.css';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';
import { io } from 'socket.io-client';
import * as lib from '../../lib/constants';
import { useRouter } from 'next/router';

const AuthContainer = ({ children }) => {
	const [ip, setIP] = useState('');
	const [socket, setSocket] = useState();
	const router = useRouter();

	const getData = async () => {
		try {
			const res = await axios.get('https://geolocation-db.com/json/');
			//console.log(res.data);
			setIP(res.data.IPv4);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const listener = (...args) => {
		console.log(args[0]);
		router.push(`/authverify?token=${args[0]}`);
	};

	useEffect(() => {
		if (!ip) return;
		if (ip || ip != undefined) {
			const newSocket = io(lib.api.backend, {
				query: { ip: ip },
			});

			setSocket(newSocket);

			console.log('we are here');

			newSocket.on('token', listener);

			// and then later...

			return () => {
				newSocket.close();
				newSocket.off('token', listener);
			};
		}
	}, [ip]);

	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<div className={styles.details}>
					<h3>Welcome to XYZ</h3>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
						vulputate libero <br /> et velit interdum,
					</p>
					<div className='mt-3'>{children}</div>
				</div>
			</div>
			<div className={styles.img}>
				{/* <img src='/auth.jpg' alt='auth' /> */}
				{ip && (
					<div>
						<h4>Or, Scan QR to continue</h4>

						<div>
							<QRCodeCanvas
								value={JSON.stringify({
									code: '627d2f3b5e13904e074b12c7',
									ip: ip,
									app: 'IDX',
								})}
							/>
							<p>{ip}</p>
							<br />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AuthContainer;
