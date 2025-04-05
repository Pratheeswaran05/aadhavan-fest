const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');
const SECRET_KEY = process.env.JWT_SECRET; // Use .env instead of hardcoding

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        const admin = await AdminUser.findByPk(decoded.id);

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        req.admin = admin; // Attach full admin object
        next();
    } catch (err) {
        console.error('Authentication Error:', err);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;