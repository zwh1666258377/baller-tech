import socket from 'socket.io';
import socketIOClient from 'socket.io-client';

const sockets = new Map<string, socket.Socket>();

function registerSocket(id, socket) {
  sockets.set(id, socket);
}

function getSocket(id) {
  return sockets.get(id);
}

function removeSocket(id) {
  sockets.delete(id);
}

export function initSocket(httpServer) {
  socket.listen(httpServer).on('connection', function(socket) {
    const id = socket.id;
    registerSocket(id, socket);
    console.log(`id:${id},连接成功`);

    socket.on('disconnect', () => {
      console.log(`id:${id},断开连接`);
      removeSocket(id);
    });

    socket.on('send_socket', data => {
      console.log(data, '==');
      const b = socketIOClient('ws://api.baller-tech.com/v1/service/ws/v1/asr');
      b.on('connect', function(e) {
        console.log(e, '===');
      });
      b.on('event', function(data) {
        console.log(data, '===');
      });
      b.on('disconnect', function(e) {
        console.log(e, '===');
      });
      // console.log(`我收到了${data}的信号`,);
      // getSocket(id)?.emit('get_socket', { ids: [1, 2] });
    });
  });
}
