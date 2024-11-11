function admin(req, res, next) {
    if (req.user.role === 'admin') {
        next();  // Si el rol es 'admin', continúa al siguiente middleware o ruta
    } else {
        // Si no tiene permiso, pasa un error al siguiente middleware
        next(new Error("Access Denied, Don't have permission"));

        const err = new Error("Access Denied, Don't have permission");
            err.status = 401; // Define el código de estado
            next(err);
    }
}

export default admin;

