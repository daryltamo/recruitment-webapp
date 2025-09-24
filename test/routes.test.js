/**
 * Route Integration Tests
 * Tests various route handlers and middleware
 */

const request = require('supertest');
const express = require('express');
const path = require('path');

describe('Route Integration Tests', () => {
    let app;

    beforeAll(() => {
    // Create test app with minimal setup
        app = express();

        // Middleware setup
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, '../views'));

        // Add health route
        const healthRouter = require('../src/routes/health');
        app.use('/', healthRouter);

        // Mock routes for testing
        app.get('/api/test', (req, res) => {
            res.json({
                message: 'API test successful',
                timestamp: new Date().toISOString()
            });
        });

        app.post('/api/echo', (req, res) => {
            res.json({ echoed: req.body, received: true });
        });

        // Error handler
        app.use((err, req, res, _next) => {
            res.status(500).json({ error: 'Internal server error' });
        });

        // 404 handler
        app.use((req, res) => {
            res.status(404).json({ error: 'Route not found' });
        });
    });

    describe('GET Routes', () => {
        test('Health check route works', async () => {
            const response = await request(app).get('/health').expect(200);

            expect(response.body).toEqual({ status: 'ok' });
        });

        test('API test route works', async () => {
            const response = await request(app).get('/api/test').expect(200);

            expect(response.body).toHaveProperty('message', 'API test successful');
            expect(response.body).toHaveProperty('timestamp');
        });

        test('Non-existent GET route returns 404', async () => {
            const response = await request(app).get('/non-existent').expect(404);

            expect(response.body).toHaveProperty('error', 'Route not found');
        });
    });

    describe('POST Routes', () => {
        test('Echo route works with JSON data', async () => {
            const testData = { name: 'John', age: 30 };

            const response = await request(app)
                .post('/api/echo')
                .send(testData)
                .expect(200);

            expect(response.body).toHaveProperty('echoed', testData);
            expect(response.body).toHaveProperty('received', true);
        });

        test('Echo route works with form data', async () => {
            const response = await request(app)
                .post('/api/echo')
                .send('name=John&age=30')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .expect(200);

            expect(response.body.echoed).toHaveProperty('name', 'John');
            expect(response.body.echoed).toHaveProperty('age', '30');
        });

        test('Non-existent POST route returns 404', async () => {
            const response = await request(app).post('/non-existent').expect(404);
            expect(response.status).toBe(404);
        });
    });

    describe('HTTP Headers and Status Codes', () => {
        test('JSON responses have correct content-type', async () => {
            const response = await request(app).get('/health').expect(200);

            expect(response.headers['content-type']).toMatch(/application\/json/);
        });

        test('CORS headers can be tested', async () => {
            const response = await request(app).get('/health').expect(200);

            // Basic header checks
            expect(response.headers).toHaveProperty('content-type');
        });
    });

    describe('Request Validation', () => {
        test('Large request body handling', async () => {
            const largeData = {
                data: 'x'.repeat(1000), // 1KB of data
                timestamp: new Date().toISOString()
            };

            const response = await request(app)
                .post('/api/echo')
                .send(largeData)
                .expect(200);

            expect(response.body.echoed.data).toHaveLength(1000);
        });

        test('Empty request body handling', async () => {
            const response = await request(app)
                .post('/api/echo')
                .send({})
                .expect(200);

            expect(response.body.echoed).toEqual({});
            expect(response.body.received).toBe(true);
        });
    });
});
