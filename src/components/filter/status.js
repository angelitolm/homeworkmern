// eslint-disable-next-line
/*eslint jsx-quotes: ["error", "prefer-double"]*/
/*
  This file is a part of Homework MERN
  Author: Angel Labrada Massó
 */

// ===============================================================
// Import Components
// ===============================================================
import React, { Fragment } from 'react'

// Personalized Components


const Status = (props) => {

  return (
    <Fragment>
      <div className="card card-custom card-stretch card-shadowless gutter-b">
        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
          <div className="card-title font-weight-bolder">
              <div className="card-label">
                  Status
              </div>
          </div>
          <div className="card-toolbar">
          </div>
        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className="card-body" style={{ position: "relative;" }}>
        </div>
        {/* end::Body */}

      </div>
    </Fragment>
  )
}

export default Status
