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
import { connect } from "react-redux"

// Personalized Components
import EmployeeList from './employees/employeeList'

const Content = (props) => {

  return (
    <Fragment>
    	{/* begin::Dashboard */}
      {/* begin::Row */}
      <div className="row mt-0 mt-lg-8">
        <div className="col-md-12">
          <EmployeeList props={props} />
        </div>
      </div>
      {/* end::Row */}
      {/* end::Dashboard */}
    </Fragment>
  )
}

const mapStateToProps = (state, props) => {
  const search = state.search

  const {employees, setVisibleEmployees} = props

  return { employees, setVisibleEmployees }
}

export default connect(
    mapStateToProps,
  )(Content)
