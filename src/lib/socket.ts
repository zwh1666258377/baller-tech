import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:8080/';

export const generateSocket = () => socketIOClient(ENDPOINT);
