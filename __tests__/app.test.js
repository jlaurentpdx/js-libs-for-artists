const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Library = require('../lib/models/Library');

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

  it('should read a list of libraries from the API', async () => {
    const expected = [
      {
        id: '1',
        name: 'tone.js',
        url: 'https://tonejs.github.io/',
        description: 'Tone.js is a super neat-o library.',
      },
      {
        id: '2',
        name: 'p5.js',
        url: 'https://p5js.org/',
        description:
          'p5.js is a JavaScript library for creative coding, with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else!',
      },
    ];

    const response = await request(app).get('/api/v1/libraries');

    expect(response.body).toEqual(expected);
  });

  it('should read a single row by ID from the API', async () => {
    const expected = {
      id: '2',
      name: 'p5.js',
      url: 'https://p5js.org/',
      description:
        'p5.js is a JavaScript library for creative coding, with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else!',
    };

    const response = await request(app).get('/api/v1/libraries/2');

    expect(response.body).toEqual(expected);
  });

  it('should update a single row accessed by ID', async () => {
    const expected = {
      id: '1',
      name: 'tone.js',
      url: 'https://tonejs.github.io/',
      description:
        'Tone.js is a Web Audio framework for creating interactive music in the browser. It is really neat.',
    };

    const response = await request(app).patch('/api/v1/libraries/1').send({
      description:
        'Tone.js is a Web Audio framework for creating interactive music in the browser. It is really neat.',
    });
    expect(response.body).toEqual(expected);
  });

  it('should delete a single row by corresponding id', async () => {
    const expected = await Library.findById(1);
    const response = await request(app).delete(
      `/api/v1/libraries/${expected.id}`
    );

    expect(response.body).toEqual(expected);
  });
});
