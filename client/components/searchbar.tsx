import React from "react"

export const SearchBar = () => {
  return (
    <div className="w-sm absolute top-3 right-1/4 -translate-x-1/2 z-400 bg-white rounded-md shadow-md">
      <input type="text" className="w-full p-2 border rounded-md" placeholder="Search..." />
    </div>
    
  )
}
