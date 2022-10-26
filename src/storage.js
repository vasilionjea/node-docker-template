import {createClient} from 'redis';

async function createRedisClient() {
  return new Promise(async (resolve, reject) => {
    const client = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    });

    client.on('error', reject);
    client.on('connect', () => resolve(client));

    // It's false in tests because redis-mock
    // doesn't implement it.
    if (client.connect) {
      await client.connect();
    }
  });
}

export class Storage {
  static async redis() {
    if (this.client) {
      return this.client;
    }

    this.client = await createRedisClient();

    return this.client;
  }
}
