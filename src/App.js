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
// import logo from './logo.svg'

// Loading statics data
import employeesLoad from './data/employees'

// Import styles
import './assets/css/style.bundle.css'
import './assets/css/personalized-style.css'
import './assets/fonts/flaticon2/flaticon.css'

// Personalized Components
import Content from './components/Content'

function App(props) {
  // ===============================================================
  // Hooks useState
  // ===============================================================
  const [search, setSearch] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [employeePerPage, setTotalEmployeePerPage] = useState(7)

  const [employees, setEmployees] = useState([])

  const [selectedOption, setSelectedOption] = useState("")

  // States of filter
  const [columns, setColumns] = useState([])
  const [fields, setFields] = useState([])
  const [selectColumns, setSelectColumns] = useState([])
  const [fieldsByColumns, setfieldsByColumns] = useState([])

  const [filterBy, setFilterBy] = useState([])
  const [filterTemp, setFilterTemp] = useState([])

  const [dataFilter, setDataFilter] = useState([])

  const [errors, setErrors] = useState([])


  // ===============================================================
  // Hooks useEffect
  // ===============================================================
  useEffect(() => {
    setEmployees(employeesLoad)

    // ===============================================================
    // Get fields by Column
    // ===============================================================
    if (selectedOption !== "" && selectedOption !== "Select a field") {

      let tempFields = []

      let column = selectedOption.label.toLowerCase()

      for (let i = 0; i < columns.length; i++) {
        for (let j = 0; j < employees.length; j++) {
          if (column === columns[i].label.toLowerCase()) {
            if (typeof employees[j][column] === 'string') {
              tempFields.push({name: employees[j][column], checked: false, fields: []})
            } else if (typeof employees[j][column] === 'object') {
              tempFields.push({name: employees[j][column].value, checked: false, fields: [], color: employees[j][column].color})
            }
          }

        }
      }


      // grouping
      var groupBy = (miarray, prop) => {
        	return miarray.reduce(function(groups, item) {

  				var val = item[prop];

  				let finded = []

  				for (var i = 0; i < filteredEmployee.length; i++) {
            if (typeof filteredEmployee[i][column] === 'string') {
              if (filteredEmployee[i][column] === item[prop]) {
    						finded.push({name: filteredEmployee[i].employee})
    					}
            } else if (typeof filteredEmployee[i][column] === 'object') {
              if (filteredEmployee[i][column].value === item[prop]) {
    						finded.push({name: filteredEmployee[i].employee})
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
      setDataFilter(result)
    }

  }, [search, selectedOption])


  // ===============================================================
  // Get current employees
  // ===============================================================
  const indexOfLastUser = currentPage * employeePerPage
  const indexOfFirstUser = indexOfLastUser - employeePerPage
  const currentEmployee = employees.slice(indexOfFirstUser, indexOfLastUser)

  // ===============================================================
  // Filtered Employee
  // ===============================================================
  let filteredEmployee = currentEmployee.filter((employee, idx) => {
    let dataEmployee = ""
    // filterBy.indexOf("natali trump")

    if (selectedOption !== "" && selectedOption !== "Select a field") {
      if (typeof employee[selectedOption.label.toLowerCase()] === 'string') {
        if (filterBy.length > 0) {
           // Create an array using `.split()` method
           let e = employee[selectedOption.label.toLowerCase()].toLowerCase().trim().split(",")
           return filterBy.filter((x, v) => {
              return (e.indexOf(x)) !== -1
           }).length === e.length
         } else {
           dataEmployee = employee.employee.toLowerCase() + " " + employee.role.toLowerCase() + " " + employee.status.value.toLowerCase()
           return dataEmployee.indexOf(search.toString().toLowerCase()) !== -1
         }
      } else if (typeof employee[selectedOption.label.toLowerCase()] === 'object') {
        if (filterBy.length > 0) {
           // Create an array using `.split()` method
           let e = employee[selectedOption.label.toLowerCase()]['value'].toLowerCase().trim().split(",")
           return filterBy.filter((x, v) => {
              return (e.indexOf(x)) !== -1
           }).length === e.length
         } else {
           dataEmployee = employee.employee.toLowerCase() + " " + employee.role.toLowerCase() + " " + employee.status.value.toLowerCase()
           return dataEmployee.indexOf(search.toString().toLowerCase()) !== -1
         }
      }
    }
    else {
      dataEmployee = employee.employee.toLowerCase() + " " + employee.role.toLowerCase() + " " + employee.status.value.toLowerCase()
      return dataEmployee.indexOf(search.toString().toLowerCase()) !== -1
    }

  })


  // ===============================================================
  // onChange status search
  // ===============================================================
  const onChangeSearch = e => {

    if (filterBy.length > 0) {
      setErrors({ cleanFilter: "Please, clean the filter..." })
    }

    setSearch(e.target.value)

  }


  return (
    <Fragment>
      {/* begin::Main */}

      <div className="d-flex flex-column flex-root">
    		{/* begin::Page */}
    		<div className="d-flex flex-row flex-column-fluid page">

          {/* begin::Wrapper */}
    			<div className="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">

            {/*begin::Content */}
    				<div className="content  d-flex flex-column flex-column-fluid" id="kt_content">
              {/* begin::Entry */}
              <div className="d-flex flex-column-fluid">
                {/* begin::Container */}
                <div className=" container ">
                  <Content
                    filteredEmployee={filteredEmployee}
                    columns={columns} setColumns={setColumns}
                    fields={fields} setFields={setFields}
                    selectColumns={selectColumns} setSelectColumns={setSelectColumns}
                    fieldsByColumns={fieldsByColumns} setfieldsByColumns={setfieldsByColumns}
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                    employeePerPage={employeePerPage} setTotalEmployeePerPage={setTotalEmployeePerPage}
                    employees={employees} setEmployees={setEmployees}
                    onChangeSearch={onChangeSearch}
                    selectedOption={selectedOption} setSelectedOption={setSelectedOption}
                    search={search} setSearch={setSearch}
                    filterBy={filterBy} setFilterBy={setFilterBy}
                    filterTemp={filterTemp} setFilterTemp={setFilterTemp}
                    dataFilter={dataFilter} setDataFilter={setDataFilter}
                    errors={errors} setErrors={setErrors}
                  />
                </div>
                {/* begin::Container */}
                </div>
              {/* end::Entry */}
            </div>
            {/* end::Content */}

          </div>
          {/* end::Wrapper */}

          {/* begin::Aside Secondary */}
          {/*<AsideSecondary search={search} setSearch={setSearch} filteredEmployee={filteredEmployee} employees={employees} setVisibleEmployees={setVisibleEmployees} />*/}
          {/* end::Aside Secondary */}

        </div>
        {/* end::Page */}
        {/* end::Main */}
      </div>
    </Fragment>
  )
}

export default App
