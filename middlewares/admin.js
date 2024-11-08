function admin(req, res, next) {
    if (req.user.role === 'admin')
        next();
    else return res.status(403).json({ message: "Access Denied, Don't have permission" });
}

export default admin;
