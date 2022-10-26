import axios from 'axios';
import {Storage} from './storage.js';
import logger from './logger.js';

export const FISHWATCH_API = 'https://www.fishwatch.gov/api';

async function fetchSpecies(species) {
	const response = await axios.get(`${FISHWATCH_API}/species/${species}`);
	logger.info('Request sent to the fishwatch.gov API');
	return response.data;
}

export async function getSpecies(req, res) {
  const {species} = req.params;
	let results = [];
  let fromCache = false;

	try {
    const redis = await Storage.redis();
    const cacheResults = await redis.get(species);

    if (cacheResults) {
      fromCache = true;
      results = JSON.parse(cacheResults);
    } else {
      results = await fetchSpecies(species);
      if (results && results.length) {
        await redis.set(species, JSON.stringify(results), {EX: 180, NX: true});
      }
    }

		res.send({ fromCache, data: results });
	} catch(error) {
		logger.error(error);
		res.status(404).send('Data unavailable');
	}
}
