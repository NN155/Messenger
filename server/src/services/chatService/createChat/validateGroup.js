const validateGroup = (data) => {
    const { ownerId, members, name } = data;
    
    if (members.length < 3) {
        throw new Error('Group chat must have at least three members.');
    }
    if (name.length < 1) {
        throw new Error('Group chat must have a name.');
    }
    if (!members.includes(ownerId)) {
        throw new Error('Group chat must include the owner.');
    }

    if (members.length > 100) {
        throw new Error('Group chat must have at most 100 members.');
    }
}

module.exports = validateGroup;