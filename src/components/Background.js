import React from "react";
import { useRef, useEffect } from "react";
import "./Background.css";

const Background = () => {
  const dot = useRef(null);
  const endX = useRef(window.innerWidth / 2);
  const endY = useRef(window.innerHeight / 2);

  const requestRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveEvent);

    return () => {
      document.removeEventListener("mousemove", mouseMoveEvent);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const mouseMoveEvent = (e) => {
    endX.current = e.pageX;
    endY.current = e.pageY;

    console.log(e.pageX, e.pageY, endY.current, endX.current);

    dot.current.style.top = endY.current + "px";
    dot.current.style.left = endX.current + "px";
  };

  return (
    <div className="gradient-bg">
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
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="interactive" ref={dot}></div>
      </div>
    </div>
  );
};

export default Background;
