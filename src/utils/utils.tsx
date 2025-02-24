import { Edge, Node } from "reactflow";

interface ThenNode {
  then: string;
}

interface SwitchNode {
  switch: ThenNode[];
}

// Union type for possible node structures
type NodeStructure = ThenNode | SwitchNode | object;

// Type for the overall flow configuration
type FlowConfig = {
  [nodeName: string]: NodeStructure;
};

type nodeType = {
  [stage: string]: {
    set: {
      action_label: string;
      status?: string;
      actionType?: string;
    };
    switch?: Array<any>;
    then?: string;
  };
};
const generateFlowObject = (nodes: Node[], edges: Edge[]) => {
  console.log({ nodes, edges });

  const JSONArray: any[] = [];
  const edgeMapSwitch = new Map<string, any[]>();
  const edgeMapThen = new Map<string, string>();

  // Process edges and categorize them into `switch` and `then`
  edges.forEach((edge) => {
    if (edge?.data?.transitStage) {
      let newArray = edgeMapSwitch.get(edge.source) || [];
      newArray.push({
        [edge.label as string]: {
          when: edge.data.condition,
          then: edge.data.transitStage,
        },
      });
      edgeMapSwitch.set(edge.source, newArray);
    } else {
      edgeMapThen.set(edge.source, edge.target);
    }
  });

  // Process nodes to build the JSON structure
  nodes.forEach((node) => {
    const nodeObject: nodeType = {
      [node.data.stage]: {
        set: {
          action_label: node.data.label,
          status: node.data.status,
          actionType: node.data.actionType,
        },
      },
    };

    // Add `switch` if it exists for the node
    if (edgeMapSwitch.has(node.id)) {
      nodeObject[node.data.stage]["switch"] = edgeMapSwitch.get(node.id);
    }

    // Add `then` if it exists for the node
    if (edgeMapThen.has(node.id)) {
      const targetNodeId = edgeMapThen.get(node.id);
      const targetNode = nodes.find((n) => n.id === targetNodeId);
      if (targetNode) {
        nodeObject[node.data.stage]["then"] = targetNode.data.stage;
      }
    }

    JSONArray.push(nodeObject);
  });

  console.log({ JSONArray });
  return JSONArray;
};

export { generateFlowObject };
