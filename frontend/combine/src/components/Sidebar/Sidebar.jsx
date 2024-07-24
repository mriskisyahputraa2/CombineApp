import React from "react";
import { NavLink } from "react-router-dom";
import {
  IoPerson,
  IoPricetag,
  IoHome,
  IoLogOut,
  IoBook,
} from "react-icons/io5";

const Sidebar = () => {
  return (
    <div>
      <aside>
        <p>General</p>
        <ul>
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/products"}>
              <IoPricetag /> Products
            </NavLink>
          </li>
          <li>
            <NavLink to={"/books"}>
              <IoBook /> Books
            </NavLink>
          </li>
          <li>
            <NavLink to={"/notes"}>
              <IoHome /> Notes
            </NavLink>
          </li>
          <li>
            <NavLink to={"/weather"}>
              <IoHome /> Weather
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
