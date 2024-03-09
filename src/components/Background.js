import React from "react"
import { useRef, useEffect } from "react"
import "./Background.css"

const Background = () => {
  const dot = useRef(null)
  const windowWidth = useRef(window.innerWidth)
  const windowHeight = useRef(window.innerHeight)
  const requestRef = useRef(null)

  const onResizeHandler = () => {
    windowWidth.current = window.innerWidth
    windowHeight.current = window.innerHeight
  }

  const mouseMoveEvent = (e) => {
    const x = e.pageX - windowWidth.current / 2
    const y = e.pageY - windowHeight.current / 2
    // let's translate
    dot.current.style.transform = `translate(${x}px, ${y}px)`
  }
  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveEvent)
    document.addEventListener("resize", onResizeHandler)
    return () => {
      document.removeEventListener("mousemove", mouseMoveEvent)
      document.removeEventListener("resize", onResizeHandler)
      cancelAnimationFrame(requestRef.current)
    }
  }, [])

  return (
    <div className="Background gradient-bg">
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="gradients-container">
        {/* <div className='g1'></div>
        <div className='g2'></div>
        <div className='g3'></div> */}
        <div className="interactive " ref={dot}></div>
      </div>
    </div>
  )
}

export default Background
