const express = require("express");
const usersCtrl = require("../controllers/usersCtrl");
const isAuthenticated = require("../middlewares/isAuth");
const categoryCtrl = require("../controllers/categoryCtrl");

const categoryRouter = express.Router();

//!add
categoryRouter.post(
  "/api/v1/categories/create",
  isAuthenticated,
  categoryCtrl.create
);

//!lists
categoryRouter.get(
  "/api/v1/categories/list",
  isAuthenticated,
  categoryCtrl.lists
);

//!update
categoryRouter.put(
  "/api/v1/categories/update/:id",
  isAuthenticated,
  categoryCtrl.update
);

//!delete
categoryRouter.delete(
  "/api/v1/categories/delete/:id",
  isAuthenticated,
  categoryCtrl.delete
);

module.exports = categoryRouter;
