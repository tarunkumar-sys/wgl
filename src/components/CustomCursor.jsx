// CustomCursor.jsx
import React, { useState, useEffect } from "react";

const CustomCursor = ({ isActive }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      // Check if the element or its parents have the 'no-cursor' class
      const isOverNoCursor = e.target.closest(".no-cursor");
      setShowCursor(!isOverNoCursor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isActive || !showCursor) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: cursorPosition.y,
        left: cursorPosition.x,
        width: "40px",
        height: "40px",
        backgroundColor: "rgba(215, 255, 125, 1)",
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
      }}
    />
  );
};

export default CustomCursor;
