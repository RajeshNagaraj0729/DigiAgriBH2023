import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    createUser,
    fetchUserInfo,
} from "../../redux/actions/Userdata/userdata";
import { usersFromLocalStorage } from "../../Utils/utils";
import { Alert } from "rsuite";

const Register = () => {
    const userRoles = useSelector((state) => state.User.userRoles);
    const dispatch = useDispatch();
    const history = useHistory();

    const collegeOptions = [
        {
            value: "College 1",
            label: "College 1",
        },
        {
            value: "College 2",
            label: "College 2",

        },
        {
            value: "College 3",
            label: "College 3",

        },
        {
            value: "College 4",
            label: "College 4",

        }, ,
        {
            value: "College 5",
            label: "College 5",

        }, ,
        {
            value: "College 6",
            label: "College 6",

        }
    ];
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const getUser = async () => {
        await dispatch(fetchUserInfo());
    };
    const onSubmit = (data) => {
        try {
            data = {
                ...data,
                createdBy: usersFromLocalStorage?.id,
            };
            dispatch(createUser(data))
                .then((response) => {
                    getUser();
                    Alert.success("User data added Successfully");
                    history.push("kisan-vedika-login");
                })
                .catch((error) => {
                    console.log("error message", error);
                });
        } catch (error) {
            console.log("Error fetching data from API:", error);
            Alert.error("Some thing wrong happend");
        }
    };

    return (
        <div>
            <div className="row" style={{ marginLeft: "100px" }}>
                <div className="col-12">
                    <h2 className="mainHeading">Add User Details</h2>
                </div>
            </div>

            <div className="tableMainSection cardShadow p-3">
                <div className="row">
                    <div className="col-12 col-sm-6" style={{ marginLeft: "300px" }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <div className="row mb-3">
                                    <div className="col-12 col-md-4  align-self-center">
                                        <label className="bannerLableStyle">Username: </label>
                                    </div>
                                    <div className="col-12 col-md-8">
                                        <input
                                            type="text"
                                            className="inputStyle"
                                            name="User Name"
                                            {...register("userName", { required: true })}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-12 col-md-4 align-self-center">
                                        <label className="bannerLableStyle">Password: </label>
                                    </div>
                                    <div className="col-12 col-md-8">
                                        <input
                                            type="password"
                                            className="inputStyle"
                                            name="password"
                                            {...register("password", { required: true })}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-12 col-md-4 align-self-center">
                                        <label className="bannerLableStyle">Phone: </label>
                                    </div>
                                    <div className="col-12 col-md-8">
                                        <input
                                            type="text"
                                            name="phone"
                                            className="inputStyle"
                                            {...register("phone", { required: true })}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-12 col-md-4 align-self-center">
                                        <label className="bannerLableStyle">College Name: </label>
                                    </div>
                                    <div className="col-12 col-md-8">
                                        {/* <select
                                            name="collegeName"
                                            {...register("collegeName")}
                                            className="inputStyle"
                                        >
                                {collegeOptions.map((elem)=>{
                                    <option key={elem?.value} value={elem?.value}>
                                                    {elem?.label}
                                                </option>
                                })}
                                               
                                        </select> */}

                                        <div className="col-12 col-md-8">
                                            <select
                                                name="collegeName"
                                                {...register("collegeName")}
                                                className="inputStyle"
                                            >
                                                {collegeOptions.map((elem) => (
                                                    <option key={elem.value} value={elem.value}>
                                                        {elem.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>


                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12 col-md-4 align-self-center">
                                        <label className="bannerLableStyle">Student ID: </label>
                                    </div>
                                    <div className="col-12 col-md-8">
                                        <input
                                            type="text"
                                            name="phone"
                                            className="inputStyle"
                                            {...register("phone", { required: true })}
                                        />
                                    </div>
                                </div>

                                {/* <div className="row mb-3">
                                    <div className="col-12 col-md-4 align-self-center">
                                        <label className="bannerLableStyle">
                                            Access Granted For:
                                        </label>
                                    </div>
                                    <div className="col-12 col-md-8 d-flex">
                                        <div className="form-check">
                                            <Controller
                                                name="accessGrantedFor"
                                                control={control}
                                                defaultValue={[]}
                                                render={({ field: { onChange, value } }) => (
                                                    <>
                                                        <input
                                                            type="checkbox"
                                                            id="accessGrantedForKV"
                                                            name="accessGrantedForKV"
                                                            className="form-check-input"
                                                            value="kv"
                                                            checked={value.includes("kv")}
                                                            onChange={(e) => {
                                                                const checked = e.target.checked;
                                                                const newValue = checked
                                                                    ? [...value, "kv"]
                                                                    : value.filter((item) => item !== "kv");
                                                                onChange(newValue);
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor="accessGrantedForKV"
                                                            className="form-check-label"
                                                        >
                                                            KV
                                                        </label>
                                                    </>
                                                )}
                                            />
                                        </div>

                                        <div className="form-check" style={{ marginLeft: "10px" }}>
                                            <Controller
                                                name="accessGrantedFor"
                                                control={control}
                                                defaultValue={[]}
                                                render={({ field: { onChange, value } }) => (
                                                    <>
                                                        <input
                                                            type="checkbox"
                                                            id="accessGrantedForCD"
                                                            name="accessGrantedForCD"
                                                            className="form-check-input"
                                                            value="cd"
                                                            checked={value.includes("cd")}
                                                            onChange={(e) => {
                                                                const checked = e.target.checked;
                                                                const newValue = checked
                                                                    ? [...value, "cd"]
                                                                    : value.filter((item) => item !== "cd");
                                                                onChange(newValue);
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor="accessGrantedForCD"
                                                            className="form-check-label"
                                                        >
                                                            CD
                                                        </label>
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="d-flex">
                                <button
                                    type="submit"
                                    className="btn btn-sm btn-danger"
                                    style={{ marginLeft: "350px" }}
                                    onClick={() => {
                                        reset();
                                    }}
                                >
                                    Clear
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-sm btn-primary"
                                    style={{ marginLeft: "10px" }}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
