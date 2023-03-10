import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
import element from "../../images/nodel-ba-panir.jpg";
import url_img from "./../../images/1.jpg";

function TicketCard({ ticket, cs }) {
    return (
    <Grid item xs={12} sm={6} md={4}>
            <div class="forum-post-top">
                <a class="author-avatar" href="#">
                  <img src={url_img} alt="author avatar" className="avatar" />
                </a>
                <div class="forum-post-author">
                  <a class="author-name" href="#">
                    {ticket.username}
                  </a>
                  <div class="forum-author-meta">
                    {cs && <div class="author-badge">
                      <span>Conversation Starter</span>
                    </div>}
                    <div class="author-badge">
                      <i class="icon_calendar"></i>
                      <p>January 16 at 10:32 PM</p>
                    </div>
                  </div>
                  <div class="comment-content">
                    <p>
                      {ticket.text}
                    </p>
                  </div>
                </div>
              </div>
          </Grid>
  );
}

export default TicketCard;
