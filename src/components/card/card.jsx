import React from "react";
import cardStyles from "./card.module.css";

export default function Card({ children, className = "", style }) {
  return (
    <div style={style} className={`${className.concat(' ', `${cardStyles.container} w-full flex`)}`}>
      {children}
    </div>
  );
}
