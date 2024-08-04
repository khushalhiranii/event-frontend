import React from 'react'

function DefaultButton({title, onClick}) {
  return (
    <div className='default'>
        <button onClick={onClick}>{title}</button>
    </div>
  )
}

export default DefaultButton