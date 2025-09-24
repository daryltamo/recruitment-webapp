const request = require('supertest');
const express = require('express');
const healthRouter = require('../src/routes/health');

// Create a test app
const app = express();
app.use('/', healthRouter);

describe('Health Route', () => {
    test('GET /health should return status ok', async () => {
        const response = await request(app).get('/health').expect(200);

        expect(response.body).toEqual({ status: 'ok' });
        expect(response.headers['content-type']).toMatch(/json/);
    });

    test('GET /health should respond within reasonable time', async () => {
        const start = Date.now();
        await request(app).get('/health');
        const duration = Date.now() - start;

        expect(duration).toBeLessThan(1000); // Should respond within 1 second
    });
});
