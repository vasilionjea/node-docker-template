import * as dotenv from 'dotenv';

// In prod we use the "env_file" option in the compose.yml
// file to set all of our environment variables.
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import {getSpecies} from './utils.js';

const app = express();

// Middlewares
app.use(helmet()); // security with HTTP headers
app.use(cors());
app.use(compression());

// Routes
app.get('/fish/:species', getSpecies);

app.get('/', (req, res) => {
  res.send('<h1>It works!</h1>');
});

export default app;
