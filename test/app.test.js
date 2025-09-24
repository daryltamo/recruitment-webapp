const request = require('supertest');
const express = require('express');
const path = require('path');

describe('Express App Integration Tests', () => {
    let app;

    beforeAll(() => {
    // Create a minimal test version of the app
        app = express();

        // Set up view engine
        app.set('views', path.join(__dirname, '../views'));
        app.set('view engine', 'ejs');

        // Add basic middleware
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        // Add routes
        const healthRouter = require('../src/routes/health');
        app.use('/', healthRouter);

        // Basic route for testing
        app.get('/test', (req, res) => {
            res.json({ message: 'Test route working' });
        });

        // Error handling
        app.use((req, res) => {
            res.status(404).json({ error: 'Route not found' });
        });
    });

    describe('Basic App Functionality', () => {
        test('App should be defined', () => {
            expect(app).toBeDefined();
        });

        test('Health endpoint should work', async () => {
            const response = await request(app).get('/health').expect(200);

            expect(response.body.status).toBe('ok');
        });

        test('route should work', async () => {
            const response = await request(app).get('/test').expect(200);

            expect(response.body.message).toBe('Test route working');
        });

        test('Non-existent route should return 404', async () => {
            const response = await request(app)
                .get('/non-existent-route')
                .expect(404);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('HTTP Methods', () => {
        test('GET requests should work', async () => {
            const response = await request(app).get('/health').expect(200);
            expect(response.body.status).toBe('ok');
        });

        test('POST to non-POST route should return 404', async () => {
            const response = await request(app).post('/health').expect(404);
            expect(response.status).toBe(404);
        });
    });

    describe('Content Types', () => {
        test('JSON responses should have correct content-type', async () => {
            const response = await request(app).get('/health').expect(200);

            expect(response.headers['content-type']).toMatch(/json/);
        });
    });
});
