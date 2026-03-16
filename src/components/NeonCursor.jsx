import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function NeonCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const onLeave = () => setPos({ x: -100, y: -100 });
  const onEnter = (e) => setPos({ x: e.clientX, y: e.clientY });

  document.addEventListener("mouseleave", onLeave);
  document.addEventListener("mouseenter", onEnter);

  document.removeEventListener("mouseleave", onLeave);
  document.removeEventListener("mouseenter", onEnter);

    const onOver = (e) => {
      const t = e.target;
      if (t?.matches?.('a, button, input, [data-hover="true"]')) setIsHovering(true);
    };
    const onOut = () => setIsHovering(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    return () => {
      document.body.style.cursor = prevCursor || "auto";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  const containerStyle = {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 2000, 
  };

  const mainBase = {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 9999,
    background: "rgb(255, 255, 255)",
    boxShadow: "0 0 12px rgba(7, 44, 92, 0.9)",
    top: 0,
    left: 0,
  };

 const trailBase = {
  position: "absolute",
  width: 40,
  height: 40,
  borderRadius: 9999,
  borderStyle: "solid",
  borderWidth: "2px",
  borderColor: "rgb(0, 0, 0)",
  boxShadow: "0 0 22px rgba(0, 0, 0, 0.6)", 
  background: "rgba(236,101,23,0.06)",   
  top: 0,
  left: 0,
};

  const glowBase = {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 9999,
    background: "radial-gradient(circle, rgba(255, 255, 255, 0.35), transparent 65%)",
    filter: "blur(6px)",
    top: 0,
    left: 0,
  };

  const mainXY = { x: pos.x - 6, y: pos.y - 6 };
  const trailXY = { x: pos.x - 20, y: pos.y - 20 };
  const glowXY = { x: pos.x - 35, y: pos.y - 35 };

  return (
    <div style={containerStyle} aria-hidden="true">
      <motion.div
        style={mainBase}
        animate={{
          ...mainXY,
          scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 400, mass: 0.5 }}
      />

      <motion.div
        style={trailBase}
        animate={{
          ...trailXY,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)",
          borderWidth: isHovering ? "3px" : "2px",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.8 }}
      />

      <motion.div
        style={glowBase}
        animate={{
          ...glowXY,
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 150, mass: 1 }}
      />
    </div>
  );
}