const validateMembers = require('./validateMembers');
const User = require('../../../models/User');

jest.mock("../../../models/User");

describe('validateMembers', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should validate members successfully', async () => {
        const members = ['member1', 'member2', 'member3'];
        User.findOne.mockResolvedValue({});
        const result = await validateMembers(members);
        expect(result).toBeUndefined();
    });

    it('should throw error if members not unique', async () => {
        const members = ['member1', 'member2', 'member3', 'member3'];
        User.findOne.mockResolvedValue({});
        await expect(validateMembers(members)).rejects.toThrow('Chat members must be unique.');
    });

    it('should throw error if user does not exist', async () => {
        const members = ['member1', 'member2', 'member3'];
        User.findOne.mockResolvedValue(null);
        await expect(validateMembers(members)).rejects.toThrow('User with ID member1 does not exist.');
    });
});
