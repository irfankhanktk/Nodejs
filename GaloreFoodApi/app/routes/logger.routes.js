module.exports = app => {
    const LoggerMiddleware = require('../libraries/loggerMiddleware');
    app.get("/api/logs/:limit/:pNumber", LoggerMiddleware.getLogs);
}