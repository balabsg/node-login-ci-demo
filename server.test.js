const request = require('supertest');
const app = require('./server');

describe('POST /api/login', () => {
    it('should successfully login with valid credentials', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ username: 'admin', password: 'password123' });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should reject invalid credentials', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ username: 'wrong', password: 'user' });
        
        expect(res.statusCode).toEqual(401);
        expect(res.body.error).toEqual('Invalid credentials');
    });

    it('should error when fields are missing', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ username: 'admin' });
        
        expect(res.statusCode).toEqual(400);
    });
});
