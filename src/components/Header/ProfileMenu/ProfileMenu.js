import { Link } from "react-router-dom";
import React, { useState } from "react";
import $ from "jquery";
import "./profileMenu.css";
import ProfilePage from "../../ProfilePage/ProfilePage";

const ProfileMenu = () => {
  const [seen, setSeen] = useState(false);

  const menu_window = () => {
    $(".user_submenu").toggle();
    $(".message_box").hide();
  };

  const clear_token = () => {
    sessionStorage.clear();
  };

  const profile_window = () => {
    setSeen(!seen);
  };

  return (
    <div className="user_icon" id="user_icon" >
      <div className="user_alignment">
        <i className="fa fa-bars" onClick={menu_window}></i>
        <div className="user_submenu"  id="user_submenu" >
          <ul>
            <li id="profile"><a onClick={profile_window}><span className='spanProfileMenu'>Profile</span></a></li>
            <li id="boards"><Link to="/boards"><span className='spanProfileMenu'>Boards</span></Link></li>
            <li id="logout"><Link onClick={clear_token} to="/"><span className='spanProfileMenu'>Log out</span></Link></li>
          </ul>
        </div>
      </div>
      {seen ? <ProfilePage onClick={profile_window} /> : null}
    </div>
  );
};

export default ProfileMenu;
