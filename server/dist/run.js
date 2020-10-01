#!/usr/bin/env node
'use strict';
/**
 * Module dependencies.
 */
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const app_1 = __importDefault(require('./app'));
const http_1 = __importDefault(require('http'));
/**
 * Get port from environment and store in Express.
 */
const HTTP_PORT = normalizePort('8080');
app_1.default.set('port', HTTP_PORT);
/**
 * Create HTTP server.
 */
const httpServer = http_1.default.createServer(app_1.default);
// http
httpServer.on('error', err => onError(err, HTTP_PORT));
httpServer.listen(HTTP_PORT, () => {
  console.log(
    `SERVER     --| Server is now running on http://localhost:${HTTP_PORT}`,
  );
});
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error, port) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
