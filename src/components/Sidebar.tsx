import React from "react";

type nodeTypes =
  | "circle"
  | "square"
  | "default"
  | "resizeReactangleNode"
  | "startNode"
  | "endNode"
  | "diamond";

const ShapeStyle = {
  cursor: "grab",
  width: "70px",
  height: "70px",
  border: "1px solid rgb(158 150 150)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
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
        gap: 20,
        flexWrap: "wrap",
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

      <div
        draggable
        onDragStart={(event) => onDragStart(event, "startNode")}
        style={{
          ...ShapeStyle,
          borderRadius: "100%",
        }}
      >
        Start
      </div>

      <div
        draggable
        onDragStart={(event) => onDragStart(event, "endNode")}
        style={{
          ...ShapeStyle,
          borderRadius: "100%",
        }}
      >
        End
      </div>
      <div
        draggable
        onDragStart={(event) => onDragStart(event, "diamond")}
        style={{
          ...ShapeStyle,
          width: "55px",
          height: "55px",
          marginRight: "10px",
          transform: "rotate(45deg)",
        }}
      >
        <span style={{ transform: "rotate(-45deg)", textAlign: "center" }}>
          Diamond
        </span>
      </div>
    </aside>
  );
}
