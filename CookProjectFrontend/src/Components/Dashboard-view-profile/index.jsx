import React from "react";
import { useState, useEffect } from "react";
import { Container } from "./ViewProfile";
import DashboardSidebar from "../Dashboard/Dash-sidebar";
import DashboardHeader from "../Dashboard/Dash-header";
import "./view-profile.css";
import axios from "axios";
import { BASE_API, ROLES } from "../../App";
import { updateLogin, useLogin } from "../../hooks/useLogin";
import Grid from "@mui/material/Grid";
const ViewProfile = () => {
  const [user_info, setUser] = useState(null);
  const user = useLogin();
  let username = user.username;

  useEffect(() => {
    console.log(username);
    axios
      .get(BASE_API + `accounts/${username}/profile/?username=${username}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        // handle error
      });
  }, [username]);
  return (
    <Grid container spacing={2}>
      <DashboardHeader/>
      <Grid container item spacing={2} xs={12} sm={2} md={2}>
        <DashboardSidebar />
      </Grid>
      <Grid container item spacing={2} xs={12} sm={10} md={10}>
        {user_info && (
            <div className="content-edit">
              <p> سلام {user_info.first_name} به سایت ما خوش آمدی</p>
              <div className="form-text">
                <div className="row">
                  <div className="col1">
                    <label htmlFor="fname">نام</label>
                    <br />
                    <h6>{user_info.first_name}</h6>
                  </div>
                  <div className="col1">
                    <label htmlFor="lname">نام خانوادگی</label>
                    <br />
                    <h6>{user_info.last_name}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col1">
                    <label htmlFor="lname">ایمیل</label>
                    <br />
                    <h6>{user_info.email}</h6>
                  </div>
                  {user_info.role === 2 && (
                    <div className="col1">
                      <label htmlFor="bio">شرح حال</label>
                      <br />
                      <h6>{user_info.bio}</h6>
                    </div>
                  )}
                </div>
                <div className="col1">
                  <label htmlFor="lname">نقش کاربری</label>
                  <br />
                  <h6>{ROLES[user_info.role]}</h6>
                </div>
              </div>
            </div>
        )}
      </Grid>
    </Grid>
  );
};

export default ViewProfile;
