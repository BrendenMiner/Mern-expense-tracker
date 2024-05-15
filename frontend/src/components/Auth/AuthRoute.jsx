import React from "react";
import { Navigate } from "react-router-dom";
import { getUserfromStorage } from "../../utils/getUserfromStorage";

const AuthRoute = ({ children }) => {
  //get the token
  const token = getUserfromStorage();

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AuthRoute;
