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
const queryMulti = async (sql, params, transaction) => {
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

/**
 *
 * @param {string} sql
 * @param {array} params
 */
const queryOne = async (sql, params, transaction) => {
  const results = await queryMulti(sql, params, transaction);
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

// Transaction 

// connection.beginTransaction(function (err) {
//   if (err) { throw err; }
//   connection.query('INSERT INTO posts SET title=?', title, function (error, results, fields) {
//     if (error) {
//       return connection.rollback(function () {
//         throw error;
//       });
//     }

//     var log = 'Post ' + results.insertId + ' added';

//     connection.query('INSERT INTO log SET data=?', log, function (error, results, fields) {
//       if (error) {
//         return connection.rollback(function () {
//           throw error;
//         });
//       }
//       connection.commit(function (err) {
//         if (err) {
//           return connection.rollback(function () {
//             throw err;
//           });
//         }
//         console.log('success!');
//       });
//     });
//   });
// });

const getConnection = async () => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return reject(err);
    }
    return resolve(connection);
  });
});

/**
 * Begin Transaction
 */
const beginTransaction = async () => {
  console.log("A transaction begin")
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        return reject(err);
      }
      return resolve(connection);
    });
  });
};

/**
 * Rollback Transaction
 */
const rollbackTransaction = async transaction => new Promise((resolve, reject) => {
  console.log("A transaction rollback")
  transaction.rollback((err) => {
    transaction.release();
    if (err) {
      return reject(err);
    }
    return resolve();
  });
});

/**
 * Commit Transaction
 */
const commitTransaction = async transaction => new Promise((resolve, reject) => {
  console.log("A transaction commit")
  transaction.commit(async (errCommit) => {
    if (errCommit) {
      console.log("A transaction err")
      try {
        await rollbackTransaction(transaction);
      } catch (errorRollback) {
        return reject(Object.assign(errCommit, { errorRollback }));
      }
      return reject(errCommit);
    }
    transaction.release();
    console.log("A transaction commit done")
    return resolve();
  });
});

module.exports = {
  queryNone,
  queryOne,
  queryMulti,
  getConnection,
  beginTransaction,
  rollbackTransaction,
  commitTransaction
}