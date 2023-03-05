import React from "react";
import {useState, useEffect} from "react";
import {Container} from "./EditProfile";
import DashboardSidebar from "../Dashboard/Dash-sidebar";
import DashboardHeader from "../Dashboard/Dash-header";
import "./edit-profile.css";
import url_img from "./../../images/1.jpg";
import {useForm} from "react-hook-form";
import axios from "axios";
import {BASE_API, check_error, ROLES} from "../../App";

const EditProfile = ({removeAuth}) => {
    const {register, handleSubmit} = useForm();
    let username = JSON.parse(localStorage.getItem("username"));
    const [user, setUser] = useState(null);
    const onSubmit = (data) => {
        if (data.email === "")
            data.email = user.email
        if (data.first_name === "")
            data.first_name = user.first_name
        if (data.last_name === "")
            data.last_name = user.last_name
        console.log(data)
        axios
            .patch(
                BASE_API + `accounts/${username}/profile/?username=${username}`,
                JSON.stringify(data),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                if (check_error(response.data))
                    alert(response.data.err_msg)
                else
                    setUser(response.data)

            })
            .catch((error) => {
            });
    };
    useEffect(() => {
        axios
            .get(BASE_API + `accounts/${username}/profile/?username=${username}`)
            .then((response) => {
                if (check_error(response.data))
                    alert(response.data.err_msg)
                else
                    setUser(response.data)
            })
            .catch((error) => {

            });
    }, []);
    return (
        <Container>
            <DashboardSidebar/>
            <DashboardHeader removeAuth={removeAuth}/>
            {user &&
            <div className="content-edit">
                    <p> سلام {user.first_name} به سایت ما خوش آمدی</p>
                <div className="form-edit">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col1">
                                <label htmlFor="fname">نام</label>
                                <br/>
                                <input
                                    type="text"
                                    placeholder={user.first_name}
                                    className="f-input"
                                    {...register("first_name")}
                                />
                            </div>
                            <div className="col1">
                                <label htmlFor="lname">نام خانوادگی</label>
                                <br/>
                                <input
                                    type="text"
                                    placeholder={user.last_name}
                                    className="f-input"
                                    {...register("last_name")}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col1">
                                <label htmlFor="lname">ایمیل</label>
                                <br/>
                                <input
                                    type="email"
                                    placeholder={user.email}
                                    className="f-input"
                                    {...register("email")}
                                />
                            </div>
                        </div>
                        <div className="col1">
                            <label htmlFor="lname">نقش کاربری</label>
                            <br/>
                            <input
                                type="text"
                                value={ROLES[user.role]}
                                className="f-input"
                                readOnly={true}
                            />
                        </div>
                        <div className="d-button">
                            <button type="submit" className="f-button">
                                ویرایش
                            </button>
                        </div>
                    </form>
                </div>
            </div>}
        </Container>
    );
};

export default EditProfile;