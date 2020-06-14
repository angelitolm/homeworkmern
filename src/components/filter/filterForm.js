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
import { connect } from "react-redux"
import Select from "react-select"

const EmployeeList = ({props}) => {

  // ===============================================================
  // Hooks useState
  // ===============================================================
  const [filterTemp, setFilterTemp] = useState([])

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
    setFilterTemp(props.filterTemp)
    props.setColumns(tempCols)

    if(props.selectedOption !== "" && props.selectedOption !== "Select file") {

    }

    if (props.employees !== props.filteredEmployee){
      //     // ===============================================================
      //     // Get fields by Column
      //     // ===============================================================
          if (props.selectedOption !== "" && props.selectedOption !== "Select a field") {
            let tempFields = []

            let column = props.selectedOption.label.toLowerCase()

            for (let i = 0; i < props.columns.length; i++) {
              for (let j = 0; j < props.employees.length; j++) {
                if (column === props.columns[i].label.toLowerCase()) {
                  if (typeof props.employees[j][column] === 'string') {
                    tempFields.push({name: props.employees[j][column], checked: false, fields: []})
                  } else if (typeof props.employees[j][column] === 'object') {
                    tempFields.push({name: props.employees[j][column].value, checked: false, fields: [], color: props.employees[j][column].color})
                  }
                }

              }
            }


            // let column = select.label.toLowerCase()

            // grouping
            var groupBy = (miarray, prop) => {
              	return miarray.reduce(function(groups, item) {

        				var val = item[prop];

        				let finded = []

        				for (let i = 0; i < props.filteredEmployee.length; i++) {
                  if (typeof props.filteredEmployee[i][column] === 'string') {
                    if (props.filteredEmployee[i][column] === item[prop]) {
          						finded.push({name: props.filteredEmployee[i].employee})
          					}
                  } else if (typeof props.filteredEmployee[i][column] === 'object') {
                    if (props.filteredEmployee[i][column].value === item[prop]) {
          						finded.push({name: props.filteredEmployee[i].employee})
          					}
                  }

        				}

        				groups[val] = groups[val] || {name: item.name, checked: false, fields: finded, color: item.color,}
        				return groups;
        			}, {})
            }
            // get group
            let obj = groupBy(tempFields, 'name')
            // Converting Object to Array
            let result = Object.keys(obj).map((key) => {

              return obj[key]
            })
            props.setDataFilter(result)

          }

    }

  }, [props.filteredEmployee.length])


  // ===============================================================
  // Get fields by Column
  // ===============================================================
  const allFieldsByColumn = col => {

    let tempFields = []

    let column = col.label.toLowerCase()

    for (let i = 0; i < props.columns.length; i++) {
      for (let j = 0; j < props.employees.length; j++) {
        if (column === props.columns[i].label.toLowerCase()) {
          if (typeof props.employees[j][column] === 'string') {
            tempFields.push({name: props.employees[j][column], checked: false, fields: []})
          } else if (typeof props.employees[j][column] === 'object') {
            tempFields.push({name: props.employees[j][column].value, checked: false, fields: [], color: props.employees[j][column].color})
          }
        }

      }
    }

    // grouping
    var groupBy = function (miarray, prop) {
      	return miarray.reduce(function(groups, item) {

				var val = item[prop];

				let finded = []

				for (var i = 0; i < props.filteredEmployee.length; i++) {
          if (typeof props.filteredEmployee[i][column] === 'string') {
            if (props.filteredEmployee[i][column] === item[prop]) {
  						finded.push({name: props.filteredEmployee[i].employee})
  					}
          } else if (typeof props.filteredEmployee[i][column] === 'object') {
            if (props.filteredEmployee[i][column].value === item[prop]) {
  						finded.push({name: props.filteredEmployee[i].employee})
  					}
          }

				}

				groups[val] = groups[val] || {name: item.name, checked: false, fields: finded, color: item.color}
				return groups;
			}, {})
    }


    // get group
    let obj = groupBy(tempFields, 'name')
    // Converting Object to Array
    let result = Object.keys(obj).map((key) => {

      return obj[key]
    })
    props.setDataFilter(result)

  }

  // ===============================================================
  // handleSelect
  // ===============================================================
  const handleSelect = selectedOption => {
    props.setSelectedOption(selectedOption)

    props.setErrors([]) // clean errors

    allFieldsByColumn(selectedOption)

    props.setSearch("")
    document.getElementById("filter-table").value = ""

    props.setFilterTemp([])
    props.setFilterBy([])
  }

  // ===============================================================
  // handleSelectField
  // ===============================================================
  const handleSelectField = (pos, field) => {

    const updatedFields = [...props.dataFilter]

      updatedFields[pos]['checked'] = updatedFields[pos]['checked'] === true ? false : true

      const updateFilterBy = [...props.filterTemp]
      if (updatedFields[pos]['checked'] === true) {
        updateFilterBy[pos] = updatedFields[pos].name !== undefined ? updatedFields[pos].name : ""
        props.setFilterTemp([...updateFilterBy])
      } else {
        updateFilterBy[pos] = undefined
        props.setFilterTemp([...updateFilterBy])
      }



      const removeElem = (arr, item) => {
        let k = arr.indexOf(item)
        if (k !== -1) arr.splice(k, 1)
      }

      let goodArr = []

      for (var i = 0; i < updateFilterBy.length; i++) {
        if (updateFilterBy[i] === undefined) {
          removeElem(updateFilterBy, i)
          setFilterTemp(goodArr)
        } else {
          goodArr.push(updateFilterBy[i])
          setFilterTemp(goodArr)
        }
      }

      setFilterTemp([...goodArr])

      props.setDataFilter([...updatedFields])
  }


  // ===============================================================
  // handlerFilter
  // ===============================================================
  const handlerFilter = (e, select) => {
    e.preventDefault()

    if (props.dataFilter.length === 0) {
      props.setErrors({ emptyFields: "Please, select a field..." })
    } else {
      allFieldsByColumn(select)
      props.setFilterTemp(filterTemp)

      const updateFilterBy = [...props.filterTemp]

      const removeElem = (arr, item) => {
        let k = arr.indexOf(item)
        if (k !== -1) arr.splice(k, 1)
      }

      let goodArr = []

      for (var i = 0; i < updateFilterBy.length; i++) {
        if (updateFilterBy[i] === undefined) {
          removeElem(updateFilterBy, i)
          setFilterTemp(goodArr)
        } else {
          goodArr.push(updateFilterBy[i].toLowerCase().trim())
          setFilterTemp(goodArr)
        }
      }

      setFilterTemp([...goodArr])
      props.setFilterBy(goodArr)
    }
  }

  // ===============================================================
  // resetFilter
  // ===============================================================
  const resetFilter = () => {
    props.setSelectedOption("Select a field")
    props.setFields([])
    props.setDataFilter([])
    props.setSearch("")
    props.setErrors([]) // clean errors
  }

  // console.log("wcaaa", props.dataFilter);

  return (
    <Fragment>
      <div className="card card-custom card-stretch card-shadowless gutter-b">


        {/* begin::Body */}
        <div className="card-body pb-0" style={{  padding: "1.75rem 1.75rem 1.75rem 0"}}>
          <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
            <Select
              // className="h-40px"
              // classNamePrefix=""
              // name="form-field-name"
              value={props.selectedOption}
              onChange={handleSelect}
              options={props.columns}
              placeholder="Select a field"
            />
          </span>

          {props.errors.emptyFields
            ?
            <span className="label label-lg label-light-danger label-inline" style={props.errors.length !== 0 ? {visibility: "visible"} : {visibility: "hidden" }}>
              {props.errors.emptyFields}
            </span>
            : ""
          }
          {props.errors.cleanFilter
            ?
            <span className="label label-lg label-light-warning label-inline" style={props.errors.length !== 0 ? {visibility: "visible"} : {visibility: "hidden" }}>
              {props.errors.cleanFilter}
            </span>
            : ""
          }
          {/* begin::List */}
          <ul className="filter-list">
             {props.dataFilter.map((field, idx) =>
                <div key={idx} onClick={e => {
                   e.preventDefault()
                   handleSelectField(idx, field.name)
                 }} >
                   <li className={field.checked === true ? "select-check" : ""} style={{ with: "100%" }} >
                     <div className={`col-text ${field.color !== undefined ? field.color : ""}`}>
                       <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                           {field.name}
                       </span>
                     </div>

                     <div className="col-amount">
                       <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                           {field.fields.length}
                       </span>
                     </div>
                   </li>
               </div>
             )}
           </ul>
          {/* end::List */}

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

  const { columns, setColumns, fields, setFields, selectColumns, setSelectColumns, fieldsByColumns, setfieldsByColumns, filteredEmployee,
    currentPage, setCurrentPage, employeePerPage, setTotalEmployeePerPage, employees, setEmployees, onChangeSearch, selectedOption, setSelectedOption,
    search, setSearch, filterBy, setFilterBy, filterTemp, setFilterTemp, dataFilter, setDataFilter, errors, setErrors
   } = props

  return { columns, setColumns, fields, setFields, selectColumns, setSelectColumns, fieldsByColumns, setfieldsByColumns, filteredEmployee,
    currentPage, setCurrentPage, employeePerPage, setTotalEmployeePerPage, employees, setEmployees, onChangeSearch, selectedOption, setSelectedOption,
    search, setSearch, filterBy, setFilterBy, filterTemp, setFilterTemp, dataFilter, setDataFilter, errors, setErrors
   }
}

export default connect(
    mapStateToProps,
  )(EmployeeList)
