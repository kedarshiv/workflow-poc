import React from "react";

type nodeTypes = "circle" | "square" | "default" | "resizeReactangleNode";

const ShapeStyle = {
  cursor: "grab",
  width: "70px",
  height: "70px",
  border: "1px solid rgb(158 150 150)",
  marginBottom: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export default function Sidebar() {
  const onDragStart = (event: any, nodeType: nodeTypes) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside
      style={{
        display: "flex",
        justifyContent: "center",
        padding: 10,
        background: "#f0f0f0",
        height: "97.7%",
        gap: 10,
      }}
    >
      <div
        draggable
        onDragStart={(event) => onDragStart(event, "circle")}
        style={{
          ...ShapeStyle,
          borderRadius: "100%",
        }}
      >
        Circle
      </div>

      <div
        draggable
        onDragStart={(event) => onDragStart(event, "resizeReactangleNode")}
        style={{
          ...ShapeStyle,
        }}
      >
        Square
      </div>
    </aside>
  );
}
