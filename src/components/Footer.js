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

const Footer = (props) => {

  return (
    <div className="footer py-2 py-lg-0 my-5 d-flex flex-lg-column " id="kt_footer">
    	{/* begin::Container */}
    	<div className=" container-fluid  d-flex flex-column flex-md-row align-items-center justify-content-between">
    		{/* begin::Copyright */}
    		<div className="text-dark order-2 order-md-1">
    			<span className="text-muted font-weight-bold mr-2">2020©</span>
    			<a href="http://homeworkmern.com" className="text-dark-75 text-hover-primary">Homework MERN</a>
    		</div>
    		{/* end::Copyright */}

    		{/* begin::Nav */}
    		<div className="nav nav-dark order-1 order-md-2">
    			<a href="http://homeworkmern.com" className="nav-link pr-3 pl-0">About</a>
    			<a href="http://homeworkmern.com" className="nav-link px-3">Team</a>
    			<a href="http://homeworkmern.com" className="nav-link pl-3 pr-0">Contact</a>
    		</div>
    		{/* end::Nav */}
    	</div>
    	{/* end::Container */}
    </div>
  )
}

export default Footer
