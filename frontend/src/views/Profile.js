/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";

import Navbar from "components/Navbars/Navbar";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  const  data = JSON.parse(userInfo)
  console.log(typeof(user));
  React.useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data]);

  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        {data && (
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        {data && (
                          <img
                            alt="..."
                            src={`http://localhost:5000/${data.user.profile}`}
                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-24">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                      {data && data.user.username}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      
                    </div>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      {data && data.user.address},
                      {data.user.city},
                      {data.user.pincode}
                    </div>
                    <div className="mb-2 text-blueGray-600 mt-10">
                      <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                      {data.user.email}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-mobile mr-2 text-lg text-blueGray-400"></i>{" "}
                      {data.user.mobile}
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
