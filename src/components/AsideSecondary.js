// eslint-disable-next-line
/*eslint jsx-quotes: ["error", "prefer-double"]*/
/*
  This file is a part of Homework MERN
  Author: Angel Labrada Massó
 */

// ===============================================================
// Import Components
// ===============================================================
import React, { useState } from 'react'
import Select from "react-select"
import { Animated } from 'react-animated-css'
import { connect } from "react-redux"

// Filtered Column
const selectData = [
    // { label: "Employee", value: "employee", key: 0 },
    { label: "Role", value: "role", key: 0 },
    { label: "Status", value: "status", key: 1 }
  ]

const AsideSecondary = (props) => {

  // ===============================================================
  // Hooks useState
  // ===============================================================
  const [selectedOption, setSelectedOption] = useState("")
  const [selectedOptionHeader, setSelectedOptionHeader] = useState("Filter by:")
  const [isVisibleR, setIsVisibleR] = useState(false)
  const [isVisibleS, setIsVisibleS] = useState(false)
  const [realRole, setRealRole] = useState([])
  const [realStatus, setRealStatus] = useState([])

  // Deleting duplicate role using Filter
  const rolesFields = props.filteredEmployee.filter((arr1, pos) =>
    props.filteredEmployee.findIndex((arr2) => arr2.role === arr1.role) === pos)

    // Deleting duplicate status using Filter
    const statusFields = props.filteredEmployee.filter((arr1, pos) =>
      props.filteredEmployee.findIndex((arr2) => arr2.statusTask.value === arr1.statusTask.value) === pos)


  // ===============================================================
  // Select Column
  // ===============================================================
  const SelectColumn = selectedOption => {
    setSelectedOption(selectedOption)
    setSelectedOptionHeader(selectedOption.label)

    props.setVisibleEmployees(props.employees)
  }

  // ===============================================================
  // Handler Filter
  // ===============================================================
  const handlerFilter = (e, select) => {
    e.preventDefault()

    let tempRole = []
    for (let i = 0; i < rolesFields.length; i++) {
      tempRole.push({label: rolesFields[i].role, count: 0})
    }

    let tempStatus = []
    for (let i = 0; i < statusFields.length; i++) {
      tempStatus.push({label: statusFields[i].statusTask.value, count: 0, color: statusFields[i].statusTask.color})
    }

    if (selectedOption.value === 'role') {
      for (let i = 0; i < tempRole.length; i++) {
        for (let j = 0; j < props.filteredEmployee.length; j++) {
          if(tempRole[i].label === props.filteredEmployee[j].role) {
            tempRole[i].count += 1
          }
        }
      }
      setRealRole(tempRole)
      setIsVisibleR(true)
      setIsVisibleS(false)
    }
    else if (selectedOption.value === 'status') {
      for (let i = 0; i < tempStatus.length; i++) {
        for (let j = 0; j < props.filteredEmployee.length; j++) {
          if(tempStatus[i].label === props.filteredEmployee[j].statusTask.value) {
            tempStatus[i].count += 1
          }
        }
      }
      setRealStatus(tempStatus)
      setIsVisibleR(false)
      setIsVisibleS(true)
    }
  }


  // ===============================================================
  // Reset Filter
  // ===============================================================
  const resetFilter = e => {
    e.preventDefault()

    setSelectedOption("")
    setSelectedOptionHeader("Filter by:")
    setIsVisibleR(false)
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


  return (
    <div className="sidebar sidebar-left d-flex flex-row-auto flex-column " id="kt_sidebar">
      {/* begin::Aside Secondary Header */}
      <div className="sidebar-header flex-column-auto pt-5 pt-lg-19 pb-5 px-5 px-lg-10">
        <div className="d-flex">
          {/* begin::Desktop Search */}
          <div className="quick-search quick-search-inline flex-grow-1" id="kt_quick_search_inline">
            <div className="card-header border-0">
              <h3 className="card-title font-weight-bolder text-dark">{selectedOptionHeader}</h3>
            </div>
            {/* begin::Form */}
            <form method="get" className="quick-search-form">
              <div className="input-group rounded bg-light">

                <Select
                  className="react-select form-control h-40px"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={selectedOption}
                  onChange={SelectColumn}
                  options={selectData}
                />

                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="quick-search-close ki ki-close icon-sm text-muted" style={{ display: "none" }}></i>
                  </span>
                </div>
              </div>


              <Animated className="" animationIn="bounceInUp" animationOut="bounceInDown" animationInDuration={800} animationOutDuration={100} isVisible={isVisibleR}>
              <div className="card card-custom card-stretch card-shadowless gutter-b">
                {/* begin::Header */}
                <div className="card-header border-0 pt-5">
                  <div className="card-title font-weight-bolder">
                      <div className="card-label">

                      </div>
                  </div>
                  <div className="card-toolbar">
                  </div>
                </div>
                {/* end::Header */}

                {/* begin::Body */}
                <div className="card-body" style={{ position: "relative" }}>
                  <div className="mt-n4 position-relative zindex-0">

                    {selectedOption.value === "role"
                      ?
                        <>
                          {realRole.map((role, idx) => (
                            <div className="d-flex align-items-center mb-8 filtered-items" key={idx}>
                              {/*begin::Title*/}
                              <div style={{ width: "90%" }}>
                                  <a href="!" onClick={e => e.preventDefault()} className="font-size-h6 text-hover-primary font-weight-bolder">{role.label}</a>
                              </div>
                              <div style={{ width: "10%", textAlign: "right" }}>
                                  <a href="!" onClick={e => e.preventDefault()} className="font-size-h6 text-hover-primary font-weight-bolder">{role.count}</a>
                              </div>
                              {/*end::Title*/}
                            </div>
                          ))}
                        </>
                      : ""
                    }


                    {selectedOption.value === "status"
                      ?
                        <>
                          {realStatus.map((status, idx) => (
                            <div className="d-flex align-items-center mb-8 filtered-items" key={idx}>
                              {/*begin::Title*/}
                              <div style={{ width: "90%" }}>
                                  <div className={`bullet bullet-bar bg-${changeColor(status.color)} align-self-stretch`}>&nbsp;</div>&nbsp;&nbsp;<a href="!" onClick={e => e.preventDefault()} className="font-size-h6 text-hover-primary font-weight-bolder">{status.label}</a>
                              </div>
                              <div style={{ width: "10%", textAlign: "right" }}>
                                  <a href="!" onClick={e => e.preventDefault()} className="font-size-h6 text-hover-primary font-weight-bolder">{status.count}</a>
                              </div>
                              {/*end::Title*/}
                            </div>
                          ))}
                        </>
                      : ""
                    }

                  </div>
                </div>
                {/* end::Body */}

              </div>
              </Animated>

              <div style={{ display: "flex", width: "100%", paddingTop: "35px" }} >
                <div className="" style={{ display: "inline-block", width: "50%" }}>
                    <a href="!" className="btn btn-light-success font-weight-bolder font-size-sm" onClick={e => handlerFilter(e, selectedOption)}><em>Filter</em></a>
                </div>

                <div className="pr-10 text-right" style={{ display: "inline-block", width: "50%" }}>
                    <a href="!" className="btn btn-light font-weight-bolder font-size-sm" onClick={e => resetFilter(e)}><em>Clear</em></a>
                </div>
              </div>

            </form>
            {/* end::Form */}

            {/* begin::Search Toggle */}
            <div id="kt_quick_search_toggle" data-toggle="dropdown" data-offset="0px,1px"></div>
            {/* end::Search Toggle */}

            {/* begin::Dropdown */}

            {/* end::Dropdown */}
          </div>
          {/* end::Desktop Search */}

          {/* begin::Dropdown */}
          {/*<div className="dropdown dropdown-inline" data-toggle="tooltip" title="" data-placement="left" data-original-title="Quick actions">
            <a href="https://homeworkmern.com" className="btn btn-icon btn-light-info ml-3 h-40px w-40px flex-shrink-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="svg-icon svg-icon-lg">
                <div dangerouslySetInnerHTML={{ __html: quickActions }}  />
              </span>
            </a>
          </div>*/}
          {/* end::Dropdown */}


          {/* begin::Dropdown */}
          {/*<div className="dropdown dropdown-inline" data-toggle="tooltip" title="" data-placement="left" data-original-title="More links">
            <a href="https://homeworkmern.com" className="btn btn-icon btn-light-danger ml-3 h-40px w-40px flex-shrink-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="svg-icon svg-icon-lg">
                <div dangerouslySetInnerHTML={{ __html: moreLinks }}  />
              </span>
            </a>
          </div>*/}
          {/* end::Dropdown */}
          </div>
      </div>


      <div className="sidebar-content flex-column-fluid pb-10 pt-9 px-5 px-lg-10">
        {/* begin: Stats Widget 19 */}
        <div className="card card-custom bg-light-success card-shadowless gutter-b">
            {/* begin::Body */}
            {/*<div className="card-body my-3">
                <a href="https://keenthemes.com/metronic/preview/demo6/index.html#" className="card-title font-weight-bolder text-success text-hover-state-dark font-size-h6 mb-4 d-block">SAP UI Progress</a>

                <div className="font-weight-bold text-muted font-size-sm"><span className="text-dark-75 font-size-h2 font-weight-bolder mr-2">67%</span>Average</div>

                <div className="progress progress-xs mt-7 bg-success-o-60">
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: "67%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>*/}
            {/* end:: Body */}
        </div>
        {/* end: Stats:Widget 19 */}
      </div>

      {/* end::Aside Secondary Header */}
    </div>
  )
}

const mapStateToProps = (state, props) => {

  const {employees, setVisibleEmployees} = props

  return { employees, setVisibleEmployees }
}

export default connect(
    mapStateToProps,
  )(AsideSecondary)
