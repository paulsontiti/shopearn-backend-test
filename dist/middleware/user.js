export const isUser = (req, res, next) => {
    if (req.user && req.user.role === 'user') {
        next();
    }
    else {
        return res.status(400).json({ message: 'access denied' });
    }
};
//# sourceMappingURL=user.js.map