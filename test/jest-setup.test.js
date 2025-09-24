/**
 * Simple Test Verification
 * This file tests that our Jest setup is working correctly
 */

describe('Jest Setup Verification', () => {
    test('Jest is working correctly', () => {
        expect(1 + 1).toBe(2);
        expect('hello').toBe('hello');
        expect([1, 2, 3]).toHaveLength(3);
    });

    test('Async tests work', async () => {
        const asyncFunction = () => Promise.resolve('success');
        const result = await asyncFunction();
        expect(result).toBe('success');
    });

    test('Mock functions work', () => {
        const mockFn = jest.fn();
        mockFn('test');
        expect(mockFn).toHaveBeenCalledWith('test');
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test('Global test data is available', () => {
        expect(global.testData).toBeDefined();
        expect(global.testData.validUser).toHaveProperty('email');
        expect(global.createMockRequest).toBeDefined();
        expect(global.createMockResponse).toBeDefined();
    });
});
