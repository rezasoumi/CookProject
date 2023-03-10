import React, { useEffect, useState } from "react";
import FoodList from "./FoodList";
import Grid from "@mui/material/Grid";
import "./Food.css";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar-second";
function Foods({ fetchFood }) {
  return (
    <>
      <Sidebar />
      <Navbar />
      <Grid container spacing={2}>
        <Grid  container item spacing={2} xs={12} sm={12} md={2}/>
        <Grid  container item spacing={2} xs={12} sm={12} md={8}>
          <FoodList foods={fetchFood} />
        </Grid>
      </Grid>
    </>
  );
}

export default Foods;
