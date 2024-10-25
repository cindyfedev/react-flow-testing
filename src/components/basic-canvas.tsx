import React, { useState } from "react";
import { Stage, Layer, Rect, Circle, Text } from "react-konva";

// will draggin interfere with react flow node ?
// text is always in dragging ??
function BasicCanvas() {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  return (
    <Stage
      width={400}
      height={400}
      style={{ padding: "10px", border: "2px solid black" }}
    >
      <Layer>
        {/* Rectangle */}
        <Rect x={50} y={50} width={100} height={100} fill="red" />
        {/* Circle */}
        <Circle x={200} y={200} radius={50} fill="blue" />
        <Text
          text="Draggable Text"
          x={position.x}
          y={position.y}
          draggable
          fill={isDragging ? "green" : "black"}
          onDragStart={(e) => {
            setIsDragging(true);
          }}
          onDragEnd={(e) => {
            setIsDragging(false);
            setPosition({
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
        />
      </Layer>
    </Stage>
  );
}

export default BasicCanvas;
