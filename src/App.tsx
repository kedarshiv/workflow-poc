import { useCallback, useState } from "react";
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
  Node,
  NodeChange,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  ResizableNodeSelected,
  SquareNode,
} from "./components/CustomNode/CustomeNodes";
import Sidebar from "./components/Sidebar";
import { Button } from "@mui/material";
import { WorkflowForm } from "./components/Forms/WorkflowForm";
import { generateFlowObject, getNodeAction } from "./utils/utils";
import "./app.css";
import { Menu } from "@mui/icons-material";
import { EdgeForm } from "./components/Forms/EdgeForm";
import DiamondNode from "./components/CustomNode/DiamondNode/DiamondNode";
import {
  CircleNodeEnd,
  CircleNodeStart,
  CircleNode,
} from "./components/CustomNode/CircleNodes/CircleNodes";
import { StartNodeForm } from "./components/Forms/StartNodeForm";
import { EdgeType } from "./utils/types";

export const nodeTypes = {
  circle: CircleNode,
  square: SquareNode,
  resizeReactangleNode: ResizableNodeSelected,
  startNode: CircleNodeStart,
  endNode: CircleNodeEnd,
  diamond: DiamondNode,
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

// type EdgeType = Edge & {
//   orginalSource: string;
// };
export default function App() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);
  const [selectedNode, setSelectedNode] = useState<null | Node>(null);
  const [selectedEdge, setSelectedEdge] = useState<null | Edge>(null);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(-1);
  const [currentEdgeIndex, setCurrentedgeIndex] = useState(-1);
  const [diamondNodeStore, setDiamondNodeStore] = useState(new Map());
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds: any) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds: any) => applyEdgeChanges(changes, eds) as EdgeType[]);
  }, []);

  const onConnect = useCallback(
    (connection: Connection) => {
      const connectedNode = nodes.filter(
        (node) => node.id === connection.target
      )?.[0];

      console.log({ connectedNode });

      if (connectedNode.type === "diamond") {
        const tempDiamondNodeStore = new Map(diamondNodeStore);
        tempDiamondNodeStore.set(connection.target, connection.source);
        setDiamondNodeStore(tempDiamondNodeStore);
      }

      const originalSource = diamondNodeStore.get(connection.source);
      console.log({ originalSource, connection }, connection.source);
      const customConnect = {
        ...edgeConfig,
        ...connection,
        originalSource: originalSource ? originalSource : null,
        data: {
          transitStage:
            connectedNode.type !== "diamond" ? connectedNode?.data.stage : null,
          targetType: connectedNode.type,
        },
      };

      setEdges((eds: any) => addEdge(customConnect, eds) as EdgeType[]);
    },
    [nodes, diamondNodeStore]
  );

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

      const position = { x: event.clientX, y: event.clientY - 50 };
      const newNode = {
        id: `${nodes.length + 1}`,
        type: nodeType,
        position,
        data: {
          label:
            nodeType === "endNode"
              ? "End"
              : nodeType === "startNode"
              ? "Start"
              : `Node ${nodes.length + 1}`,
          action: getNodeAction(nodeType),
          stage:
            nodeType === "endNode"
              ? "End"
              : nodeType === "startNode"
              ? "Start"
              : `Stage ${nodes.length + 1}`,
        },
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
      // updqate the node value
      const currentNode = { ...selectedNode };
      currentNode.data[field] = value;
      setSelectedNode(currentNode);
      const currentNodes = [...nodes];
      currentNodes[currentNodeIndex] = currentNode;
      setNodes(currentNodes);

      // populdate the transit stage on the edge
      if (field === "stage") {
        const currentEdges = [...edges];
        const edgeIndex = edges.findIndex(
          (edge) => edge.target === currentNode.id
        );
        currentEdges[edgeIndex] = {
          ...currentEdges[edgeIndex],
          data: {
            ...currentEdges[edgeIndex].data,
            transitStage: value,
          },
        };

        setEdges(currentEdges);
      }
    }
  };

  const handleEdgeClick = useCallback(
    (event: any, edge: Edge<any>) => {
      event.stopPropagation(); // Prevent click from propagating to other elements
      setSelectedNode(null);
      if (edge.data.targetType === "diamond") {
        return;
      }
      setSelectedEdge(edge);
      const edgeIndex = edges.findIndex((e) => e.id === edge.id);
      setCurrentedgeIndex(edgeIndex);
    },
    [edges, selectedEdge]
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
        currentEdges[currentEdgeIndex] = currentEdge as EdgeType;
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
            {!selectedEdge && !selectedNode && "please select edge or node"}

            {/* {selectedNode &&
              (selectedNode?.data?.action as string) === "start" && (
                <StartNodeForm
                  handleNodeValueChange={handleNodeValueChange}
                  selectedNode={selectedNode}
                  key={currentNodeIndex}
                />
              )} */}

            {selectedNode &&
              (selectedNode?.data?.action as string) !== "start" && (
                <WorkflowForm
                  handleNodeValueChange={handleNodeValueChange}
                  selectedNode={selectedNode}
                  key={currentNodeIndex}
                />
              )}

            {selectedEdge && (
              <EdgeForm
                selectedEdge={selectedEdge}
                key={currentEdgeIndex}
                handleEdgeValueChange={handleEdgeValueChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
