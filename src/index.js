import AppServer from './app-server.js';
import app from './app.js';

const serverInstance = new AppServer(app);
serverInstance.start();
