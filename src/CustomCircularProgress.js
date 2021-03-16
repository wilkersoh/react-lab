import React, { useEffect, useState, useRef } from "react";

import "./styles/CustomCircularProgress.css";

export default function CustomCircularProgress(props) {
  const [offset, setOffset] = useState(0);
  const circleRef = useRef(null);

  const {
    size = 200,
    progress = 70,
    strokeWidth = 8,
    circleOneStroke = "#7ea9e1",
    circleTwoStroke = "#c73713",
  } = props;

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);

    // circleRef.current.style =
    //   "transition: stroke-dashoffset 850ms ease-in-out;";
  }, [setOffset, circumference, progress, offset]);

  return (
    <>
      <svg className='svg' width={size} height={size}>
        <circle
          className='svg-circle-bg'
          stroke={circleOneStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className='svg-circle'
          ref={circleRef}
          stroke={circleTwoStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform='rotate(-90, 100, 100)' // change start from 12 o'clock
        />
        <text className='svg-circle-text' x={center} y={center}>
          {progress}%
        </text>
      </svg>
    </>
  );
}
