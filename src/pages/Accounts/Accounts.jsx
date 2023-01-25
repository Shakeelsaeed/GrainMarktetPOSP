import React from "react";
import { Route, Routes } from "react-router-dom";
import AccountsList from "../../components/DataTables/Accounts/AccountsList";
import BalanceSheet from "../../components/DataTables/BalanceSheet";
import AddAccountForm from "../../components/Forms/AddAccountForm";
import AddGroupForm from "../../components/Forms/AddGroupForm";
import AddProductsForm from "../../components/Forms/AddProductsForm";
import Home from "../home/Home";

function Accounts(props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-accounts" element={<AddAccountForm />} />
      <Route path="/add-groups" element={<AddGroupForm />} />
      <Route path="/accounts-list" element={<AccountsList />} />
      <Route path="/add-products" element={<AddProductsForm />} />
      <Route path="/balance-sheet" element={<BalanceSheet />} />
    </Routes>
  );
}

export default Accounts;
