const request = require('supertest');
const app = require('../app'); // Adjust the path as necessary

describe('Authentication Endpoints', () => {
  describe('POST /api/auth/register', () => {
    it('should register a user successfully', async () => {
      const res = await request(app).post('/api/auth/register').send({
        username: 'testuser',
        password: 'testpass'
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
    });

    it('should return an error if user already exists', async () => {
      const res = await request(app).post('/api/auth/register').send({
        username: 'testuser',
        password: 'testpass'
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in a user successfully', async () => {
      const res = await request(app).post('/api/auth/login').send({
        username: 'testuser',
        password: 'testpass'
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should return an error for invalid credentials', async () => {
      const res = await request(app).post('/api/auth/login').send({
        username: 'testuser',
        password: 'wrongpass'
      });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error');
    });
  });
});