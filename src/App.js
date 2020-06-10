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
// import logo from './logo.svg'

// Loading statics data
// import employeesLoad from './data/employees'

// Import styles
import './assets/css/style.bundle.css'
import './assets/css/personalized-style.css'

// Personalized Components
import HeaderMovile from './components/HeaderMobile'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import AsideSecondary from './components/AsideSecondary'

function App(props) {
  // ===============================================================
  // Hooks useState
  // ===============================================================
  const [search, setSearch] = useState("")
  const [employees, setVisibleEmployees] = useState([])

  // ===============================================================
  // Filtered Employee
  // ===============================================================
  const filteredEmployee = employees.filter(employee => {
      let dataEmployee = employee.name.toLowerCase() + " " + employee.role.toLowerCase() + " " + employee.statusTask.value.toLowerCase() + " " + employee.skills.toLowerCase()
      return dataEmployee.indexOf(search.toString().toLowerCase()) !== -1
  })

  // ===============================================================
  // onChange status search
  // ===============================================================
  const onChangeSearch = e => {
    setSearch(e.target.value)
    // props.props.setVisibleEmployees([...filteredEmployee])
    console.log("aaaaaa", filteredEmployee);
  }

  return (
    <Fragment>
      {/* begin::Main */}
      {/* begin::HeaderMovile */}
      <HeaderMovile />
      {/* end::HeaderMovile */}

      <div className="d-flex flex-column flex-root">
    		{/* begin::Page */}
    		<div className="d-flex flex-row flex-column-fluid page">

          {/* begin::Sidebar */}
          <Sidebar />
          {/* end::Sidebar */}

          {/* begin::Wrapper */}
    			<div className="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
            {/* begin::Header */}
            <Header />
            {/* end::Header */}

            {/*begin::Content */}
    				<div className="content  d-flex flex-column flex-column-fluid" id="kt_content">
              {/* begin::Entry */}
              <div className="d-flex flex-column-fluid">
                {/* begin::Container */}
                <div className=" container ">
                  <Content search={search} setSearch={setSearch} filteredEmployee={filteredEmployee} employees={employees} setVisibleEmployees={setVisibleEmployees} />
                </div>
                {/* begin::Container */}
                </div>
              {/* end::Entry */}
            </div>
            {/* end::Content */}


          {/* begin::Footer */}
          <Footer />
          {/* end::Footer */}

          </div>
          {/* end::Wrapper */}

          {/* begin::Aside Secondary */}
          <AsideSecondary search={search} setSearch={setSearch} filteredEmployee={filteredEmployee} employees={employees} setVisibleEmployees={setVisibleEmployees} />
          {/* end::Aside Secondary */}

        </div>
        {/* end::Page */}
        {/* end::Main */}
      </div>
    </Fragment>
  )
}

export default App;
