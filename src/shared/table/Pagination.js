import React from 'react'

const Pagination = ({curPageNo, totalPages, previousLabel, nextLabel, onPageChange}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <button type="button" className="btn btn-primary" onClick={() => onPageChange("prev")}>{previousLabel}</button>
      <div className='my-auto mx-3'>{curPageNo}/{totalPages}</div>
      <button type="button" className="btn btn-primary" onClick={() => onPageChange("next")}>{nextLabel}</button>
    </div>
  )
}

export default Pagination 
