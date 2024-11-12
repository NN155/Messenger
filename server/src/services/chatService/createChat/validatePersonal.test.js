const validatePersonal = require('./validatePersonal');
const Chat = require('../../../models/Chat');

jest.mock("../../../models/Chat");

describe('validatePersonal', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should validate chat data successfully', async () => {
        const members = ['member1', 'member2'];
        const data = { members };
        Chat.findOne.mockResolvedValue(null);
        const result = await validatePersonal(data);
        await expect(result).toBeUndefined();
    });

    it('should throw an error if personal chat has more than 2 members', async () => {
        const members = ['member1', 'member2', 'member3'];
        const data = { members };
        Chat.findOne.mockResolvedValue(null);
        expect(validatePersonal(data)).rejects.toThrow('Personal chat must have exactly two members.');
    });

    it('should throw an error if personal chat between users already exists', async () => {
        const members = ['member1', 'member2'];
        const data = { members };
        Chat.findOne.mockResolvedValue(data);
        await expect(validatePersonal(data)).rejects.toThrow('Personal chat between these users already exists.');
    });
});
