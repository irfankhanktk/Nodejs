const sql = require("../models/db.js");
const logger = require("../libraries/loggerMiddleware");

module.exports = class AddCustomOptions {
  static createMenuOptions(meuId, custom_options) {
    try {
      return new Promise((resolve, reject) => {
        AddCustomOptions.asyncLoop(
          custom_options.length,
          (loop) => {
            let i = loop.getIndex();
            console.log(custom_options[i].option_types);
            sql.query(
              "INSERT INTO menuoptions SET ?",
              {
                title: custom_options[i].title,
                createdAt: new Date(),
                updatedAt: new Date(),
                option_details: JSON.stringify(custom_options[i].option_types),
                menu_id: meuId,
              },
              (err, res) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(res.insertId);
                  loop.next();
                }
              }
            );
          },
          () => {
            resolve();
          }
        );
      });
      // custom_options.forEach(() => {

      //     sql.query("INSERT INTO menuitems SET ?")
      // })
    } catch (err) {
        logger.writeLog(err.message);
        resolve();
    }
  }

  static asyncLoop(length, onIteration, onCompletion) {
    let index = -1;
    let done = false;
    let loop = {
      next: () => {
        if (done) return;
        if (index < length - 1) {
          index++;
          onIteration(loop);
        } else {
          done = true;
          if (onCompletion) {
            onCompletion("finish");
          }
        }
      },
      getIndex: () => {
        return index;
      },
      break: () => {
        done = true;
        if (onCompletion) {
          onCompletion("break");
        }
      },
    };
    loop.next();
  }
};
