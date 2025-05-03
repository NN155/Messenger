const validateUserData = require('./validation'); // Adjust the path
const User = require('../../../models/User');

jest.mock('../../../models/User'); // Mock the User model

describe('validateUserData', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should validate user data successfully', async () => {
        User.findOne.mockResolvedValue(null); // No existing user
        const data = {username: 'testuser', password: '123456', email: 'test@example.com'};

        const result = await validateUserData(data);
        
        expect(result).toBeUndefined();
    });

    it('should throw an error if fields are missing', async () => {
        const data = { username: 'testuser', password: '123456' }; // Missing email
        
        await expect(validateUserData(data)).rejects.toThrow('All fields are required');
    });

    it('should throw an error if username is too short', async () => {
        const data = { username: 'ab', password: '123456', email: 'test@example.com' }; // username too short

        await expect(validateUserData(data)).rejects.toThrow('Username must be between 3 and 20 characters long');
    });

    it('should throw an error if password is too short', async () => {
        const data = { username: 'testuser', password: '123', email: 'test@example.com' }; // Password too short

        await expect(validateUserData(data)).rejects.toThrow('Password must be at least 6 characters long');
    });

    it('should throw an error for invalid email format', async () => {
        const data = { username: 'testuser', password: '123456', email: 'invalidEmail' }; // Invalid email format

        await expect(validateUserData(data)).rejects.toThrow('Invalid email format');
    });

    it('should throw an error if email already exists', async () => {
        User.findOne.mockResolvedValue({}); // Simulating existing email

        const data = { username: 'testuser', password: '123456', email: 'test@example.com' };

        await expect(validateUserData(data)).rejects.toThrow('Email already exists');
    });

    it('should throw an error if username already exists', async () => {
        User.findOne.mockResolvedValueOnce(null); // No existing email
        User.findOne.mockResolvedValueOnce({}); // Simulating existing username

        const data = { username: 'testuser', password: '123456', email: 'test@example.com' };

        await expect(validateUserData(data)).rejects.toThrow('Username already exists');
    });
});
