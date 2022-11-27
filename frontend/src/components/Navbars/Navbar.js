import { Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Navbar(props) {
  const navigate = useNavigate();
  const [userInfo,setUserinfo]=React.useState("");
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  React.useEffect(() => {
    setUserinfo(localStorage.getItem("userInfo"));
  }, []);

  const handlelogout = () => {
    const result = window.confirm("Do You Want to Logout ?");
    if (!result) return;
    result && localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/"
            >
              Welcome
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            {!userInfo && (
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="flex items-center">
                  <Link
                    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    to="/"
                  >
                    <i className="lg:text-blueGray-200 text-blueGray-400 fas fa-fingerprint text-lg leading-lg " />
                    <span className="inline-block ml-2">Sign In</span>
                  </Link>
                </li>

                <li className="flex items-center">
                  <Link
                    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    to="/signin"
                  >
                    <i className="lg:text-blueGray-200 text-blueGray-400 fas fa-clipboard-list text-lg leading-lg " />
                    <span className="inline-block ml-2">Register</span>
                  </Link>
                </li>
              </ul>
            )}
            {userInfo && (
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="flex items-center">
                  <Link
                    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    to="/profile"
                  >
                    <i className="lg:text-blueGray-200 text-blueGray-400 fas fa-user-alt text-lg leading-lg " />

                    <span className="inline-block ml-2">Profile</span>
                  </Link>
                </li>

                <li className="flex items-center">
                  <Link
                    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    onClick={handlelogout}
                  >
                    <i className="lg:text-blueGray-200 text-blueGray-400 fas fa-sign-out-alt text-lg leading-lg " />
                    <span className="inline-block ml-2">Logout</span>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
