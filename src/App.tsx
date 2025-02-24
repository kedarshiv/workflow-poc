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
  EdgeTypes,
  MarkerType,
  Node,
  NodeChange,
  OnConnect,
  OnNodesChange,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  CircleNode,
  ResizableNodeSelected,
  SquareNode,
} from "./components/CustomNode/CustomeNodes";
import Sidebar from "./components/Sidebar";
import { Button } from "@mui/material";
import { WorkflowForm } from "./components/WorkflowForm";
import { generateFlowObject } from "./utils/utils";
import "./app.css";
import { Menu } from "@mui/icons-material";
import { EdgeForm } from "./components/EdgeForm";

export const nodeTypes = {
  circle: CircleNode,
  square: SquareNode,
  resizeReactangleNode: ResizableNodeSelected,
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

export default function App() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<null | Node>(null);
  const [selectedEdge, setSelectedEdge] = useState<null | Edge>(null);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(-1);
  const [currentEdgeIndex, setCurrentedgeIndex] = useState(-1);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds: any) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    console.log({ changes });
    setEdges((eds: any) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    const customConnect = {
      ...edgeConfig,
      ...connection,
      data: { label: "test" },
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
    generateFlowObject(nodes, edges);
  };

  const handleNodeClick = (e: any, node: Node) => {
    e.stopPropagation();
    setSelectedNode(node);
    setSelectedEdge(null);
    setCurrentNodeIndex(nodes.findIndex((n) => n.id === node.id));
  };

  const handleNodeValueChange = (value: string, field: string) => {
    if (selectedNode) {
      const currentNode = { ...selectedNode };
      currentNode.data[field] = value;
      setSelectedNode(currentNode);
      const currentNodes = [...nodes];
      currentNodes[currentNodeIndex] = currentNode;

      setNodes(currentNodes);
    }
  };

  const handleEdgeClick = useCallback(
    (event: any, edge: Edge<any>) => {
      event.stopPropagation(); // Prevent click from propagating to other elements
      setSelectedNode(null);
      setSelectedEdge(edge);
      console.log({ edge, edges });
      const edgeIndex = edges.findIndex((e) => e.id === edge.id);
      console.log({ edgeIndex });
      setCurrentedgeIndex(edgeIndex);
    },
    [edges]
  );

  console.log({ nodes, edges });
  const handleEdgeValueChange = useCallback(
    (value: string, field: string) => {
      if (selectedEdge) {
        const currentEdge = { ...selectedEdge };
        if (field === "label") {
          currentEdge["label"] = value;
        } else {
          currentEdge.data[field] = value;
        }
        setSelectedEdge(currentEdge);
        const currentEdges = [...edges];
        console.log({ currentEdgeIndex });
        currentEdges[currentEdgeIndex] = currentEdge;
        console.log({ currentEdges });
        setEdges(currentEdges);
      }
    },
    [currentEdgeIndex, selectedEdge]
  );

  const handleDeleteEdge = useCallback(
    (event: any, edge: Edge<any>) => {
      event.stopPropagation(); // Prevent click from propagating to other elements
      setEdges((eds: any) => eds.filter((e: any) => e.id !== edge.id));
    },
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <div className="sidebar-grid">
        <Sidebar />
      </div>

      <div className="react-diagram">
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgeDoubleClick={handleDeleteEdge}
          onEdgeClick={handleEdgeClick}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      <button
        className="hamburger"
        onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
      >
        <Menu />
      </button>
      <div className={`right-sidebar ${isRightSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <Button variant="contained" onClick={handleExportJson}>
            Export JSON
          </Button>

          <div className="form-container">
            {selectedNode ? (
              <WorkflowForm
                selectedNode={selectedNode}
                handleNodeValueChange={handleNodeValueChange}
              />
            ) : selectedEdge ? (
              <EdgeForm
                selectedEdge={selectedEdge}
                handleEdgeValueChange={handleEdgeValueChange}
              />
            ) : (
              "please select edge or node"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
