import React, { createContext, useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import * as lib from '../lib/constants';

export const SocketContext = createContext();

export function useSocket() {
	return useContext(SocketContext);
}

export const SocketProvider = ({ children, ip }) => {
	const [socket, setSocket] = useState();

	useEffect(() => {
		// if (!ip) return;
		// const newSocket = io(lib.api.backend, {
		// 	query: { ip: ip },
		// });
		// //console.log(newSocket);
		// setSocket(newSocket);

		// console.log('we are here');

		return () => {
			//newSocket.close();
		};
	}, [ip]);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};
