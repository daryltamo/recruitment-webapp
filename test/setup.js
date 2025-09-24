/**
 * Jest Setup File
 * Global configuration and setup for all tests
 */

// Set test timeout
jest.setTimeout(10000);

// Global test environment setup
beforeAll(() => {
    // Ensure we're in test environment
    process.env.NODE_ENV = 'test';

    // Mock console methods to reduce noise during testing
    if (!process.env.DEBUG_TESTS) {
        console.log = jest.fn();
        console.warn = jest.fn();
        console.error = jest.fn();
    }
});

// Clean up after all tests
afterAll(() => {
    // Restore console methods
    if (!process.env.DEBUG_TESTS) {
        console.log.mockRestore();
        console.warn.mockRestore();
        console.error.mockRestore();
    }
});

// Global test helpers
global.createMockRequest = (overrides = {}) =>
    Object.assign(
        {
            body: {},
            params: {},
            query: {},
            headers: {}
        },
        overrides
    );

global.createMockResponse = () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
        render: jest.fn().mockReturnThis(),
        redirect: jest.fn().mockReturnThis(),
        headers: {}
    };
    return res;
};

global.createMockNext = () => jest.fn();

// Database mock helpers
global.mockDatabase = {
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn()
};

// Common test data
global.testData = {
    validUser: {
        email: 'test@example.com',
        password: 'TestPassword123!',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '+1234567890'
    },
    validOrganization: {
        name: 'Test Company',
        description: 'A test company',
        sector: 'Technology'
    },
    validJobOffer: {
        title: 'Software Developer',
        description: 'A great opportunity',
        requirements: 'Experience with Node.js',
        location: 'Remote'
    }
};
