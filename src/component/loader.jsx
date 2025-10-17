import React from "react";
import styled, { keyframes } from "styled-components";
import carpng from "../assets/carpng.jpeg";
// Full-screen overlay
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Stroke line drawing
const draw = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

// Fill fade-in
const fillIn = keyframes`
  from { fill: transparent; opacity: 0; }
  to { fill: #edff29ff; opacity: 1; }
`;

// Car move animation (right to left with pause at middle)
const moveCar = keyframes`
  0% { transform: translateX(-100px); }   /* start from left */
  45% { transform: translateX(250px); }   /* reach middle */
  55% { transform: translateX(250px); }   /* pause */
  100% { transform: translateX(500px); }  /* move to right */
`;

const SvgText = styled.svg`
  width: 90vw;
  max-width: 880px;
  height: auto;
  max-height: 180px;

  @media (max-width: 768px) {
    max-height: 140px;
  }
  @media (max-width: 480px) {
    max-height: 115px;
  }
  @media (max-width: 320px) {
    max-height: 100px;
  }
`;

const StrokeText = styled.text`
  font-size: 75px;
  font-weight: 900;
  letter-spacing: 15px;
  font-family: Arial, Helvetica, sans-serif;

  stroke: #edff29ff;
  stroke-width: 3;
  stroke-linejoin: round;
  stroke-linecap: round;
  fill: transparent;

  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: ${draw} 3.5s ease forwards;
`;

const FillText = styled.text`
  font-size: 75px;
  font-weight: 900;
  letter-spacing: 15px;
  font-family: Arial, Helvetica, sans-serif;

  fill: #edff29ff;
  opacity: 0;
  animation: ${fillIn} 0.8s ease forwards;
  animation-delay: 1.5s;
`;

// Car image styled
const Car = styled.image`
  width: 200px;
  height: auto;
 
  animation: ${moveCar} 3s linear infinite;
  transform-origin: left;

  @media (max-width: 480px) {
    width: 300px;
  }
`;

export default function Loader() {
  return (
    <Overlay>
      <SvgText viewBox="0 0 500 200" preserveAspectRatio="xMidYMid meet">
        {/* Car moving right to left */}
        <Car href={carpng} x="0" y="20" />

        {/* Fill Layer */}
        <FillText x="50%" y="60%" textAnchor="middle" dominantBaseline="middle">
          CabPlus
        </FillText>

        {/* Stroke Layer */}
        <StrokeText
          x="50%"
          y="60%"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          CabPlus
        </StrokeText>
      </SvgText>
    </Overlay>
  );
}