import React from 'react';
import io from 'socket.io-client';
import MessageSocket from './message';

export const SocketContext = React.createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = React.useState(null);
    const [messageSocket, setMessageSocket] = React.useState(null);

    React.useEffect(() => {
        const URL = process.env.REACT_APP_SOCKET_URL;
        const socketInstance = io(URL, { withCredentials: true });
        setSocket(socketInstance);

        const messageSocketInstance = new MessageSocket(socketInstance);
        setMessageSocket(messageSocketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, messageSocket }}>
            {children}
        </SocketContext.Provider>
    );
};
