import { Edge, Node } from "reactflow";
import { nodeTypes } from "../App";
import { EdgeType } from "./types";

type DataObjectType = {
  ["set"]: {
    action_label?: string;
    status?: string;
    actionType?: string;
    communication_context?: string;
  };
  ["export"]?: { as: string };
};

type nodeType = {
  [stage: string]: DataObjectType & {
    switch?: Array<any>;
    then?: string;
  };
};

const generateFlowObject = (nodes: Node[], edges: EdgeType[]) => {
  const JSONArray: any[] = [];
  const edgeMapSwitch = new Map<string, any[]>();
  const edgeMapThen = new Map<string, string>();

  // Process edges and categorize them into `switch` and `then`
  edges.forEach((edge) => {
    if (edge.data.targetType !== "diamond") {
      const mainSource = edge.originalSource || edge.source;
      console.log({ mainSource });
      if (edge?.data?.condition) {
        let newArray = edgeMapSwitch.get(mainSource) || [];
        newArray.push({
          [edge.label as string]: {
            when: edge.data.condition,
            then: edge.data.transitStage,
          },
        });
        edgeMapSwitch.set(mainSource, newArray);
      } else {
        edgeMapThen.set(mainSource, edge.target);
      }
    }
  });

  // Process nodes to build the JSON structure
  nodes.forEach((node) => {
    if (node.type !== "diamond" && node.type !== "endNode") {
      let dataObject: DataObjectType | {} = {};

      if (node.type === "startNode") {
        dataObject = {
          set: {
            communication_context: "${ $workflow.workflowInputData  }",
          },
          export: { as: ".communication_context" },
        };
      } else {
        dataObject = {
          set: {
            action_label: node.data.label,
            status: node.data.status,
            actionType: node.data.actionType,
          },
        };
      }
      const nodeObject: nodeType = {
        [node.data.stage]: dataObject as DataObjectType,
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
    }
  });

  console.log({ JSONArray });
  return JSONArray;
};
const getNodeAction = (nodeType: keyof typeof nodeTypes) => {
  switch (nodeType) {
    case "startNode":
      return "start";
    case "endNode":
      return "end";
    case "diamond":
      return "decision";
    case "resizeReactangleNode":
      return "perform";
    default:
      return "";
  }
};
export { generateFlowObject, getNodeAction };

// o/p:[
//   {
//       "Start": {
//           "set": {
//               "communication_context": "${ $workflow.workflowInputData  }"
//           },
//           "export": {
//               "as": ".communication_context"
//           },
//           "then": "create_communication"
//       }
//   },
//   {
//       "create_communication": {
//           "set": {
//               "action_label": "Create",
//               "status": "Draft",
//               "actionType": "create_form"
//           },
//           "then": "evaluate_created_communication_Outcome"
//       }
//   },
//   {
//       "evaluate_created_communication_Outcome": {
//           "set": {
//               "action_label": "Communication outcome"
//           },
//           "switch": [
//               {
//                   "submit": {
//                       "when": "$context.communication_context.action == \"Awaiting Review\"",
//                       "then": "submit"
//                   }
//               }
//           ]
//       }
//   },
//   {
//       "submit": {
//           "set": {
//               "action_label": "Submit",
//               "status": "Awaiting Review",
//               "actionType": "update_form"
//           },
//           "then": "evaluate_submitted_communication_Outcome"
//       }
//   },
//   {
//       "evaluate_submitted_communication_Outcome": {
//           "set": {
//               "action_label": "submitted outcome"
//           },
//           "switch": [
//               {
//                   "auto-approve": {
//                       "when": "($context.communication_context.formPayload.data[\\\"Page1.Section1.Group1.To:\\\"].value? != null and $context.communication_context.formPayload.data[\\\"Page1.Section1.Group1.To:\\\"].value? != \\\"\\\") and ($context.communication_context.formPayload.data[\\\"Page1.Section3.Details\\\"].value? != null and $context.communication_context.formPayload.data[\\\"Page1.Section3.Details\\\"].value? != \\\"\\\" and ($context.communication_context.formPayload.data[\\\"Page1.Section3.Details\\\"].value | gsub(\\\"<[^>]+>\\\"; \\\"\\\") | ascii_downcase | test(\\\"other|progress report|meeting minutes\\\")))",
//                       "then": "Auto-approve"
//                   }
//               },
//               {
//                   "default": {
//                       "when": "Auto-Reject",
//                       "then": "Auto-Reject"
//                   }
//               }
//           ]
//       }
//   },
//   {
//       "Auto-approve": {
//           "set": {
//               "action_label": "auto approve",
//               "status": "Auto-Approved",
//               "actionType": "update_form"
//           },
//           "then": "End"
//       }
//   },
//   {
//       "Auto-Reject": {
//           "set": {
//               "action_label": "Auto-Reject",
//               "status": "Auto-Rejected",
//               "actionType": "update_form"
//           },
//           "then": "End"
//       }
//   }
// ]
