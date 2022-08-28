import React from 'react'

function ClockIcon({...props}) {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      height="16"
      width="16"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
        fill="#B3B3B3"
      ></path>
      <path
        d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"
        fill="#B3B3B3"
      ></path>
    </svg>
  )
}

export default ClockIcon