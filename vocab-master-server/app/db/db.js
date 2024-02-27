const Path = require("../utils/pathUtils");
const sqlite3 = require("sqlite3").verbose();
const query = require("./query");

class AppDao {
  constructor(keepOpen) {
    this.keepOpen = true; //keepOpen;
    this.db = new sqlite3.Database(
      Path.dbFile, // my root folder if in dev mode
      (err) => {
        if (err) {
          console.log(`Database Error: ${err}`);
        } else {
          console.log("Database Loaded");
        }
      }
    );
    this.query = { ...query };
  }
  all(sqlQuery, params) {
    console.log("app dai alll", sqlQuery);
    return new Promise((resolve, reject) => {
      this.db.all(sqlQuery, params, (err, rows) => {
        !this.keepOpen && this.close();

        if (err) {
          // case error
          reject(err);
        }
        resolve(rows);
      });
    });
  }
  get(sqlQuery, params) {
    console.log("app dai get", sqlQuery);
    return new Promise((resolve, reject) => {
      this.db.get(sqlQuery, params, (err, rows) => {
        !this.keepOpen && this.close();
        if (err) {
          // case error
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  run(sqlQuery, params) {
    console.log("app dai run", sqlQuery);
    return new Promise((resolve, reject) => {
      const _self = this;
      this.db.run(sqlQuery, params, function (err) {
        !_self.keepOpen && _self.close();
        if (err) {
          // case error
          reject(err);
        }
        resolve(this.lastID || "OK");
      });
    });
  }

  close() {
    this.db.close((error) => {
      if (error) {
        console.log(`Database close error: ${error}`);
      } else {
        console.log("Database closed");
      }
    });
  }
}
module.exports = AppDao;
