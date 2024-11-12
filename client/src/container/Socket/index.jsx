import io from 'socket.io-client';
import React from 'react';

export const SocketContext = React.createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = React.useState(null);

    React.useEffect(() => {
        const URL = process.env.REACT_APP_SOCKET_URL;
        const socketInstance = io(URL, { withCredentials: true });
        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            console.log('Socket Connected');
        });
        
        socketInstance.on('message', (data) => {
            console.log('Message:', data);
        });

        socketInstance.on('disconnect', () => {
            console.log('Socket Disconnected');
        });

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
