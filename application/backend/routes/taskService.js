const db = require('../database');

async function getalltasks(request, response) {
  const results = await db.promise().query(
      `SELECT * FROM Task WHERE Deleted = 0 and Completed = 0`);
  response.status(200).send(results[0]);
}

async function getdeltasks(request, response) {
  const results =
      await db.promise().query(`SELECT * FROM Task WHERE Deleted = 1`);
  response.status(200).send(results[0]);
}

async function getcomptasks(request, response) {
  const results =
      await db.promise().query(`SELECT * FROM Task WHERE Completed = 1`);
  response.status(200).send(results[0]);
}

async function searchtasks(request, response) {
  const keyTerm = request.body.searchkey;
  const results =
      await db.promise().query(`SELECT * FROM Task WHERE Title like '%${
          keyTerm}%' OR Description LIKE '%${keyTerm}%' OR Notes LIKE '%${
          keyTerm}'`);
  response.status(200).send(results[0]);
}

module.exports = {
  getalltasks,
  getdeltasks,
  getcomptasks,
  searchtasks
};