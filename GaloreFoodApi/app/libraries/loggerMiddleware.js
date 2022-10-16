const logger = require('../controllers/logger.controller');

exports.writeLog = (data) => {
    logger.saveLog(data);
}

exports.getLogs = (req, res) => {
    logger.getLogs(req, res);
}