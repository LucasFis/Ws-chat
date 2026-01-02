export function errorHandler(err, _req, res, _next) {
    if (err.code) {
        res.status(err.code).json({ message: err.message });
        return;
    }
    return _next(err);
}