const createUser = require('./index');
const User = require('../../../models/User');
const validateUserData = require('./validation');

jest.mock('../../../models/User');
jest.mock('./validation');

describe('createUser', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should successfully create a user', async () => {
        const mockUser = { username: 'testuser', email: 'test@example.com', password: '12345', nickname: 'User0001' };
        User.create.mockResolvedValue(mockUser);
        validateUserData.mockResolvedValue(undefined);
        const user = await createUser({ username: 'testuser', email: 'test@example.com', password: '12345'});

        expect(user).toEqual(mockUser);
        expect(User.create).toHaveBeenCalledWith({
            username: 'testuser',
            email: 'test@example.com',
            password: '12345',
            nickname: expect.any(String)
        });
    });

    it('Should throw an error if user creation fails', async () => {
        User.create.mockRejectedValue(new Error('Database error'));

        await expect(createUser('testuser', 'test@example.com', '12345'))
            .rejects
            .toThrow('Failed to create user: Database error');
    });
});
