import { useRef, useEffect } from 'react'

export default function Ref() {
    const renderCount = useRef(0)

    useEffect(() => {
        renderCount.current = renderCount.current + 1
        console.log(renderCount, 'Ref')
    })


    return (
        <div>RefCount: {renderCount.current}</div>
    )
}
