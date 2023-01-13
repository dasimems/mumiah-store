import React from 'react'
import { accountLinks, routeName } from '../../../utils/constant';
import { Link, useNavigate } from 'react-router-dom';
import { RiLogoutCircleLine } from 'react-icons/ri';

const AccountLinks = () => {
  const navigate = useNavigate();
  return (
    <div className="pop-up account-pop-up">
      <div className="account-pop-up-header flex-container align-center justify-start">
        <div className="account-image"></div>

        <div className="account-details">
          <h2>Eden Smith</h2>
          <p>Los Angeles, CA</p>
        </div>
      </div>

      <ul className="account-pop-up-link">
        {accountLinks.slice(0, 3).map((linkDetails, index) => {
          var { label, icon, link } = linkDetails;
          return (
            <li key={index}>
              <Link to={link}>
                <span className="icon">{icon}</span>

                <span className="text">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className="account-pop-up-link">
        {/* <li className="flex-container space-between align-center">

        <a href="#dark">

          <span className="icon">

            <RiLightbulbFlashLine />

          </span>

          <span className="text">

            Dark Theme

          </span>

        </a>

        <span className="slide-button">
          <span className="slide-button-inner"></span>
        </span>

      </li> */}

        {accountLinks.slice(3).map((linkDetails, index) => {
          var { label, icon, link } = linkDetails;
          return (
            <li key={index}>
              <Link to={link}>
                <span className="icon">{icon}</span>

                <span className="text">{label}</span>
              </Link>
            </li>
          );
        })}

        <li>
          <a href="#logout" onClick={()=>{

            if(localStorage.getItem("userEmail")){
              localStorage.removeItem("userEmail")

            }

            if(localStorage.getItem("userName")){
              localStorage.removeItem("userName")

            }

            if(localStorage.getItem("userId")){
              localStorage.removeItem("userId")

            }

            if(localStorage.getItem("user_token")){
              localStorage.removeItem("user_token")

            }

            navigate(routeName.login);

          }}>
            <span className="icon">
              <RiLogoutCircleLine />
            </span>

            <span className="text">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default AccountLinks
