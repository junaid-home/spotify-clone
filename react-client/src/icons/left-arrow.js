import React from 'react'

function LeftArrow({...props}) {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      height="30"
      width="30"
      viewBox="0 0 24 24"
      cursor="pointer"
      {...props}
    >
      <path
        d="M15.957 2.793a1 1 0 010 1.414L8.164 12l7.793 7.793a1 1 0 11-1.414 1.414L5.336 12l9.207-9.207a1 1 0 011.414 0z"
        fill="#999"
      ></path>
    </svg>
  )
}

export default LeftArrow
