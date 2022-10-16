const Logger = require('../models/logger.model');

exports.saveLog = (data) => {
    const loggs = new Logger({
        data
    });
    try {
        // Save logs in the database
        Logger.saveLog(loggs, (err, data) => { });
    }
    catch (err) {

    }
}

// Retrieve all logs from the database.
exports.getLogs = (req, res) => {
    try {
        Logger.getLogs(req, (err, data) => {
            if (err)
                res.status(500).send({
                    status: "ERROR",
                    message: err
                });
            else res.status(200).send(
                { status: "ok", data }
            );
        });
    }
    catch (err) {
        res.status(500).send({
            status: "ERROR",
            message: err.message
        });
    }
};