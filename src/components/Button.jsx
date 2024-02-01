import React from 'react'

function Button( {
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    clasName = "",
    ...props
    } )  {
  return (
    <button className={`px-4 py-2 rounded-lg ${textColor} 
    ${textColor} ${clasName}`}>
        {children}
    </button>
  )
}

export default Button