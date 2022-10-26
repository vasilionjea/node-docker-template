import {jest} from '@jest/globals'
import axios from 'axios';
import request from 'supertest';
import app from '../src/app.js';
import {FISHWATCH_API} from '../src/utils.js';

const agent = request.agent(app);

function fetchFish() {
  return agent
    .get('/fish/red-snapper')
    .expect('Content-Type', /json/)
    .expect(200);
}

beforeEach(() => {
  jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [ {name: 'foo bar'}] }));
});

test('it fetches fish species', async () => {
  await fetchFish()
    .then((response) => {
      const result = JSON.parse(response.text);
      expect(result.fromCache).toBe(false);
      expect(result.data[0].name).toBe('foo bar');
    });

  expect(axios.get).toHaveBeenCalledWith(`${FISHWATCH_API}/species/red-snapper`);
});
