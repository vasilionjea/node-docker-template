import {createHttpTerminator} from 'http-terminator';
import logger from './logger.js';

const {NODE_ENV, PORT = 3000} = process.env;
const isProduction = (NODE_ENV === 'production');

export default class AppServer {
  constructor(app) {
    this.app = app;
  }

  start() {
		this.server = this.createServer();
		this.httpTerminator = createHttpTerminator({ server: this.server });

    this.handleTerminationSignals();
    this.handleUncaughtErrors();
  }

	createServer() {
		return this.app.listen(PORT, err => {
			if (err) {
				logger.error(err);
				process.exit(1);
				return;
			}
			logger.info(`App listening on port ${PORT}`);
		});
	}

  handleTerminationSignals() {
		process.on('SIGTERM', async () => {
			logger.info('Received SIGTERM: scheduling server shutdown');
			await this.shutdown();
		});

		process.on('SIGINT', async () => {
			logger.info('Received SIGINT: scheduling server shutdown');
			await this.shutdown();
		});
  }

  // Logs errors and explicitly crashes the process.
  // Docker will restart it on exit.
  handleUncaughtErrors() {
    process.on('uncaughtException', async (err) => {
      logger.error(`Uncaught Exception: ${err.message}`);
      await this.shutdown({exitCode: 1});
    });

    process.on('unhandledRejection', async (err, promise) => {
      logger.error(`Unhandled Rejection: ${err.message}`, `Promise: ${promise}`);
      await this.shutdown({exitCode: 1});
    });
  }

  // If possible shut down gracefully.
	async shutdown({exitCode = 0} = {}) {
		// Stop receiving new HTTP requests but wait for current requests to complete
		await this.httpTerminator.terminate();
		logger.info('Terminated HTTP connections to server');

		this.server.close(() => {
			logger.info('Server shutdown complete');
			process.exit(exitCode);
		});
	}
}
