let server;
const supertest = require('supertest');
const { Genre } = require('../../../models/genre');

describe('Genres', () => {
    beforeEach(() => {
        server = require('../../../index');
    });
    afterEach(async () => {
        server.close();
        await Genre.deleteMany({});

    });

    describe('GET /', () => {
        it('should return a status of 200 and genres data', async () => {
            // Given
            // populate the db with some data
            await Genre.insertMany([
                { genre: 'genre1' },
                { genre: 'genre2' },
            ]);

            // When
            const res = await supertest(server).get('/api/genres');

            // Then
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(element => element.genre === 'genre1')).toBeTruthy();
            expect(res.body.some(element => element.genre === 'genre2')).toBeTruthy();
        });
    });
    describe('GET /:id', () => {
        it('should return 403 error if id is invalid', async () => {
            // Given
            //When
            const response = await supertest(server).get('/api/genres/2325325');
            // Then
            expect(response.status).toBe(400);
        });
        it('should return 404 error if genre was not found', async () => {
            // Given
            const genre = new Genre({ genre: 'genre3' });
            //When
            const response = await supertest(server).get(`/api/genres/${genre.id}`);
            //Then
            expect(response.status).toBe(404);
        });
        it('should return 200 response code with genre data if genre was found', async () => {
            // Given
            const genre = new Genre({ genre: 'genre3' });
            await genre.save();
            //When
            const response = await supertest(server).get(`/api/genres/${genre.id}`);
            //Then
            expect(response.status).toBe(200);
            expect(response.body.genre).toBe('genre3');
        })
    });
})