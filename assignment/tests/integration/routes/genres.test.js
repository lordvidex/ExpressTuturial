let server;
const supertest = require('supertest');
const mongoose = require('mongoose');
const { Genre } = require('../../../models/genre');
const { User } = require('../../../models/user');

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
    describe('POST /', () => {
        it('should return status code of 400 if genre is less than 3 characters', async () => {
            // Given
            const token = new User().generateAuthToken();
            // When
            const response = await supertest(server).post('/api/genres').set('X-Auth-Token', token).send({ genre: 'a' });
            // Then
            expect(response.status).toBe(400);
        })
        it('should add genre to database if genre is valid', async () => {
            // Given
            const token = new User().generateAuthToken();
            // When
            await supertest(server).post('/api/genres').set('X-Auth-Token', token).send({ genre: 'genre1' });
            const genre = await Genre.find({ genre: 'genre1' });

            // Then
            expect(genre.length).toBeGreaterThanOrEqual(1);
        })
        it('should return a response body containing the genre', async () => {
            // Given
            const token = new User().generateAuthToken();
            // When
            const res = await supertest(server).post('/api/genres').set('X-Auth-Token', token).send({ genre: 'genre1' });
            // Then
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('genre', 'genre1');
        });
    })
    describe('PUT /:id', () => {
        let token,genre;
        beforeEach(async () => {
            token = new User().generateAuthToken();
            genre = new Genre({genre: 'genre1'});
            await genre.save();
        })
        it('should return 403 error if id is invalid', async () => {
            // Given
            //When
            const response = await supertest(server)
                .put('/api/genres/1').
                set('X-Auth-Token', token);
            // Then
            expect(response.status).toBe(400);
        });
        it('should return 404 error if id does not exist in db', async () => {
            // Given
            const id = new mongoose.Types.ObjectId().toHexString();
            //When
            const response = await supertest(server)
                .put(`/api/genres/${id}`)
                .set('X-Auth-Token', token);
            // Then
            expect(response.status).toBe(404);
        });
        it('should return status code of 400 if genre is less than 3 characters', async () => {
            // Given
            // When
            const response = await supertest(server).put(`/api/genres/${genre._id}`).set('X-Auth-Token', token).send({ genre: 'a' });
            // Then
            expect(response.status).toBe(400);
        })
        it('should edit genre in database if genre is valid', async () => {
            // Given
            // When
            await supertest(server).put(`/api/genres/${genre._id}`).set('X-Auth-Token', token).send({ genre: 'genre_x' });
            // Then
            const newGenre = await Genre.find({genre: 'genre_x'});
            expect(newGenre.length).toBeGreaterThanOrEqual(1);
            expect(newGenre[0]).toHaveProperty('_id',genre._id);
            
        })
        it('should return a response body containing the new genre data', async () => {
            // Given
            // When
            const res = await supertest(server).put(`/api/genres/${genre._id}`).set('X-Auth-Token', token).send({ genre: 'genre1' });
            // Then
            expect(res.body).toHaveProperty('_id',genre._id.toHexString());
            expect(res.body).toHaveProperty('genre', 'genre1');
        });
    })
    describe('DELETE /:id', () => {
        let token,genre;
        beforeEach(async () => {
            token = new User({isAdmin: true}).generateAuthToken();
            genre = new Genre({genre: 'genre1'});
            await genre.save();
        })
        
        it('should return 404 error if id does not exist in db', async () => {
            // Given
            const id = new mongoose.Types.ObjectId().toHexString();
            //When
            const response = await supertest(server)
                .delete(`/api/genres/${id}`)
                .set('X-Auth-Token', token);
            // Then
            expect(response.status).toBe(404);
        });
        
        it('should delete genre in database if id is valid', async () => {
            // Given
            // When
            await supertest(server).delete(`/api/genres/${genre._id}`).set('X-Auth-Token', token);
            // Then
            const newGenre = await Genre.find({genre: 'genre1'});
            expect(newGenre.length).toBe(0);
        })
        it('should return a response body containing the new genre data', async () => {
            // Given
            // When
            const res = await supertest(server).delete(`/api/genres/${genre._id}`).set('X-Auth-Token', token);
            // Then
            expect(res.body).toHaveProperty('_id',genre._id.toHexString());
            expect(res.body).toHaveProperty('genre', 'genre1');
        });
    })
})