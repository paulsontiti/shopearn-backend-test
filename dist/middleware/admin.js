export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        return res.status(400).json({ message: 'access denied' });
    }
};
//# sourceMappingURL=admin.js.map