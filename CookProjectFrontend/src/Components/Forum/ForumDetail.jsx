import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import element from "../../images/nodel-ba-panir.jpg";
import author from "../../images/author.jpg";
import Rating from "@mui/material/Rating";
import PageBanner from "../Banner/PageBanner.js";
import chief_profile_img from "../../images/chief_profile.jpg";
import author_avatar from "../../images/author-avatar.png";
import axios from "axios";
import {BASE_API, check_error} from "../../App";
import Swal from 'sweetalert2';

import {
  ChiefCard,
  ChiefContainer,
  ChiefH1,
  ChiefH2,
  ChiefImage,
  ChiefP,
  ChiefWrapper,
} from "./ForumStyle";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar-second";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin";

export const ChiefCardComplete = () => {
  const { chiefName } = useParams();
  const [followedChief, setFollowedChief] = useState(false);
  const [chiefDetail, setChiefDetail] = useState({});
  useEffect(() => {
    const url = `http://127.0.0.1:8000/api/accounts/${chiefName}/profile/?username=${user.username}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setChiefDetail(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  });
  useEffect(() => {
    const checkFollowedChief = async () => {
      await axios
        .get(BASE_API + `accounts/${chiefName}/hasFollowed`,{
            params: {
              username: username
            },
              headers: {
                "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data === "True")
            setFollowedChief(true); //results
          else
            setFollowedChief(false); //results
        })
        .catch((error) => {
          console.log("error in get checking followed forum or not.");
        });
    };
    checkFollowedChief();
  })
  const user = useLogin();
  const username = user.username;
  function follow_chief() {
    axios
        .put(BASE_API + `accounts/${chiefName}/follow/?username=${username}`,{
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((response)  => {
          console.log(response.data);
          setFollowedChief(true); //
          Swal.fire({
            title: 'دنبال کردن آشپز',
            text: `شما هم اکنون آشپز ${chiefName} را دنبال می کنید.`,
            icon: 'success',
          })
        })
        .catch((error) => {
          console.log("error in follow chief.");
        });
  }

  function unfollow_chief() {
    axios
        .delete(BASE_API + `accounts/${chiefName}/unfollow/?username=${username}`,{
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((response)  => {
          console.log(response.data)
          setFollowedChief(false); //results
          Swal.fire({
            title: 'دنبال نکردن آشپز',
            text: `شما آشپز ${chiefName} را دیگر دنبال نمی کنید.`,
            icon: 'success',
          })
        })
        .catch((error) => {
          console.log("error in follow chief.");
        });
  }
  return (<ChiefContainer>
  <ChiefH1>پروفایل آشپز {chiefDetail.username}</ChiefH1>
  <ChiefWrapper>
    <ChiefCard>
      <ChiefImage src={chief_profile_img}></ChiefImage>
      <ChiefH2>
        {chiefDetail.first_name} {chiefDetail.last_name}
      </ChiefH2>
      <ChiefP>{chiefDetail.bio}</ChiefP>

      <a
        href={
          "mailto: " +
          chiefDetail.email +
          "?subject=Mail from Cookommunity"
        }
      >
        سوالات خود را بپرسید!
      </a>
      <button class="mbtn" hidden={followedChief} onClick={follow_chief}>دنبال کن !</button>
      <button class="mbtn2" hidden={!followedChief} onClick={unfollow_chief}>دنبال نکن :(</button>
    </ChiefCard>
  </ChiefWrapper>
</ChiefContainer>);
}


function ForumDetail() {
  const [Forum, setForum] = useState({});
  const [followedForum, setFollowedForum] = useState(false);
  const { register, handleSubmit } = useForm();
  const { chiefName, forumName, forumId } = useParams();
  const user = useLogin();
  const username = user.username;
  const Swal = require('sweetalert2')

  useEffect(() => {
    const checkFollowedForum = async () => {
      await axios
        .get(BASE_API + `forums/${forumId}/checkFollowed`,{
            params: {
              username: username
            },
              headers: {
                "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data == "True")
            setFollowedForum(true); //results
          else
            setFollowedForum(false); //results
        })
        .catch((error) => {
          console.log("error in get checking followed forum or not.");
        });
    }

    const fetchData = async () => {
      await axios
        .get(BASE_API + "forums/view",{
            params: {
              forumId: 1,
              username: username
            },
              headers: {
                "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setForum(response.data); //results
        })
        .catch((error) => {
          console.log("error in get forum info.");
        });
    }
    checkFollowedForum();
    fetchData();
  });

  function followForum() {
    axios
        .patch(BASE_API + `forums/${forumId}/join/?username=${username}`,{
              headers: {
                "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setFollowedForum(true); //results
          Swal.fire({
            title: 'دنبال کردن',
            text: `شما فوروم ${forumId} را دنبال می کنید`,
            icon: 'success',
          })
        })
        .catch((error) => {
          console.log("error in get forum info.");
        });
  }

  function unfollowForum() {
    axios
        .patch(BASE_API + `forums/${forumId}/leave/?username=${username}`,{
              headers: {
                "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setFollowedForum(false); //results
          Swal.fire({
            title: 'دنبال نکردن',
            text: `شما دیگر فوروم ${forumId} را دنبال نمی کنید.`,
            icon: 'success',
          })
        })
        .catch((error) => {
          console.log("error in get forum info.");
        });
  }

  const onSubmit = (data) => {
    console.log("on submit text:");
    console.log(data)
    axios
        .post(
            BASE_API + `forums/${forumId}/post/`,
            {
              params: {
                sender: username,
                text: data.text
              },
              headers: {
                  "Content-Type": "application/json",
              },
            }
        )
        .then((response) => {
            if (check_error(response.data))
                alert(response.data.err_msg)
            else{
              Swal.fire({
                title: 'ثبت نظر',
                text: `نظر شما با موفقیت ثبت شد`,
                icon: 'success',
              })
            }
        })
        .catch((error) => {
        });
  };

  while (Forum.messages == undefined){
    return <>Still loading...</>;
  }

  return (
    <>
      <Sidebar />
      <Navbar />
      <Grid container spacing={2}>
        <Grid container item spacing={2} xs={12} sm={12} md={3}>
          <Grid item xs={12} sm={12} md={12}>
            <ChiefCardComplete />
          </Grid>
        </Grid>
        <Grid container item spacing={2} xs={12} sm={12} md={9}>
          <Grid item xs={12} sm={12} md={12}>
            <div className="forum_body_area">
              <div className="f-p-container">
                <h1 className="f-title">فوروم {forumId}</h1>
                <button class="mbtn" hidden={followedForum} onClick={followForum}>دنبال کن !</button>
                <button class="mbtn2" hidden={!followedForum} onClick={unfollowForum}>دنبال نکن :(</button>
              </div>
              <div class="forum-post-top">
                <a class="author-avatar" href="#">
                  <img src={author_avatar} alt="author avatar" />
                </a>
                <div class="forum-post-author">
                  
                  <div class="comment-content">
                    {Forum.messages.map((comment) => (
                      <Grid>
                        <a class="author-name" href="#">
                          {comment.sender}
                        </a>
                        <div class="forum-author-meta">
                          <div class="author-badge">
                            <i class="icon_calendar"></i>
                            <p>{new Date(comment.date).toLocaleString('fa-IR')}</p>
                          </div>
                        </div>
                        <p>
                          {comment.text}
                        </p>
                      </Grid>
                    ))}
                  </div>
                </div>
              </div>
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
    </>
  );
}

export default ForumDetail;
