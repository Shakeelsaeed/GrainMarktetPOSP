import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../home/Home";

const Reports = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wheat-sales" element={<Home />} />
      <Route path="/wheat-purchases" element={<Home />} />
      <Route path="/cotton-sales" element={<Home />} />
      <Route path="/cotton-purchases" element={<Home />} />
      <Route path="/account-transections" element={<Home />} />
    </Routes>
  );
};

export default Reports;
