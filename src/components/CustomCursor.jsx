// CustomCursor.jsx
import React, { useState, useEffect } from "react";

const CustomCursor = ({ isActive }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isActive) {
    return null; // Hide the cursor when it's not active
  }

  return (
    <div
      style={{
        position: "fixed",
        top: cursorPosition.y,
        left: cursorPosition.x,
        width: "40px",
        height: "40px",
        backgroundColor: "rgb(215, 255, 125, 1)",
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
      }}
    />
  );
};

export default CustomCursor;
