import React from "react";
import "./TopMenu.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../../context/AuthContext";
export default function TopMenu() {
  const { state } = useContext(AuthContext);

  return (
    <div className="col-md-12 mt-3 mb-3 bg-white p-2">
      <button className="btn btn-md dark">
        <Link
          to={`/${state.role_slug}/app-settings/app-profile`}
          className="top-menu-link"
        >
          <span className="fa fa-gears"></span> &nbsp; App Profile
        </Link>
      </button>
      
      <button className="btn btn-md dark ml-2">
        <Link
          to={`/${state.role_slug}/app-settings/app-roles`}
          className="top-menu-link"
        >
          <span className="fa fa-gears"></span> &nbsp; App Roles
        </Link>
      </button>
      <button className="btn btn-md dark ml-2">
        <Link
          to={`/${state.role_slug}/app-settings/app-admins`}
          className="top-menu-link"
        >
          <span className="fa fa-gears"></span> &nbsp; App Admins
        </Link>
      </button>
      <button className="btn btn-md dark ml-2">
      <Link
          to={`/${state.role_slug}/app-settings/app-modules`}
          className="top-menu-link"
        >
            <span className="fa fa-gears"></span> &nbsp; App Modules
        </Link>
      </button>
      
      <button className="btn btn-md dark ml-2">
      <Link
          to={`/${state.role_slug}/app-settings/role-modules-permissions`}
          className="top-menu-link"
        >
        <span className="fa fa-gears"></span> &nbsp; Role Modules & Permissions
        </Link>
      </button>
    </div>
  );
}
