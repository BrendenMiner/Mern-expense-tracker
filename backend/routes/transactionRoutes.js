const express = require("express");
const usersCtrl = require("../controllers/usersCtrl");
const isAuthenticated = require("../middlewares/isAuth");
const transactionCtrl = require("../controllers/transactionCtrl");

const transactionRouter = express.Router();

//!add
transactionRouter.post(
  "/api/v1/transaction/create",
  isAuthenticated,
  transactionCtrl.create
);

//!lists
transactionRouter.get(
  "/api/v1/transaction/list",
  isAuthenticated,
  transactionCtrl.getFilteredTransactions
);

//!update
transactionRouter.put(
  "/api/v1/transaction/update/:id",
  isAuthenticated,
  transactionCtrl.update
);

//!delete
transactionRouter.delete(
  "/api/v1/transaction/delete/:id",
  isAuthenticated,
  transactionCtrl.delete
);

module.exports = transactionRouter;
