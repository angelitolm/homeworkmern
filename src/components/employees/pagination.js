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

const Pagination = ({ employeePerPage, totalEmployee, paginate, currentPage, increaseEmployeePerPage }) => {
  const [newEmployeePerPage, setTotalEmployeePerPage] = useState(employeePerPage)

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalEmployee / newEmployeePerPage); i++) {
    pageNumbers.push(i);
  }

let link = document.querySelector('.lastlink')
  const deshabilitar = () => {
    link.setAttribute("disabled", true)
}

// Increase employees per page
const increaseEmployees = e => setTotalEmployeePerPage(e.target.value)

  return (
    <div className="row">
      <div className="col-md-12" style={{ marginBottom: "35px" }}>
        <div className="card card-custom card-stretch card-shadowless gutter-b">
          <div className="card-body pb-0" style={{  padding: "0 0 0 1.75rem"}}>
             <div className="kt-pagination kt-pagination--brand">
               <ul className="kt-pagination__links">
                 <li className="kt-pagination__link--first">
                   <a href="!#" onClick={(e) => {
                       e.preventDefault()
                         paginate(pageNumbers[0])
                       }
                     }><i className="flaticon2-fast-back kt-font-brand"></i></a>
                 </li>
                 <li className="kt-pagination__link--next">
                   <a href="!#" onClick={(e) => {
                       e.preventDefault()
                       if (currentPage > 4) {
                         // document.querySelector(".li-last-link-visible ").style = "display: block"
                         document.querySelector(".last-link-visible ").innerText = currentPage - 1
                       }

                       if((currentPage-1) <= 0)
                         return deshabilitar()

                         paginate(currentPage - 1)
                       }
                     }><i className="flaticon2-back kt-font-brand"></i></a>
                 </li>
                 {pageNumbers.map((number, i) => (
                   <div key={i}>
                     {
                       number < 5
                       ?
                         <li key={number} >
                           <a onClick={(e) => {
                               e.preventDefault()
                                 paginate(number)
                               }
                             }
                             href="!#" className={number === parseInt(currentPage) ? "kt-pagination__link--active" : ""}>
                             {number}
                           </a>
                         </li>
                       :
                         ""
                     }
                   </div>
                  ))}

                 <li className="kt-pagination__link--prev lastlink">
                   <a href="!#" onClick={(e) => {
                         e.preventDefault()

                         if (currentPage > 4) {
                           document.querySelector(".li-last-link-visible ").style = "display: block"
                           document.querySelector(".last-link-visible ").className = "last-link-visible kt-pagination__link--active"
                           document.querySelector(".last-link-visible ").innerText = currentPage
                         }

                         if((currentPage) > pageNumbers.length - 1) {
                           deshabilitar()
                           return paginate(currentPage)
                         }


                         if((currentPage+1) > parseInt(totalEmployee / employeePerPage)+1)
                           return deshabilitar()

                         return paginate(currentPage + 1)
                       }
                     }><i className="flaticon2-next kt-font-brand"></i></a>
                 </li>
                 <li className="kt-pagination__link--last">
                   <a href="!#" onClick={(e) => {
                         e.preventDefault()

                         if (currentPage > 4) {
                           document.querySelector(".li-last-link-visible ").style = "display: block"
                           document.querySelector(".last-link-visible ").innerText = currentPage
                         }

                         paginate(pageNumbers.length)
                       }
                     }><i className="flaticon2-fast-next kt-font-brand"></i></a>
                 </li>
               </ul>
               <div className="kt-pagination__toolbar">
                 <select className="form-control kt-font-brand" style={{ width: "60px", height: "24px"}} onClick={(e) => {increaseEmployeePerPage(e); increaseEmployees(e) }} >
                 <option value="7">7</option>
                 <option value="20">20</option>
                 <option value="30">30</option>
                 <option value="50">50</option>
                 <option value="100">100</option>
                 </select>
                 <span className="pagination__desc">
                   Mostrando {employeePerPage} de {totalEmployee} registros
                 </span>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
  )
}

export default Pagination
