import React, { useState, useEffect, useRef } from "react";

// Placeholder Totoro images from public CDN — swap with your own PNGs later
const STICKERS = [
  { id: 1, src: "/totoro-sticker1.png", alt: "Totoro", x: 0.05, y: 0.75, size: 250, floatDelay: 0   },
  { id: 2, src: "/calcifer.png", alt: "Calcifer", x: 0.70, y: 0.70, size: 250, floatDelay: 1.2 },
  { id: 3, src: "/ponyo.png", alt: "Ponyo", x: 0, y: 0, size: 250, floatDelay: 0.6 },
  { id: 4, src: "/haku.png", alt: "Haku", x: 0.75, y: 0.10, size: 250, floatDelay: 1.5 },
  { id: 5, src: "/soots.png", alt: "soots", x: 0.83, y: 0.40, size: 300, floatDelay: 1.8 },
];

function DraggableSticker({ sticker }) {
  const [pos, setPos] = useState({
    x: window.innerWidth  * sticker.x,
    y: window.innerHeight * sticker.y,
  });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
    const onUp   = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
    };
  }, [dragging]);

  return (
    <img
      src={sticker.src}
      alt="Totoro"
      onMouseDown={onMouseDown}
      draggable={false}
      style={{
        position:   "fixed",
        left:       pos.x,
        top:        pos.y,
        width:      sticker.size,
        height:     sticker.size,
        objectFit:  "contain",
        cursor:     dragging ? "grabbing" : "grab",
        zIndex:     dragging ? 1500 : 500,
        userSelect: "none",
        animation:  dragging ? "none" : `floatSticker 3s ease-in-out ${sticker.floatDelay}s infinite`,
        filter:     dragging
          ? "drop-shadow(0 12px 20px rgba(0,0,0,0.35))"
          : "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
        transform:  dragging ? "scale(1.12)" : "scale(1)",
        transition: dragging ? "none" : "filter 0.2s ease",
      }}
    />
  );
}

export default function TotoroStickers() {
  return (
    <>
      <style>{`
        @keyframes floatSticker {
          0%   { transform: translateY(0px)    rotate(-2deg); }
          50%  { transform: translateY(-14px)  rotate(2deg);  }
          100% { transform: translateY(0px)    rotate(-2deg); }
        }
      `}</style>
      {STICKERS.map((s) => (
        <DraggableSticker key={s.id} sticker={s} />
      ))}
    </>
  );
}