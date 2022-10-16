const commonService = require("../../libraries/common.service");
const sql = require("../db.js");

const HomePage = () => {};

HomePage.getRestaurants = (req, result) => {
  try {
    let limit = parseInt(req.params.limit);
    let pNumber = parseInt(req.params.pNumber);
    pNumber = pNumber - 1;
    let query = `CALL galorefood.sp_resturants_getAll("${req.body.lat}","${req.body.lng}",${limit},${pNumber})`;

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("restaurants: ", res);
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

HomePage.getRestaurantsItems = (req, result) => {
  try {
    let limit = parseInt(req.params.limit);
    console.log("i am limit" ,limit);
    let pNumber = parseInt(req.params.pNumber);
    console.log("i am pNumber" ,pNumber);
    pNumber = pNumber - 1;
    
    let queryItems = `CALL galorefood.sp_resturants_getMenuItems(${req.params.id},${limit},${pNumber})`;
    sql.query(queryItems, (err, _res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (_res && _res[0]) {
        let items = _res[0];

        console.log("items: "  ,items);

        let categoriesId = [];
        for (var i = 0; i < items.length; i++) {
          categoriesId.push(items[i].catId);
        }
        let uniquecategoriesId = [...new Set(categoriesId)];
        let requiredList = [];
        commonService.asyncLoop(
          uniquecategoriesId.length,
          (loop) => {
            let i = loop.iteration();
            let query = `select name from galorefood.MenuCategories where id = ${uniquecategoriesId[i]}`;
            sql.query(query, (err, cat) => {
              if (!err && cat && cat[0]) {
                let it = items.filter((item) => {
                  return item.catId == uniquecategoriesId[i];
                }).map((item) =>{
                  return item;
                });
                requiredList.push({
                  title:cat[0].name,
                  data:it
                });
              }
              loop.next();
            });
          },
          () => {
            result(null,requiredList);
          }
        );
      } else {
        result(null, { items: [] });
      }
    });
  } catch (err) {
    result(err, null);
  }
};

HomePage.getResturentCategories = (req, result) => {
  try {
    let queryItems = `CALL galorefood.sp_menucategories_getByRestId(${req.params.resturentId})`;
    sql.query(queryItems, (err, _res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, { items: _res && _res[0] ? _res[0] : [] });
    });
  } catch (err) {
    result(err, null);
  }
};

module.exports = HomePage;
