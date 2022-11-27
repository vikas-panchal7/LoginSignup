/* eslint-disable no-unused-vars */
import * as React from "react";

import Navbar from "components/Navbars/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { register } from "Api";
import Bar from "components/snackbar";

export default function Register() {
  const formData = new FormData();
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  React.useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);

  const [nameinvalid, setNameinvalid] = React.useState("");
  const [emailinvalid, setEmailinvalid] = React.useState("");
  const [dobinvalid, setDobinvalid] = React.useState("");
  const [mobileinvalid, setMobileinvalid] = React.useState("");
  const [passwordinvalid, setPasswordinvalid] = React.useState("");
  const [addressinvalid, setAddressinvalid] = React.useState("");
  const [cityinvalid, setCityinvalid] = React.useState("");
  const [pincodeinvalid, setPincodeinvalid] = React.useState("");
  const [profileinvalid, setProfileinvalid] = React.useState("");
  const [aadharinvalid, setAadharinvalid] = React.useState("");

  const [profile, setProfile] = React.useState({});
  const [aadhar, setAadhar] = React.useState({});

  const [img, setimg] = React.useState("");
  const [img1, setimg1] = React.useState("");

  const [data, setdata] = React.useState(null);
  const [loading, setloading] = React.useState(false);
  const [error, seterror] = React.useState("");
  const [errormodal, seterrormodal] = React.useState(false);

  const [user, setUser] = React.useState({
    username: "",
    email: "",
    dob: "",
    mobile: "",
    password: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const profilechangehandler = (event) => {
    setProfileinvalid("");
    setProfile(event.target.files[0]);
    const objectUrl = URL.createObjectURL(event.target.files[0]);
    setimg(objectUrl);
  };
  const aadharchangehandler = (event) => {
    setAadharinvalid("");
    setAadhar(event.target.files[0]);
    const objectUrl = URL.createObjectURL(event.target.files[0]);
    setimg1(objectUrl);
  };

  const namechangeHandler = (event) => {
    const value = event.currentTarget.value.trim();
    value === "" ? setNameinvalid("Name is required") : setNameinvalid("");
    value !== "" && handleChange(event);
  };

  const dobchangeHandler = (event) => {
    const value = event.currentTarget.value.trim();
    value === ""
      ? setDobinvalid("Please Select Date Of brith")
      : setDobinvalid("");
    value !== "" && handleChange(event);
  };

  const emailchangeHandler = (event) => {
    const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    const value = event.currentTarget.value.trim();
    !regex.test(value)
      ? setEmailinvalid("Please Enter Valid Email !")
      : setEmailinvalid("");
    regex.test(value) && handleChange(event);
  };

  const passwordchangeHandler = (event) => {
    const value = event.currentTarget.value.trim();
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    regex.test(value)
      ? setPasswordinvalid("")
      : setPasswordinvalid(
          "Password Must Contains Minimum eight characters, at least one letter and one number"
        );
    regex.test(value) && handleChange(event);
  };

  const mobilechangeHandler = (event) => {
    const regex = /^\d{10}$/;
    const value = event.currentTarget.value.trim();
    value.match(regex)
      ? setMobileinvalid("")
      : setMobileinvalid(
          "Please Provide 10 Digit Number excluding + and country code"
        );
    value.match(regex) && handleChange(event);
  };

  const addresschangehandler = (event) => {
    const value = event.currentTarget.value.trim();
    value === ""
      ? setAddressinvalid("Address is required")
      : setAddressinvalid("");
    value !== "" && handleChange(event);
  };

  const citychangehandler = (event) => {
    const value = event.currentTarget.value.trim();
    value === "" ? setCityinvalid("Address is required") : setCityinvalid("");
    value !== "" && handleChange(event);
  };

  const pincodechangehandler = (event) => {
    const value = event.currentTarget.value.trim();
    value === ""
      ? pincodeinvalid("Address is required")
      : setPincodeinvalid("");
    value !== "" && handleChange(event);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.target.reset();

    const { username, email, dob, mobile, password, address, city, pincode } =
      user;

    if (
      username === "" ||
      email === "" ||
      dob === "" ||
      mobile === "" ||
      password === "" ||
      address === "" ||
      city === "" ||
      pincode === "" ||
      img === "" ||
      img1 === ""
    ) {
      username === "" && setNameinvalid("Name is Required");
      email === "" && setEmailinvalid("Email Is Required");
      dob === "" && setDobinvalid("Date of brith is Required ");
      mobile === "" && setMobileinvalid("Mobile No is Required");
      password === "" && setPasswordinvalid("Password is Required");
      address === "" && setAddressinvalid("Address is Required");
      city === "" && setCityinvalid("City is Required");
      pincode === "" && setPincodeinvalid("Pincode is Required");
      img === "" && setProfileinvalid("Please Provide Profile Photo");
      img1 === "" && setAadharinvalid("Please Provide Aadhar");
      seterrormodal(true);
      return;
    } else {
      // console.log(user);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("dob", dob);
      formData.append("mobile", mobile);
      formData.append("password", password);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("pincode", pincode);
      formData.append("profile", profile);
      formData.append("aadhar", aadhar);
      setimg("");
      setimg1("");
      setloading(true);
      seterror("");
      setUser({
        username: "",
        email: "",
        dob: "",
        mobile: "",
        password: "",
        address: "",
        city: "",
        pincode: "",
      });
      const result = await register(formData);
      if (result) {
        setloading(false);
        result.status === "success" && setdata(result);
        result.status === "false" && seterror(result.error);
      }
    }
  };

  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
            }}
          ></div>
          {errormodal && (
            <Bar
              message={"Form Contains Error, Please See Error Marked in Red"}
              severity="error"
              vertical="top"
              timeout="5000"
              onclick={() => seterrormodal(false)}
            />
          )}
          {error && (
            <Bar
              message={error}
              severity="warning"
              vertical="top"
              timeout="5000"
              onclick={() => seterror("")}
            />
          )}
          {data && (
            <Bar
              message={"Account Created SuccessFully"}
              severity="success"
              vertical="top"
              timeout="5000"
              onclick={() => setdata(null)}
            />
          )}
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                      <div className="text-center flex justify-center">
                        <h6 className="text-blueGray-700 text-xl font-bold">
                          Register Your Account
                        </h6>
                      </div>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <form
                        method="post"
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                      >
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                          User Information
                        </h6>
                        <div className="flex flex-wrap">
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                name="username"
                                onChange={namechangeHandler}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Enter Your Name"
                                defaultValue={user.username}
                              />
                              <label className="text-red-500 text-xs">
                                {nameinvalid}
                              </label>
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Email address
                              </label>
                              <input
                                type="text"
                                name="email"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Enter Your Email"
                                onChange={emailchangeHandler}
                                defaultValue={user.email}
                              />
                              <label className="text-red-500 text-xs">
                                {emailinvalid}
                              </label>
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Date Of Brith
                              </label>
                              <input
                                type="Date"
                                name="dob"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                onChange={dobchangeHandler}
                                defaultValue={user.dob}
                              />
                              <label className="text-red-500 text-xs">
                                {dobinvalid}
                              </label>
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Mobile
                              </label>
                              <input
                                type="number"
                                name="mobile"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Enter Mobile Number"
                                onChange={mobilechangeHandler}
                                defaultValue={user.mobile}
                              />
                              <label className="text-red-500 text-xs">
                                {mobileinvalid}
                              </label>
                            </div>
                          </div>
                          <div className="w-full lg:w-12/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                password
                              </label>
                              <input
                                type="password"
                                name="password"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Enter Password"
                                onChange={passwordchangeHandler}
                                defaultValue={user.password}
                              />
                              <label className="text-red-500 text-xs">
                                {passwordinvalid}
                              </label>
                            </div>
                          </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                          Contact Information
                        </h6>
                        <div className="flex flex-wrap">
                          <div className="w-full lg:w-12/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Address
                              </label>
                              <input
                                type="text"
                                name="address"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Enter Your Addresss"
                                onChange={addresschangehandler}
                                defaultValue={user.address}
                              />
                              <label className="text-red-500 text-xs">
                                {addressinvalid}
                              </label>
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                City
                              </label>
                              <input
                                type="text"
                                name="city"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Enter Your City"
                                onChange={citychangehandler}
                                defaultValue={user.city}
                              />
                              <label className="text-red-500 text-xs">
                                {cityinvalid}
                              </label>
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Pin Code
                              </label>
                              <input
                                type="number"
                                name="pincode"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Enter Your PinCode"
                                onChange={pincodechangehandler}
                                defaultValue={user.pincode}
                              />
                              <label className="text-red-500 text-xs">
                                {pincodeinvalid}
                              </label>
                            </div>
                          </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                          Documents
                        </h6>
                        <div className="flex flex-wrap">
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Profile Photo
                              </label>
                              <input
                                type="file"
                                name="profilephoto"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                accept="image/*"
                                onChange={profilechangehandler}
                              />
                              <label className="text-red-500 text-xs">
                                {profileinvalid}
                              </label>
                            </div>
                            {img && (
                              <img
                                style={{
                                  height: "60px",
                                  width: "100px",
                                }}
                                src={img}
                                alt="img"
                              />
                            )}
                          </div>
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                AADHARCARD
                              </label>
                              <input
                                type="file"
                                name="aadharcard"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                accept="image/*"
                                onChange={aadharchangehandler}
                              />
                              <label className="text-red-500 text-xs">
                                {aadharinvalid}
                              </label>
                            </div>
                            {img1 && (
                              <img
                                style={{
                                  height: "60px",
                                  width: "100px",
                                }}
                                src={img1}
                                alt="img"
                              />
                            )}
                          </div>
                        </div>
                        <div className="text-center mt-6">
                          {!loading && (
                            <button
                              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                              type="submit"
                            >
                              Create Account
                            </button>
                          )}
                          {loading && (
                            <div className="flex justify-center items-center bg-blueGray-800 rounded">
                              <div className="text-white font-bold">
                                Creating...
                              </div>
                              <div className="m-2 w-8 h-8 border-t-2 border-l-2 border-white-900 rounded-full animate-spin"></div>
                            </div>
                          )}
                        </div>
                      </form>
                      <div className="flex flex-wrap mt-6 relative justify-end">
                        <div className="w-1/2 text-right">
                          <Link to="/">
                            <small>
                              Already Have an Account ?{" "}
                              <span className="underline">SIGN IN</span>
                            </small>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
