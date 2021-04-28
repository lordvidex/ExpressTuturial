const supertest = require('supertest');
const { Genre } = require('../../../models/genre');

describe('Authentications', () => {
    beforeEach(() => {
        server = require('../../../index');
    })
    afterEach(async () => {
        server.close();
        await Genre.deleteMany({});
    })
    it('should return status code of 401 if user is not authorized', async () => {
        const response = await supertest(server)
            .post('/api/genres')
            .send({ genre: 'genre1' });
        expect(response.status).toBe(401);
    });
})
