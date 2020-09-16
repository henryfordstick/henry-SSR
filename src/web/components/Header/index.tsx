import React from "react";
import {NavLink} from "react-router-dom";

import "./header.css";


interface INavInfo{
  title: string,
  router: string,
  exact: boolean
}

const Header:React.FunctionComponent = () => {
  const navInfo:INavInfo[] = [{
    title: '网站首页',
    router: '/',
    exact: true
  },{
    title: '关于我们',
    router: '/about',
    exact: false
  }];

  return (
    <header>
      <nav className="header-nav">
        <ul>{
          navInfo.map((r,i) => (
            <li key={i}>
              <NavLink
                exact={r.exact}
                className="guide-item"
                activeClassName="active"
                to={r.router}>
                { r.title }
              </NavLink>
            </li>
          ))
        }</ul>
      </nav>
    </header>
  );
};

export default Header;