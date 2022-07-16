import * as io from "socket.io-client";

export const getSocket = () => {
  return io.connect("localhost:3001");
};

const socket = getSocket();
export default socket;
