import React from "react";
import Svg from "../Svg/Svg";
import { SvgProps } from "../Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 115 115" {...props}>
      <g clipPath="url(#clip0_1379_735)">
      <g filter="url(#filter0_d_1379_735)">
      <path d="M57.5 0C55.5911 0 53.7082 0.0908885 51.8513 0.272666V20.4889C53.6952 20.2032 55.5781 20.0604 57.5 20.0604C78.134 20.0604 94.9244 36.8488 94.9244 57.4935C94.9244 78.1252 78.134 94.9266 57.5 94.9266C36.866 94.9266 20.0757 78.1382 20.0757 57.4935H0C0 89.2006 25.7893 115 57.5 115C89.2107 115 115 89.2136 115 57.5065C115 25.7864 89.2107 0 57.5 0Z" fill="white"/>
      <path d="M57.5 0C55.5911 0 53.7082 0.0908885 51.8513 0.272666V20.4889C53.6952 20.2032 55.5781 20.0604 57.5 20.0604C78.134 20.0604 94.9244 36.8488 94.9244 57.4935C94.9244 78.1252 78.134 94.9266 57.5 94.9266C36.866 94.9266 20.0757 78.1382 20.0757 57.4935H0C0 89.2006 25.7893 115 57.5 115C89.2107 115 115 89.2136 115 57.5065C115 25.7864 89.2107 0 57.5 0Z" fill="url(#paint0_linear_1379_735)"/>
      </g>
      <g filter="url(#filter1_d_1379_735)">
      <path d="M21.6312 35.2547C26.3215 35.2547 30.1238 31.4528 30.1238 26.7631C30.1238 22.0733 26.3215 18.2715 21.6312 18.2715C16.9409 18.2715 13.1387 22.0733 13.1387 26.7631C13.1387 31.4528 16.9409 35.2547 21.6312 35.2547Z" fill="white"/>
      </g>
      </g>
      <defs>
      <filter id="filter0_d_1379_735" x="-4" y="0" width="123" height="123" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1379_735"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1379_735" result="shape"/>
      </filter>
      <filter id="filter1_d_1379_735" x="9.13867" y="18.2715" width="24.9844" height="24.9834" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1379_735"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1379_735" result="shape"/>
      </filter>
      <linearGradient id="paint0_linear_1379_735" x1="-7.5" y1="75.5" x2="122.5" y2="40.5" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FC466B"/>
      <stop offset="0.427083" stopColor="#3F5EFB"/>
      <stop offset="0.71875" stopColor="#3FCEFB"/>
      <stop offset="0.96875" stopColor="#7BFB3F"/>
      </linearGradient>
      <clipPath id="clip0_1379_735">
      <rect width="115" height="115" fill="white"/>
      </clipPath>
      </defs>
    </Svg>
  );
};

export default Icon;
