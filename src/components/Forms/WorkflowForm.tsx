import { TextField } from "@mui/material";
import { useState } from "react";
import { Node } from "reactflow";
const textStyle = {
  padding: "10px",
};

type WorkflowFormTypes = {
  handleNodeValueChange: (value: any, field: any) => void;
  selectedNode: Node;
};
export const WorkflowForm = ({
  handleNodeValueChange,
  selectedNode,
}: WorkflowFormTypes) => {
  const { data } = selectedNode;
  console.log({ selectedNode });
  const [stage, setStage] = useState(data?.stage || "");
  const [status, setStatus] = useState(data?.status || "");
  const [actionType, setActionType] = useState(data?.actionType || "");
  const [label, setLabel] = useState(data?.label || "");

  return (
    <div>
      <h3 style={textStyle}>Update Stage</h3>

      <div style={textStyle}>
        <TextField
          required
          id="stage"
          label="Stage"
          value={stage}
          onChange={(e) => {
            setStage(e.target.value);
            handleNodeValueChange(e.target.value, "stage");
          }}
        />
      </div>
      <div style={textStyle}>
        <TextField
          required
          id="label"
          label="label"
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
            handleNodeValueChange(e.target.value, "label");
          }}
        />
      </div>
      <div style={textStyle}>
        <TextField
          required
          id="action-type"
          label="Action Type"
          value={actionType}
          onChange={(e) => {
            setActionType(e.target.value);
            handleNodeValueChange(e.target.value, "actionType");
          }}
        />
      </div>
      <div style={textStyle}>
        <TextField
          required
          id="status"
          label="Status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            handleNodeValueChange(e.target.value, "status");
          }}
        />
      </div>
    </div>
  );
};
