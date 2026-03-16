import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function NeonCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    document.body.style.cursor = "none";

    const onMove  = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onDown  = () => setIsClicking(true);
    const onUp    = () => setIsClicking(false);
    const onLeave = () => setPos({ x: -100, y: -100 });
    const onEnter = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onOver  = (e) => {
      if (e.target?.matches?.('a, button, input, [data-hover="true"]')) setIsHovering(true);
    };
    const onOut = () => setIsHovering(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  const containerStyle = {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 2000,
  };

  // Plus shape — two thin rectangles centered on the cursor
  const plusXY   = { x: pos.x - 10, y: pos.y - 10 };
  const trailXY  = { x: pos.x - 20, y: pos.y - 20 };
  const glowXY   = { x: pos.x - 35, y: pos.y - 35 };

  const plusSize = isHovering ? 22 : isClicking ? 14 : 18;

  return (
    <div style={containerStyle} aria-hidden="true">

      {/* Glow layer */}
      <motion.div
        style={{
          position: "absolute",
          width: 70,
          height: 70,
          borderRadius: 9999,
          background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent 65%)",
          filter: "blur(6px)",
          top: 0,
          left: 0,
        }}
        animate={{
          ...glowXY,
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ type: "spring", damping: 60, stiffness: 120, mass: 1.2 }}
      />

      {/* Trail ring */}
      <motion.div
        style={{
          position: "absolute",
          width: 40,
          height: 40,
          borderRadius: 9999,
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "rgb(255, 255, 255)",
          background: "transparent",
          top: 0,
          left: 0,
        }}
        animate={{
          ...trailXY,
          scale: isHovering ? 1.5 : 1,
          borderWidth: isHovering ? "3px" : "2px",
          opacity: isHovering ? 0.9 : 0.6,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 180, mass: 1 }}
      />

      {/* Plus / crosshair */}
      <motion.div
        style={{
          position: "absolute",
          width: 20,
          height: 20,
          top: 0,
          left: 0,
        }}
        animate={{ ...plusXY, scale: isClicking ? 0.75 : 1 }}
        transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.4 }}
      >
        {/* Horizontal bar */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: plusSize,
          height: 2,
          marginTop: -1,
          background: "rgb(0, 0, 0)",
          boxShadow: "0 0 6px rgba(255,255,255,0.8)",
          borderRadius: 2,
          transition: "width 0.15s ease",
        }} />
        {/* Vertical bar */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: 0,
          width: 2,
          height: plusSize,
          marginLeft: -1,
          background: "rgb(0, 0, 0)",
          boxShadow: "0 0 6px rgba(255,255,255,0.8)",
          borderRadius: 2,
          transition: "height 0.15s ease",
        }} />
      </motion.div>

    </div>
  );
}