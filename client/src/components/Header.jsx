import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const {currentUser}= useSelector(state=>state.user);
  console.log(currentUser);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex-wrap">
          <span className="text-slate-500">Sahand</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="search"
            placeholder="Search.."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-900 " />
        </form>
        <ul className="flex gap-5">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline hover:shadow-lg hover:scale-110 duration-300">
              Home
            </li>
          </Link>

          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline  hover:shadow-lg hover:scale-110 duration-300">
              About
            </li>
          </Link>
      

          <Link to="/profile">
          {currentUser ? (
               <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
               ):(
                <li className=" text-slate-700 hover:underline  hover:shadow-lg hover:scale-110 duration-300">
                SignIn
              </li>
               ) }
          
          </Link>
        </ul>
      </div>
    </header>
  );
}
