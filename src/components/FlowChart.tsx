import React, { useCallback } from "react";
import ReactFlow, { addEdge, Connection, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { useFlowStore } from "../store";

const FlowChart: React.FC = () => {
  const { nodes, edges, addEdge } = useFlowStore();

  const onConnect = useCallback(
    (params: Connection) => addEdge(params.source!, params.target!, "Action"),
    [addEdge]
  );

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect} fitView />
    </div>
  );
};

export default FlowChart;
