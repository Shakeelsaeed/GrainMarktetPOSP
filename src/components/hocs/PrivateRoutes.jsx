import React from "react";
import { connect } from "react-redux";
import { Route, useNavigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : navigate("/signin")
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
});
export default connect(mapStateToProps, {})(PrivateRoute);
