import { useContext } from "react";
import { SocketContext } from "../container";

const useSocket = () => {
    return useContext(SocketContext);
};

export default useSocket;
