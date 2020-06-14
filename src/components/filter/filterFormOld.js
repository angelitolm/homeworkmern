// eslint-disable-next-line
/*eslint jsx-quotes: ["error", "prefer-double"]*/
/*
  This file is a part of Homework MERN
  Author: Angel Labrada Massó
 */

// ===============================================================
// Import Components
// ===============================================================
import React, { Fragment, useState, useEffect } from 'react'
import { Animated } from 'react-animated-css'
import { connect } from "react-redux"
import Select from "react-select"

// Loading statics data
import employees from '../../data/employees'

// Images
const iconSearch = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path><path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fill-rule="nonzero"></path></g></svg>'

const EmployeeList = ({props}) => {

  // ===============================================================
  // Hooks useState
  // ===============================================================
  const [cols, setCols] = useState([])
  const [fieldsByCols, setfieldsByCols] = useState([])

  // const [filterType, setFilterType] = useState('contains')
  // const [filterValue, setFilterValue] = useState('')
  // const [newState, setNewState] = useState({})
  //
  // // ===============================================================
  // // Change Filter Type
  // // ===============================================================
  // const changeFilterType = (event, index, filterType) => {
  //   // Update local state
  //   setNewState(...filterType)
  //   // Fire the callback to alert React-Table of the new filter
  //   props.onChange(newState)
  // }
  //
  // const changeFilterValue = (event, filterValue) => {
  //   // Update local state
  //   setNewState(...filterValue)
  //   // Fire the callback to alert React-Table of the new filter
  //   props.onChange(newState)
  // }

  // ===============================================================
  // Hooks useEffect
  // ===============================================================
  useEffect(() => {

    // get cols from employee table
    let getCols = document.querySelectorAll("#kt_advance_table_widget_1>thead>tr>th")

    // setting cols
    let tempCols = []
    for (let i = 0; i < getCols.length; i++) {
      tempCols.push({ label: getCols[i].innerText, value: `col_${i}`, key: i })
    }
    setCols(tempCols)

    sortByColumn(props.selectedOption)
    props.setVisibleEmployees(props.employees)

    props.setTempEmployees(props.filteredEmployee)
  }, [])

  // Deleting duplicate field using Filter
  const sortByColumn = column => {

    const fields = props.filteredEmployee.filter((arr1, pos) =>
      {
        let col = column.toLowerCase()

        if (typeof arr1[col] === 'string') {
          return (props.filteredEmployee.findIndex((arr2) => arr2[col] === arr1[col]) === pos)
        } else if (typeof arr1[col] === 'object') {
          return (props.filteredEmployee.findIndex((arr2) => arr2[col]['value'] === arr1[col]['value']) === pos)
        }
      }
    )

    let tempField = []
    let col = column.toLowerCase()

    for (let e = 0; e < fields.length; e++) {
      if (typeof fields[e][col] === 'string') {
        tempField.push({label: fields[e][col], count: 0})
        props.setRealFields(tempField)
      } else if (typeof fields[e][col] === 'object') {
        tempField.push({label: fields[e][col]['value'], count: 0})
        props.setRealFields(tempField)
      }
    }

    props.setRealFields(tempField)

    for (let i = 0; i < tempField.length; i++) {
      for (let j = 0; j < props.filteredEmployee.length; j++) {
        if (typeof props.filteredEmployee[j][col] === 'string') {
          if(tempField[i].label === props.filteredEmployee[j][col]) {
            // tempField[i].count += 1
            // props.setRealFields(tempField)
          }
        } else if (typeof props.filteredEmployee[j][col] === 'object') {
          if(tempField[i].label === props.filteredEmployee[j][col]['value']) {
            // tempField[i].count += 1
            // props.setRealFields(tempField)
          }
        }
      }
    }

    props.setTempEmployees(props.filteredEmployee)
    console.log("empleados visibles", props.tempEmployees);

  }


  // ===============================================================
  // onChange status search
  // ===============================================================
  const onChangeSearch = e => {
    props.setSearch(e.target.value)
  }

  // ===============================================================
  // Change color
  // ===============================================================
  const changeColor = color => {
    if (color === "yellow") return "warning"
    else if (color === "blue") return "info"
    else if (color === "green") return "success"
    else if (color === "gray") return "dark"
  }



  // ===============================================================
  // handleSelect
  // ===============================================================
  const handleSelect = selectedOption => {
    props.setSelectedOption(selectedOption)

    sortByColumn(selectedOption.label)
  }

  // ===============================================================
  // Handler Filter
  // ===============================================================
  const handlerFilter = (e, select) => {
    e.preventDefault()

    // if (props.selectedOption.length > 0)
    //   props.sortFields(props.selectedOption) //sorting fields

    props.sortFields(props.selectedOption)
    props.setRealFields(props.realFields)
  }


  // ===============================================================
  // Reset Filter
  // ===============================================================
  const resetFilter = e => {
    e.preventDefault()

    props.setSelectedOption("Select a field")
    props.setRealFields([])
  }


  return (
    <Fragment>
      <div className="card card-custom card-stretch card-shadowless gutter-b">


        {/* begin::Body */}
        <div className="card-body pb-0" style={{  padding: "1.75rem 1.75rem 1.75rem 0"}}>
          <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
            <Select
              className="h-40px"
              classNamePrefix=""
              name="form-field-name"
              value={props.selectedOption}
              onChange={handleSelect}
              options={cols}
              placeholder="Select a field"
            />
          </span>
            {/* begin::Table */}
            <div className="table-responsive" style={{ minHeight: "200px" }}>
                <table className="table table-head-custom table-vertical-center" id="kt_advance_table_widget_2">
                  <thead style={{ padding: "5px", minHeigth: "150px" }}>
                      <tr className="text-left" style={{ padding: "5px" }}>


                      </tr>
                  </thead>
                  <tbody>
                       {props.realFields.map((field, idx) => (
                         <tr key={idx}>
                             <td>
                               <div className="col-text">
                                 <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                     {field.label}
                                 </span>
                               </div>

                               <div className="col-count">
                                 <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                     {field.count}
                                 </span>
                               </div>
                             </td>
                         </tr>

                       ))}
                     </tbody>
                </table>
            </div>
            {/* end::Table */}

            <div className="btn-filter">
              <div style={{ display: "inline-block", width: "50%" }}>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg" onClick={e => handlerFilter(e, props.selectedOption)}>
                    <em style={{ cursor: "pointer" }}>filter</em>
                </span>
              </div>

              <div style={{ display: "inline-block", width: "50%", textAlign: "right" }}>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg" onClick={e => resetFilter(e)}>
                    <em style={{ cursor: "pointer" }}>clean</em>
                </span>
              </div>
            </div>

        </div>
        {/* end::Body */}
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state, props) => {
  // const search = state.search

  const {employees, setVisibleEmployees, search, setSearch,
    currentEmployee, currentPage, setCurrentPage, employeePerPage, setTotalEmployeePerPage,
    filteredEmployee, selectedOption, setSelectedOption, sortFields, realFields, setRealFields } = props

  return { employees, setVisibleEmployees, search, setSearch,
    currentEmployee, currentPage, setCurrentPage, employeePerPage, setTotalEmployeePerPage,
    filteredEmployee, selectedOption, setSelectedOption, sortFields, realFields, setRealFields }
}

export default connect(
    mapStateToProps,
  )(EmployeeList)
