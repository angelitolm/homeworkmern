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

// Images
const iconToggle = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M6,9 L6,15 C6,16.6568542 7.34314575,18 9,18 L15,18 L15,18.8181818 C15,20.2324881 14.2324881,21 12.8181818,21 L5.18181818,21 C3.76751186,21 3,20.2324881 3,18.8181818 L3,11.1818182 C3,9.76751186 3.76751186,9 5.18181818,9 L6,9 Z" fill="#000000" fill-rule="nonzero"></path><path d="M10.1818182,4 L17.8181818,4 C19.2324881,4 20,4.76751186 20,6.18181818 L20,13.8181818 C20,15.2324881 19.2324881,16 17.8181818,16 L10.1818182,16 C8.76751186,16 8,15.2324881 8,13.8181818 L8,6.18181818 C8,4.76751186 8.76751186,4 10.1818182,4 Z" fill="#000000" opacity="0.3"></path></g></svg>'

const HeaderMobile = (props) => {

  return (
    <div id="kt_header_mobile" className="header-mobile  header-mobile-fixed ">
	    {/* begin::Logo */}
    	<a href="https://keenthemes.com/metronic/preview/demo6/index.html">
    		Homework
    	</a>
      {/* end::Logo */}

	    {/* begin::Toolbar */}
    	<div className="d-flex align-items-center">
    	  <button className="btn p-0 burger-icon burger-icon-left" id="kt_header_mobile_toggle">
    			<span></span>
    		</button>

        <button className="btn btn-hover-text-primary p-0 ml-5" id="kt_sidebar_mobile_toggle">
      		<span className="svg-icon svg-icon-xl">
            <div dangerouslySetInnerHTML={{ __html: iconToggle }}  />
          </span>
        </button>

    		<button className="btn btn-hover-text-primary p-0 ml-2" id="kt_aside_mobile_toggle">
    				<span className="svg-icon svg-icon-xl">
              <div dangerouslySetInnerHTML={{ __html: iconToggle }}  />
            </span>
            </button>
    			</div>
    	{/* end::Toolbar */}
    </div>
  )
}

export default HeaderMobile
