import React from "react";
import { Sidebar, Image, Mbutton } from "./DashboardElements";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Logo from "../../images/logo.svg";
import ItemAccordion from "../Items";
import { accordion1 } from "../Items/Data";
import "./Dashboard.css";

const DashboardSidebar = () => {
  return (
    <div>
      <Sidebar>
        <Image src={Logo} alt="logo" />
        <ul>
          <li className="div-icon">
            <EditOutlinedIcon className="m-icon" />
            <Mbutton to="/dashboard/view-profile">حساب من</Mbutton>
          </li>
          <li className="div-icon">
            <EditOutlinedIcon className="m-icon" />
            <Mbutton to="/dashboard/edit-profile">ویرایش اطلاعات</Mbutton>
          </li>
          <li className="div-icon">
            <ConfirmationNumberOutlinedIcon className="m-icon" />
            <Mbutton to="/dashboard/tickets"> تیکت های پشتیبانی </Mbutton>
          </li>
        </ul>
      </Sidebar>
    </div>
  );
};

export default DashboardSidebar;
