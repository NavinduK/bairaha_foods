import React from 'react'

const Alert = ({ children }: any) => {
  return (
    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
      {children}
    </div>
  )
}

export default Alert
