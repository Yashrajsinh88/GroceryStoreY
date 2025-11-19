import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized' });
    }

    try {
        // FIX: ensure req.body exists
        req.body = req.body || {}; 

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;   // your original code
        } else {
            return res.json({ success: false, message: 'Not Authorized' });
        }

        next();

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export default authUser;
