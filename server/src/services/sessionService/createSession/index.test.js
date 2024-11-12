const createSession = require('./index');
const Session = require('../../../models/Session');
const generateToken = require('../../../utils/generateToken');
const mongoose = require('mongoose');

jest.mock('../../../models/Session');
jest.mock('../../../utils/generateToken');

describe('createSession', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should successfully create a session.', async () => {
        const mockUserId = new mongoose.Types.ObjectId();
        const mockToken = 'eyJhbG';
        const mockSession = { 
            userId: mockUserId, 
            token: mockToken,
        };

        Session.create.mockResolvedValue([mockSession]);
        generateToken.mockReturnValue(mockToken);
        expect(await createSession(mockUserId)).toBe(mockToken);
        expect(Session.create).toHaveBeenCalledWith({
            userId: mockUserId,
            token: expect.any(String),
        });

    });
    
    it('Should throw an error if session creation fails.', async () => {
        const mockUserId = new mongoose.Types.ObjectId();
        Session.create.mockRejectedValue(new Error('Database error'));
        await expect(createSession(mockUserId))
            .rejects
            .toThrow('Failed to create session: Database error');
    });
    
});