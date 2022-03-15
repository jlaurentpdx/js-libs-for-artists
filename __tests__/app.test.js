const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('artist-libs-api routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should add a library to the API', async () => {
    const expected = {
      name: 'phony.js',
      url: 'https://phony.js',
      description: 'phony.js is a phony lib for phony people',
    };

    const response = await request(app)
      .post('/api/v1/libraries')
      .send(expected);

    expect(response.body).toEqual({ id: expect.any(String), ...expected });
  });
});
