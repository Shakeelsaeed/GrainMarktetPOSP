import React from "react";
import Home from "../home/Home";
import { Route, Routes } from "react-router-dom";
import AddWheatSaleForm from "../../components/Forms/AddWheatSaleForm";
import AddCottonSaleForm from "../../components/Forms/AddCottonSaleForm";
import AddWheatPurchaseForm from "../../components/Forms/AddWheatPurchaseForm";
import AddCottonPurchaseForm from "../../components/Forms/AddCottonPurchaseForm";
import GeneralVoucher from "../../components/Forms/GeneralVoucher/GeneralVoucher";

function Transection(props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-wheat-purchase" element={<AddWheatPurchaseForm />} />
      <Route path="/add-cotton-purchase" element={<AddCottonPurchaseForm />} />
      <Route path="/add-wheat-sale" element={<AddWheatSaleForm />} />
      <Route path="/add-cotton-sale" element={<AddCottonSaleForm />} />
      <Route
        path="/general-voucher"
        element={
          <GeneralVoucher/>
        }
      />
    </Routes>
  );
}

export default Transection;
