import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="p-6 w-full space-y-2">
        <div className="text-3xl mb-4">Create Strategy</div>
        {children}
      </div>
    </div>
  )
}

export default layout
