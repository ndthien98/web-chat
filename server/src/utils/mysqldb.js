const mysql = require('mysql');
const MYSQL_URL = process.env.MYSQL_URL
const pool = mysql.createPool(MYSQL_URL);

const logMySQLQuerry = (sql, params) => {
  console.log('SQL: ',
    mysql.format(sql, params)
      .replace(/\r?\n|\r/g, ' ') 
      .split(' ').filter(e => e !== '').join(' '));
}

pool.query('SELECT * FROM 1==1'); // test connection 
pool.on('connection', function (connection) {
  console.log('Connected to mysql db ' + MYSQL_URL);
});

/**
 *
 * @param {string} sql
 * @param {array} params
 */
const queryMulti = async (sql, params) => {
  logMySQLQuerry(sql, params);
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

/**
 *
 * @param {string} sql
 * @param {array} params
 */
const queryOne = async (sql, params) => {
  const results = await queryMulti(sql, params);
  return results[0];
};

/**
 *
 * @param {string} sql
 * @param {array} params
 */
const queryNone = async (sql, params, transaction) => {
  logMySQLQuerry(sql, params);
  return new Promise((resolve, reject) => {
    if (!transaction) {
      pool.query(sql, params, (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    } else {
      transaction.query(sql, params, (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    }
  });
};



module.exports = {
  queryNone,
  queryOne,
  queryMulti
}