const User = require('../../../models/User');

const validateMembers = async (members) => {

    const memberIds = members.map(member => member.toString());

    if (memberIds.length !== new Set(memberIds).size) {
        throw new Error('Chat members must be unique.');
    }

    await Promise.all(
        members.map(async (member) => {
            const user = await User.findOne({ _id: member });
            if (!user) {
                throw new Error(`User with ID ${member} does not exist.`);
            }
        })
    );
};

module.exports = validateMembers;
