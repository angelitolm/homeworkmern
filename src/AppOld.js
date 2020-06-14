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

  const [employees, setVisibleEmployees] = useState([])
  const [tempEmployees, setTempEmployees] = useState([])

  const [selectedOption, setSelectedOption] = useState("")

  const [tempF, setTempF] = useState([])
  const [realFields, setRealFields] = useState([])

  // ===============================================================
  // Filtered Employee
  // ===============================================================
  const filteredEmployee = employees.filter((employee, idx) => {

      let dataEmployee = employee.employee.toLowerCase() + " " + employee.role.toLowerCase() + " " + employee.status.value.toLowerCase() + " " + employee.skills.toLowerCase()

      return dataEmployee.indexOf(search.toString().toLowerCase()) !== -1
  })



  // ===============================================================
  // Hooks useEffect
  // ===============================================================
  useEffect(() => {
    setVisibleEmployees(employeesLoad)
  }, [])


  // ===============================================================
  // Get current employees
  // ===============================================================
  const indexOfLastUser = currentPage * employeePerPage
  const indexOfFirstUser = indexOfLastUser - employeePerPage
  const currentEmployee = employees.slice(indexOfFirstUser, indexOfLastUser)


  // ===============================================================
  // Sort Fields
  // ===============================================================
  const sortFields = select => {

    let col = select.label.toLowerCase()

    let tempField = []
    for (let e = 0; e < realFields.length; e++) {

      if (typeof filteredEmployee[e][col] === 'string') {
        tempField.push({label: filteredEmployee[e][col], count: 0})
        setTempF(tempField)
      } else if (typeof filteredEmployee[e][col] === 'object') {
        tempField.push({label: filteredEmployee[e][col]['value'], count: 0})
        setTempF(tempField)
      }
    }

    for (let i = 0; i < tempField.length; i++) {
      for (let j = 0; j < filteredEmployee.length; j++) {
        if (typeof filteredEmployee[j][col] === 'string') {
          if(realFields[i].label === filteredEmployee[j][col]) {
            realFields[i].count += 1
            setRealFields(realFields)
          } else {
            if (realFields[i].count > 0) {
              realFields[i].count -= 1
              setRealFields(realFields)
            } else {
              realFields[i].count += 1
              setRealFields(realFields)
            }
          }
        } else if (typeof filteredEmployee[j][col] === 'object') {
          if(realFields[i].label === filteredEmployee[j][col]['value']) {
            realFields[i].count += 1
            setRealFields(realFields)
          } else {
            if (realFields[i].count > 0) {
              realFields[i].count -= 1
              setRealFields(realFields)
            } else {
              realFields[i].count += 1
              setRealFields(realFields)
            }
          }
        }
      }
    }

    setRealFields(realFields)
    // setVisibleEmployees(filteredEmployee)
  }



  // ===============================================================
  // onChange status search
  // ===============================================================
  const onChangeSearch = e => {

    setSearch(e.target.value)

    // if (selectedOption !== "" && e.target.value !== "") {
    //   // Deleting duplicate field using Filter
    //   const sortByColumn = column => {
    //
    //     const fields = filteredEmployee.filter((arr1, pos) =>
    //       {
    //         let col = column.toLowerCase()
    //
    //         if (typeof arr1[col] === 'string') {
    //           return (filteredEmployee.findIndex((arr2) => arr2[col] === arr1[col]) === pos)
    //         } else if (typeof arr1[col] === 'object') {
    //           return (filteredEmployee.findIndex((arr2) => arr2[col]['value'] === arr1[col]['value']) === pos)
    //         }
    //       }
    //     )
    //
    //     let tempField = []
    //     let col = column.toLowerCase()
    //
    //     for (let e = 0; e < fields.length; e++) {
    //       if (typeof fields[e][col] === 'string') {
    //         tempField.push({label: fields[e][col], count: 0})
    //         setRealFields(tempField)
    //       } else if (typeof fields[e][col] === 'object') {
    //         tempField.push({label: fields[e][col]['value'], count: 0})
    //         setRealFields(tempField)
    //       }
    //     }
    //
    //     setRealFields(tempField)
    //
    //     for (let i = 0; i < tempField.length; i++) {
    //       for (let j = 0; j < filteredEmployee.length; j++) {
    //         if (typeof filteredEmployee[j][col] === 'string' && realFields.length > 0) {
    //           if(realFields[i].label === filteredEmployee[j][col]) {
    //             realFields[i].count += 1
    //             setRealFields(realFields)
    //           } else {
    //             if (realFields[i].count > 0) {
    //               realFields[i].count -= 1
    //               setRealFields(realFields)
    //             } else {
    //               realFields[i].count += 1
    //               setRealFields(realFields)
    //             }
    //           }
    //         } else if (typeof filteredEmployee[j][col] === 'object' && realFields.length > 0) {
    //           if(realFields[i].label === filteredEmployee[j][col]['value']) {
    //             realFields[i].count += 1
    //             setRealFields(realFields)
    //           } else {
    //             if (realFields[i].count > 0) {
    //               realFields[i].count -= 1
    //               setRealFields(realFields)
    //             } else {
    //               realFields[i].count += 1
    //               setRealFields(realFields)
    //             }
    //           }
    //         }
    //       }
    //     }
    //
    //     setTempEmployees(filteredEmployee)
    //     console.log("empleados visibles", tempEmployees);
    //
    //   }
    //
    //   sortByColumn(selectedOption.label)
    // }


    // if (selectedOption !== "" && e.target.value !== "") {
    //
    //   console.log("asasasasa",filteredEmployee);
    //
    //   // sortFields(selectedOption)
    //   // setRealFields(realFields)
    // }

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
                  search={search} setSearch={setSearch}
                  onChangeSearch={onChangeSearch}
                  filteredEmployee={filteredEmployee}
                  tempEmployees={tempEmployees} setTempEmployees={setTempEmployees}
                  employees={employees} setVisibleEmployees={setVisibleEmployees}
                  realFields={realFields} setRealFields={setRealFields}
                  tempF={tempF} setTempF={setTempF}
                  selectedOption={selectedOption} setSelectedOption={setSelectedOption}
                  sortFields={sortFields}
                  currentEmployee={currentEmployee}
                  currentPage={currentPage} setCurrentPage={setCurrentPage}
                  employeePerPage={employeePerPage} setTotalEmployeePerPage={setTotalEmployeePerPage}
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
