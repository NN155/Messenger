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
        const mockUser = { login: 'testuser', email: 'test@example.com', password: '12345', userName: 'User0001' };
        User.create.mockResolvedValue(mockUser);
        validateUserData.mockResolvedValue(undefined);
        const user = await createUser({ login: 'testuser', email: 'test@example.com', password: '12345'});

        expect(user).toEqual(mockUser);
        expect(User.create).toHaveBeenCalledWith({
            login: 'testuser',
            email: 'test@example.com',
            password: '12345',
            userName: expect.any(String)
        });
    });

    it('Should throw an error if user creation fails', async () => {
        User.create.mockRejectedValue(new Error('Database error'));

        await expect(createUser('testuser', 'test@example.com', '12345'))
            .rejects
            .toThrow('Failed to create user: Database error');
    });
});
