import React from 'react'
import './EmptyCard.css'

const EmptyCard = ({msg}) => {
  return (
    <div className='no-list-card'>
        <p>{msg}</p>
    </div>
  )
}

export default EmptyCard
