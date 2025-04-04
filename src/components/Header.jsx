import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    try {
      toast.success("Logout Successfully");
      localStorage.removeItem("token");
      setToken(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between bg-[#2C3E50] text-white py-6 px-10">
      <div>
        <h1 className="text-3xl font-semibold">Blogging Platform</h1>
      </div>
      <div className="flex gap-14">
        {/* Navigation Links */}
        <div className="flex gap-10 font-medium">
          <NavLink to="/">Home</NavLink>
          {token && <NavLink to="/my-blogs">My Blogs</NavLink>}
          {token && <NavLink to="/create-blog">+Create New Blog</NavLink>}
        </div>

        {/* Auth Links */}
        <div className="flex gap-5 font-medium">
          {!token && (
            <>
              <NavLink to="/login">
                <p className="border-2 rounded-full px-4 hover:bg-slate-500">
                  Login
                </p>
              </NavLink>
              <NavLink to="/register">
                <p className="border-2 rounded-full px-4 hover:bg-slate-500">
                  Register
                </p>
              </NavLink>
            </>
          )}
          {token && (
            <button
              onClick={handleLogout}
              className="text-red-500 border-2 rounded-full px-4 hover:bg-red-400"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
