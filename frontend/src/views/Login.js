import * as React from "react";

import Navbar from "components/Navbars/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Bar from "components/snackbar";
import { login } from "Api";
import GoogleLogin from "react-google-login";

export default function Login() {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  React.useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);
  const [emailinvalid, setEmailinvalid] = React.useState("");
  const [passwordinvalid, setPasswordinvalid] = React.useState("");
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [data, setdata] = React.useState(null);
  const [loading, setloading] = React.useState(false);
  const [error, seterror] = React.useState("");
  const [errormodal, seterrormodal] = React.useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.target.reset();
    console.log("inside submit", user);
    const { email, password } = user;

    if (email === "" || password === "") {
      email === "" && setEmailinvalid("Email Is Required");
      password === "" && setPasswordinvalid("Password is Required");
      seterrormodal(true);
      return;
    } else {
      setloading(true);
      seterror("");
      setUser({
        email: "",
        password: "",
      });
      const result = await login(user);
      if (result) {
        setloading(false);
        result.status === "success" && setdata(result);
        result.status === "success" && localStorage.setItem("userInfo", JSON.stringify(result)); 
        result.status === "false" && seterror(result.error);
      }
    }
  };
   const handleFailure = (result) => {
     return;
   };
  const handleLogin = (data) => {
    console.log(data.profileObj);
    const { email, name: firstName, googleId } = data.profileObj;
    // dispatch(login({ email, firstName, googleId }));
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
              message={"Login Successfully"}
              severity="success"
              vertical="top"
              timeout="1000"
              onclick={() => navigate("/profile")}
            />
          )}
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                  <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-center">
                      <h6 className="text-blueGray-700 text-xl font-bold">
                        Sign in to Your Account
                      </h6>
                    </div>
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-blueGray-400 text-center mb-3 font-bold">
                      <small>Welcome</small>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Email"
                          onChange={emailchangeHandler}
                          defaultValue={user.email}
                        />
                        <label className="text-red-500 text-xs">
                          {emailinvalid}
                        </label>
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                          onChange={passwordchangeHandler}
                          defaultValue={user.password}
                        />
                        <label className="text-red-500 text-xs">
                          {passwordinvalid}
                        </label>
                      </div>
                      <div className="text-center mt-6">
                        {!loading && (
                          <button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit"
                          >
                            Sign In
                          </button>
                        )}
                        {loading && (
                          <div className="flex justify-center items-center bg-blueGray-800 rounded">
                            <div className="text-white font-bold">
                              Logging...
                            </div>
                            <div className="m-2 w-8 h-8 border-t-2 border-l-2 border-white-900 rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6 relative justify-end">
                  <div className="w-1/2 text-right">
                    <Link to="/signin" className="text-blueGray-200">
                      <small className="underline">Create new account ?</small>
                    </Link>
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
