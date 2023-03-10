import React, { useEffect, useState } from "react";
import { Container } from "./Dash-promotion";
import DashboardSidebar from "../Dashboard/Dash-sidebar";
import DashboardHeader from "../Dashboard/Dash-header";
import author_avatar from "../../images/author-avatar.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import TicketCard from './TicketCard'
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import "./dash-promotion.css";
import {BASE_API} from "../../App";
import { List } from "@mui/material";
import { updateLogin, useLogin } from "../../hooks/useLogin";
import Swal from 'sweetalert2';

const DashPromotionComponent = () => {
  const [tickets, setTickets] = useState([]);
  const user = useLogin();
  const Swal = require('sweetalert2')

  const fetchData = async () => {
    await axios
      .get(BASE_API + "tickets/",{
          params: {
            username: user.username,
          },
            headers: {
              "Content-Type": "application/json",
            },
        }
      )
      .then((response) => {
        console.log("useeffect");
        console.log(response.data);
        setTickets(response.data); //results
      })
      .catch((error) => {
        console.log("error in get recipe info");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    console.log(JSON.stringify(data));
    var ticketParameter = {
      text: data.text,
      username: user.username,
      category: 1,
    };
    console.log(ticketParameter);
    axios
      .post("http://127.0.0.1:8000/api/tickets/", JSON.stringify(ticketParameter), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        Swal.fire({
            title: 'ثبت تیکت',
            text: 'تیکت شما با موفقیت ثبت شد',
            icon: 'success',
          });
        fetchData();
      })
      .catch((error) => {
        alert("خطایی رخ داده است. لطفا مجددا تلاش کنید.");
        console.log("error in creating ticket.");
      });
  };
  console.log(tickets);
  console.log("1");
  console.log(tickets[0] === undefined);
  console.log("2");
  
  return (
    <Grid container spacing={2}>
        <Grid container item spacing={2} xs={12} sm={12} md={2}>
          <DashboardSidebar />
        </Grid>
        <Grid container item spacing={2} xs={12} sm={12} md={9}>
          <Grid item xs={12} sm={12} md={12}>
            <DashboardHeader />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="ticket_body_area">
              <div className="f-p-container">
                <h1 className="f-title">تیکت های من</h1>
              </div>
              {tickets.map((ticket) => (
                <TicketCard ticket={ticket} />
              ))}
              <form id="review-form" className="review-form" onSubmit={handleSubmit(onSubmit)}>
                <h4>نظر خود را بنویسید</h4>
                <br />
                <input
                  type="text"
                  placeholder="متن"
                  className="form-control"
                  {...register("text")}
                />
                <button class="btn action_btn thm_btn" type="submit">
                  ثبت نظر
                </button>
              </form>
            </div>
          </Grid>
        </Grid>
    </Grid>
  );
};

export default DashPromotionComponent;
