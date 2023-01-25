import Home from "./home/Home";
import SignIn from "./Auth/SignIn";
import { useLocation, useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Accounts from "./Accounts/Accounts";
import Transection from "./Transections/Transection";
import { useEffect } from "react";
import Signup from "./Auth/Signup";
import { connect, Provider } from "react-redux";
import store from "../redux-implementation/store";
import ForgetPassword from "./Auth/ForgetPassword";
import NewPassword from "./Auth/NewPassword";
import EntreOTP from "./Auth/EntreOTP";
import BalanceSheet from "../components/DataTables/BalanceSheet";
import { checkAuthenticated, load_user } from "../redux-implementation/actions";
import Reports from "./Reports/Reports";

function App({ checkAuthenticated, load_user }) {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  useEffect(() => {
    checkAuthenticated();
    // load_user();
    if (path === "/") {
      navigate("/signin");
    }
  }, [path, navigate, checkAuthenticated]);
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/confirm-forget-password" element={<EntreOTP />} />
      <Route
        path="/home"
        element={
          <Dashboard>
            <BalanceSheet />
          </Dashboard>
        }
      />
      <Route
        path="/accounts/*"
        element={
          <Dashboard>
            <Accounts />
          </Dashboard>
        }
      />
      <Route
        path="/transactions/*"
        element={
          <Dashboard>
            <Transection />
          </Dashboard>
        }
      />
      <Route
        path="/reports/*"
        element={
          <Dashboard>
            <Reports />
          </Dashboard>
        }
      />
      <Route
        path="/tools"
        element={
          <Dashboard>
            <Home />
          </Dashboard>
        }
      />
    </Routes>
  );
}

export default connect(null, {
  checkAuthenticated,
  load_user,
})(App);
