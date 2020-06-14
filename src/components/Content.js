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
import FilterEmployee from './filter/filterForm'

const Content = (props) => {

  return (
    <Fragment>
    	{/* begin::Dashboard */}
      {/* begin::Row */}
      <div className="row mt-0 mt-lg-8 card-shadow">
        <div className="col-md-9">
          <EmployeeList props={props} />
        </div>

        <div className="col-md-3">
          <FilterEmployee props={props} />
        </div>
      </div>
      {/* end::Row */}
      {/* end::Dashboard */}
    </Fragment>
  )
}

const mapStateToProps = (state, props) => {

  const { columns, setColumns, fields, setFields, selectColumns, setSelectColumns, fieldsByColumns, setfieldsByColumns, filteredEmployee,
    currentPage, setCurrentPage, employeePerPage, setTotalEmployeePerPage, employees, setEmployees, onChangeSearch, selectedOption, setSelectedOption,

   } = props

  return { columns, setColumns, fields, setFields, selectColumns, setSelectColumns, fieldsByColumns, setfieldsByColumns, filteredEmployee,
    currentPage, setCurrentPage, employeePerPage, setTotalEmployeePerPage, employees, setEmployees, onChangeSearch, selectedOption, setSelectedOption,
    
   }
}

export default connect(
    mapStateToProps,
  )(Content)
