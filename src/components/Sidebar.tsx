import React from "react";

type nodeTypes = "circle" | "square" | "default" | "resizeReactngleNode";
export default function Sidebar() {
  const onDragStart = (event: any, nodeType: nodeTypes) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside
      style={{
        margin: "auto",
        width: 150,
        padding: 10,
        background: "#f0f0f0",
        height: "95%",
      }}
    >
      <div
        draggable
        onDragStart={(event) => onDragStart(event, "circle")}
        style={{
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "#ddd",
          cursor: "grab",
        }}
      >
        Circle
      </div>

      <div
        draggable
        onDragStart={(event) => onDragStart(event, "resizeReactngleNode")}
        style={{
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "#ddd",
          cursor: "grab",
        }}
      >
        Square
      </div>
    </aside>
  );
}
