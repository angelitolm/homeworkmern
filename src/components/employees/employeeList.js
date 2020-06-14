// eslint-disable-next-line
/*eslint jsx-quotes: ["error", "prefer-double"]*/
/*
  This file is a part of Homework MERN
  Author: Angel Labrada Massó
 */

// ===============================================================
// Import Components
// ===============================================================
import React, { Fragment, useState } from 'react'
import { connect } from "react-redux"

// Personalized Components
import Pagination from './pagination'

// Images
const iconSearch = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path><path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fill-rule="nonzero"></path></g></svg>'

const EmployeeList = ({props}) => {

  // ===============================================================
  // Hooks useState
  // ===============================================================
  const [ errors, setErrors ] = useState([])

  // ===============================================================
  // Change page
  // ===============================================================
  const paginate = pageNumber => props.setCurrentPage(pageNumber)
  //
  // // Increase employee per page
  const increaseEmployeePerPage = e => props.setTotalEmployeePerPage(e.target.value)

  // ===============================================================
  // Change color
  // ===============================================================
  const changeColor = color => {
    if (color === "yellow") return "warning"
    else if (color === "blue") return "info"
    else if (color === "green") return "success"
    else if (color === "gray") return "dark"
  }

  return (
    <Fragment>
      <div className="card card-custom card-stretch card-shadowless gutter-b">
        {/* begin::Header */}
        <div className="card-header border-0 py-5">
            <div className="card-toolbar">
              {/* begin::Desktop Search */}
              <div className="quick-search quick-search-inline flex-grow-1" id="kt_quick_search_inline">
                {/* begin::Form */}
                <form method="get" className="quick-search-form">
                  <div className="input-group rounded bg-light">

                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="quick-search-close ki ki-close icon-sm text-muted" style={{ display: "none" }}></i>
                      </span>
                    </div>

                    <input type="text" id="filter-table" className="form-control h-40px" placeholder="" onChange={e => {
                        props.onChangeSearch(e)
                      }
                    }
                    />

                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <span className="svg-icon svg-icon-lg">
                          <div dangerouslySetInnerHTML={{ __html: iconSearch }}  />
                        </span>
                      </span>
                    </div>
                  </div>
                </form>
                {/* end::Form */}
              </div>
              {/* end::Desktop Search */}

            </div>
        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className="card-body pb-0" style={{  padding: "0 0 0 1.75rem"}}>
            {/* begin::Table */}
            <div className="table-responsive">
                <table className="table table-head-custom table-vertical-center" id="kt_advance_table_widget_1">
                    <thead>
                        <tr className="text-left">
                            <th className="pr-0" style={{ minWidth: "200px" }}>Employee</th>
                            <th style={{ minWidth: "150px" }}>Role</th>
                            <th style={{ minWidth: "100px" }}>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                      {props.filteredEmployee.map((employee, idx) => {

                        return(
                        <tr key={idx}>
                            <td className="pr-0">
                              <div className="col-employee">
                                <div className="symbol symbol-50 symbol-light mt-1">
                                    <span className="symbol-label">
                                        <img src={employee.img} className="rounded-img h-75 align-self-end" alt={employee.name} />
                                    </span>
                                </div>

                                <div className="col-employee-name">
                                  <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                      {employee.employee}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td>
                                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                    {employee.role}
                                </span>
                                <span className="text-muted font-weight-bold">
                                    {/*Web, UI/UX Design*/}
                                </span>
                            </td>
                            <td>
                                <div className="d-flex flex-column w-100 mr-2">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <span className="text-muted mr-2 font-size-sm font-weight-bold">
                                            {employee.progress}%
                                        </span>
                                        <span className="text-muted font-size-sm font-weight-bold">
                                            {employee.status.value}
                                        </span>
                                    </div>
                                    <div className="progress progress-xs w-100">
                                        <div className={`progress-bar bg-${changeColor(employee.status.color)}`} role="progressbar" style={{ width: employee.progress + "%" }} aria-valuenow={employee.progress} aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </td>

                        </tr>
                      )})}
                    </tbody>
                </table>
            </div>
            {/* end::Table */}



        </div>
        <Pagination
           employeePerPage={props.employeePerPage}
           increaseEmployeePerPage={increaseEmployeePerPage}
           totalEmployee={props.employees.length}
           paginate={paginate}
           currentPage={props.currentPage}
         />
        {/* end::Body */}
      </div>

      <div className="card card-custom">
        <div className="card-body pb-0" style={{  padding: "0 0 0 1.75rem"}}>

         </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state, props) => {

  const { columns, setColumns, fields, setFields, selectColumns, setSelectColumns, fieldsByColumns, setfieldsByColumns, filteredEmployee,
    currentPage, setCurrentPage, employeePerPage, setTotalEmployeePerPage, employees, setEmployees, onChangeSearch, selectedOption, setSelectedOption,
    dataFilter, setDataFilter
   } = props

  return { columns, setColumns, fields, setFields, selectColumns, setSelectColumns, fieldsByColumns, setfieldsByColumns, filteredEmployee,
    currentPage, setCurrentPage, employeePerPage, setTotalEmployeePerPage, employees, setEmployees, onChangeSearch, selectedOption, setSelectedOption,
    dataFilter, setDataFilter
   }
}

export default connect(
    mapStateToProps,
  )(EmployeeList)
