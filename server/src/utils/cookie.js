class Cookie {
    createCookie(res, token) {
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
        });
    }

    clearCookie(res) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });
    }

    getCookie(req) {
        return req.cookies?.token; 
    }
}

const cookie = new Cookie();

module.exports = cookie;
