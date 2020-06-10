// eslint-disable-next-line
/*eslint jsx-quotes: ["error", "prefer-double"]*/
/*
  This file is a part of Homework MERN
  Author: Angel Labrada Massó
 */

// ===============================================================
// Import Components
// ===============================================================
import React from 'react'

const Header = (props) => {

  return (
    <div id="kt_header" className="header  header-fixed ">
  	{/* begin::Header Wrapper */}
  	<div className="header-wrapper rounded-top-xl d-flex flex-grow-1 align-items-center">
  		{/* begin::Container */}
  		<div className=" container-fluid  d-flex align-items-center justify-content-end justify-content-lg-between flex-wrap">
  			{/* begin::Menu Wrapper */}
  			<div className="header-menu-wrapper header-menu-wrapper-left py-lg-2" id="kt_header_menu_wrapper">
  				{/* begin::Menu */}
  				<div id="kt_header_menu" className="header-menu header-menu-mobile  header-menu-layout-default ">
  					{/* begin::Nav */}
  					<ul className="menu-nav ">
  						<li className="menu-item  menu-item-active " aria-haspopup="true">
                <a href="https://keenthemes.com/metronic/preview/demo6/index.html" className="menu-link ">
                  <span className="menu-text">Dashboard</span>
                </a>
              </li>
            </ul>
  					{/* end::Nav */}
  				</div>
  				{/*end::Menu*/}
  			</div>
  			{/*end::Menu Wrapper*/}

  			{/* begin::Toolbar-*/}
  			<div className="d-flex align-items-center py-3">
  			  {/*begin::Dropdown*/}

  				{/* end::Dropdown */}
  			</div>
  			{/* end::Toolbar */}
  		</div>
  		{/* end::Container */}
  	</div>
  	{/* end::Header Wrapper */}
  </div>
  )
}

export default Header
