const generateRandomUserName = () => {
    const randomNum = Math.floor(Math.random() * 10000);
    return `User${randomNum.toString().padStart(4, '0')}`;
};

module.exports = generateRandomUserName;