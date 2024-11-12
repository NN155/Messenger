const validateGroup = require('./validateGroup');

describe('validateGroup', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should validate chat data successfully', async () => {
        const members = ['member1', 'member2', 'member3', 'owner'];
        const data = { ownerId: 'owner', members, name: 'Test Group' };
        const result = await validateGroup(data);
        expect(result).toBeUndefined();
    });

    it('should throw an error if group chat has less than 3 members', async () => {
        const members = ['member1', 'owner'];
        const data = { ownerId: 'owner', members, name: 'Test Group' };
        expect(() => validateGroup(data)).toThrow('Group chat must have at least three members.');
    });

    it('should throw an error if group chat has no name', async () => {
        const members = ['member1', 'member2', 'member3', 'owner'];
        const data = { ownerId: 'owner', members, name: '' };
        expect(() => validateGroup(data)).toThrow('Group chat must have a name.');
    });

    it('should throw an error if group chat does not include the owner', async () => {
        const members = ['member1', 'member2', 'member3'];
        const data = { ownerId: 'owner', members, name: 'Test Group' };
        expect(() => validateGroup(data)).toThrow('Group chat must include the owner.');
    });
});
