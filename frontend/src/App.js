import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "views/Login";
import Profile from "views/Profile";
import Register from "views/Register";
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signin' element={<Register />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  );
};

export default App;