import {jest} from '@jest/globals'
import app from '../src/app.js';
import AppServer from '../src/app-server.js';
import {noop, asyncNoop, flushPromises} from '../testing/utils.js';

const appServer = new AppServer(app);

beforeAll(() => {
  appServer.start();
});

beforeEach(() => {
  jest.spyOn(process, 'exit').mockImplementation(noop);
  jest.spyOn(appServer.server, 'close');
  jest.spyOn(appServer.httpTerminator, 'terminate').mockImplementation(asyncNoop);
});

test('it shuts down server on SIGTERM signal', async () => {
  process.emit('SIGTERM');
  await flushPromises();

  expect(appServer.server.close).toHaveBeenCalled();
  expect(process.exit).toHaveBeenCalledWith(0);
});

test('it shuts down server on SIGINT signal', async () => {
  process.emit('SIGINT');
  await flushPromises();

  expect(appServer.server.close).toHaveBeenCalled();
  expect(process.exit).toHaveBeenCalledWith(0);
});
