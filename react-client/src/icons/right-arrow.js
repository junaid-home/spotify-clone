import React from 'react'

function RightArrow({...props}) {
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
        d="M8.043 2.793a1 1 0 000 1.414L15.836 12l-7.793 7.793a1 1 0 101.414 1.414L18.664 12 9.457 2.793a1 1 0 00-1.414 0z"
        fill="#999"
      ></path>
    </svg>
  )
}

export default RightArrow
