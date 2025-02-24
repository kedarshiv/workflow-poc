import React, { memo, useState } from "react";
import { Handle, Position, NodeResizer } from "reactflow";
import "./CustomeNodes.css";
// Circle Node
export const CircleNode = ({
  data,
  selected,
}: {
  data: any;
  selected: boolean;
}) => (
  <div
    style={{
      minWidth: "100px",
      minHeight: "100px",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      backgroundColor: "#00bcd4",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: "bold",
    }}
  >
    <NodeResizer
      color="#ff0071"
      isVisible={selected}
      minWidth={100}
      minHeight={30}
    />
    {data.label}
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

export const SquareNode = ({ data }: any) => {
  return (
    <div
      style={{
        padding: "15px",
        width: 150,
        height: 150,
        backgroundColor: "#00bcd4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: "bold",
      }}
    >
      <div className="custom-node">
        <h4>{data.label}</h4>
        <p>{data.stage || "Stage"}</p>
        <p>{`Template Version: ${
          data?.template?.templateVersion || 123444
        }`}</p>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={{ borderRadius: "50%" }}
      ></Handle>

      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        style={{ borderRadius: "50%" }}
      ></Handle>

      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        style={{ borderRadius: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        style={{ borderRadius: "50%" }}
      />

      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={{ borderRadius: "50%" }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={{ borderRadius: "50%" }}
      />

      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        style={{ borderRadius: "50%" }}
      />

      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        style={{ borderRadius: "50%" }}
      />
    </div>
  );
};

export const ResizableNodeSelected = ({
  data,
  selected,
}: {
  data: any;
  selected: boolean;
}) => {
  return (
    <div className="custom-node">
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />

      <div>
        <h4>{data.label}</h4>
        <p>{data?.stage}</p>
        <p>{data?.actionType}</p>
        <p>{`Template Version: ${
          data?.template?.templateVersion || 123444
        }`}</p>

        <Handle
          type="target"
          position={Position.Left}
          id="left-target"
          style={{ borderRadius: "50%" }}
          className="custom-handle"
        ></Handle>

        <Handle
          type="source"
          position={Position.Left}
          id="left-source"
          style={{ borderRadius: "50%" }}
          className="custom-handle"
        ></Handle>

        <Handle
          type="target"
          position={Position.Bottom}
          id="bottom-target"
          style={{ borderRadius: "50%" }}
          className="custom-handle"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom-source"
          style={{ borderRadius: "50%" }}
          className="custom-handle"
        />

        <Handle
          type="target"
          position={Position.Right}
          id="right-target"
          style={{ borderRadius: "50%" }}
          className="custom-handle"
        />

        <Handle
          type="source"
          position={Position.Right}
          id="right-source"
          style={{ borderRadius: "50%" }}
          className="custom-handle"
        />

        <Handle
          type="target"
          position={Position.Top}
          id="top-target"
          style={{ borderRadius: "50%" }}
          className="custom-handle"
        />

        <Handle
          type="source"
          position={Position.Top}
          id="top-source"
          style={{ borderRadius: "50%" }}
          className="custom-handle"
        />
      </div>
    </div>
  );
};
