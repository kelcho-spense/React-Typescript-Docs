import { useState, useEffect } from 'react'

export default function State() {

  const [renderCount, setRenderCount] = useState(0)

  useEffect(() => {
    setRenderCount((prev) => prev + 1)
    console.log(renderCount, 'State')
  })

  return (
    <div>StateCount: {renderCount}</div>
  )
}

