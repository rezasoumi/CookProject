import React, { useState, useEffect } from "react";
import ForumCard from "./ForumCard";
import Grid from "@mui/material/Grid";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar-second";
import chief_profile_img from "../../images/chief_profile.jpg";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Forum.css";
import { updateLogin, useLogin } from "../../hooks/useLogin";

import {
  ChiefCard,
  ChiefContainer,
  ChiefH1,
  ChiefH2,
  ChiefImage,
  ChiefP,
  ChiefWrapper,
} from "./ForumStyle";
import { useParams } from "react-router-dom";
import { ChiefCardComplete } from "./ForumDetail";
function ForumProfile({ Forums }) {
  const rows = [
    { id: 1, lastName: "Lannister", firstName: <a>click</a>, age: 42 },
  ];
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "عنوان", width: 230 },
    {
      field: "members_count",
      headerName: "تعداد اعضا",
      width: 150,
      valueGetter: (params) =>
        `<a href="${params.getValue("id")}">${params.getValue("id")}</a>`,
    },
  ];
  const { chiefName } = useParams();
  const [chiefDetail, setChiefDetail] = useState({});
  const [chiefForum, setchiefForum] = useState([]);
  const user = useLogin();

  const getForum = (value) => {
    axios
      .get("http://127.0.0.1:8000/api/forums/", {
        params: {
          owned: chiefName == user.username ? 1 : 0,
          username: chiefName,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        let arr = response.data;
        // let row2=Array.isArray(chiefForum).map((forum) => {rows.push(forum)});
        setchiefForum(arr);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    const url = `http://127.0.0.1:8000/api/accounts/${chiefName}/profile/?username=${user.username}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setChiefDetail(json);
        getForum(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  });

  return (
    <>
      <Sidebar />
      <Navbar />
      <Grid container spacing={2}>
        <Grid container item spacing={2} xs={12} sm={12} md={3}>
          <ChiefCardComplete />
        </Grid>
        <Grid container item spacing={2} xs={12} sm={12} md={9}>
          <Grid item xs={12} sm={12} md={12}>
            <div className="forum_body_area">
              <div className="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="جست و جوی فورم"
                ></input>
                <button class="btn">
                  <SearchIcon />
                </button>
              </div>
              {/* <div style={{ height: 700, width: "100%" }}> */}
              {/* <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={100}
                  rowsPerPageOptions={[50]}
                  checkboxSelection={false}
                /> */}
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650, direction: "rtl" }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>شناسه</TableCell>
                      <TableCell>اسم فورم</TableCell>
                      <TableCell>تعداد کاربر</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {chiefForum.map((Forum) => (
                      <TableRow>
                        <TableCell>{Forum.id}</TableCell>
                        <TableCell><Link to={`/forum-profile/${chiefName}/forumList/${Forum.name}/h/${Forum.id}`} >{Forum.name}</Link></TableCell>
                        <TableCell>{Forum.members_count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ForumProfile;
