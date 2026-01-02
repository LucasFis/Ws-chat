export function loggerMiddleware(req, _res, next) {
    console.log(req.path + " - " + req.method);
    next();
}