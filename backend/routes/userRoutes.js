const express = require("express");
const usersCtrl = require("../controllers/usersCtrl");
const isAuthenticated = require("../middlewares/isAuth");

const userRouter = express.Router();

//!register
userRouter.post("/api/v1/users/register", usersCtrl.register);

//!login
userRouter.post("/api/v1/users/login", usersCtrl.login);

//!profile
userRouter.get("/api/v1/users/profile", isAuthenticated, usersCtrl.profile);

//!update password
userRouter.put(
  "/api/v1/users/update-password",
  isAuthenticated,
  usersCtrl.changeUserPassword
);

//!update profile
userRouter.put(
  "/api/v1/users/update-profile",
  isAuthenticated,
  usersCtrl.updateUserProfile
);

module.exports = userRouter;
