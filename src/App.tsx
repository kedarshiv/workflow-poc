import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MarkerType,
  NodeChange,
  OnConnect,
  OnNodesChange,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  CircleNode,
  DiamondNode,
  ResizableNodeSelected,
  SquareNode,
} from "./components/CustomeNodes";
import Sidebar from "./components/Sidebar";
import { Button } from "@mui/material";
import { WorkflowForm } from "./components/WorkflowForm";

export const nodeTypes = {
  circle: CircleNode,
  diamond: DiamondNode,
  square: SquareNode,
  resizeReactngleNode: ResizableNodeSelected,
};

const edgeConfig = {
  type: "smoothstep",
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
  style: {
    strokeWidth: 1.5,
  },
};
const initialNodes = [
  {
    id: "1",
    type: "circle",
    position: { x: 100, y: 100 },
    data: { label: "Circle" },
  },
  // {
  //   id: "2",
  //   type: "diamond",
  //   position: { x: 300, y: 100 },
  //   data: { label: "Diamond" },
  // },
  {
    id: "2",
    type: "square",
    position: { x: 500, y: 100 },
    data: {
      label: "Square",
      stage: "Defect",
      stageStatus: "Start",
      template: { templateVersion: 1233434 },
    },
  },
  {
    id: "3",
    type: "resizeReactngleNode",
    position: { x: 800, y: 100 },
    data: { label: "Resize Node" },
  },
];

let currentNodeIndex = -1;
export default function App() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any>([]);
  const [selectedNode, setSelectedNode] = useState<null | any>(null);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds: any) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    console.log({ changes });
    setEdges((eds: any) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    console.log({ connection });

    const customConnect = {
      ...edgeConfig,
      ...connection,
    };
    setEdges((eds: any) => addEdge(customConnect, eds));
  }, []);

  // Allow dropping elements
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handle dropping elements
  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData("application/reactflow");

      const position = { x: event.clientX - 250, y: event.clientY - 50 };
      const newNode = {
        id: `${nodes.length + 1}`,
        type: nodeType,
        position,
        data: { label: `Node ${nodes.length + 1}` },
      };

      setNodes((nds: any) => [...nds, newNode]);
    },
    [nodes]
  );

  const handleExportJson = () => {
    console.log({ nodes });
  };

  const handleNodeClick = (e: any, node: any) => {
    e.stopPropagation();
    setSelectedNode(node);
    currentNodeIndex = nodes.findIndex((n) => n.id === node.id);
    console.log({ currentNodeIndex, node, nodes });
  };
  console.log({ currentNodeIndex });
  const handleNodeValueChange = (value: string, field: string) => {
    if (selectedNode) {
      const currentNode = { ...selectedNode };
      currentNode.data[field] = value;
      setSelectedNode(currentNode);
      console.log({ currentNodeIndex });
      const currentNodes = [...nodes];
      currentNodes[currentNodeIndex] = currentNode;
      console.log({ currentNodes });
      setNodes(currentNodes);
    }
  };

  const handleDeleteEdge = useCallback(
    (event: any, edge: Edge<any>) => {
      event.stopPropagation(); // Prevent click from propagating to other elements
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <div style={{ position: "absolute", right: 15, top: 15, zIndex: 999 }}>
        <Button variant="contained" onClick={handleExportJson}>
          Export JSON
        </Button>
      </div>
      <div
        style={{
          position: "absolute",
          right: 15,
          top: 95,
          zIndex: 999,
          padding: "16px",
          border: "1px solid",
          background: "white",
        }}
      >
        <WorkflowForm
          selectedNode={selectedNode}
          handleNodeValueChange={handleNodeValueChange}
        />
      </div>

      <div
        className="sidebar-grid"
        style={{ width: "20vw", height: "100vh", background: "grey" }}
      >
        <Sidebar />
      </div>
      <div
        className="react-diagram"
        style={{ width: "100vw", height: "100vh" }}
      >
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgeClick={handleDeleteEdge}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
