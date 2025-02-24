import { TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

const textStyle = {
  padding: "10px",
};

type WorkflowFormTypes = {
  selectedNode: any;
  handleNodeValueChange: (value: any, field: any) => void;
  //   setNodeLabel: Dispatch<SetStateAction<string>>;
};
export const WorkflowForm = ({
  selectedNode,
  handleNodeValueChange,
}: //   setNodeLabel,
WorkflowFormTypes) => {
  const [stage, setStage] = useState("");
  const [status, setStatus] = useState("");
  const [actionType, setActionType] = useState("");
  const [label, setLabel] = useState("");

  useEffect(() => {
    const data = selectedNode?.data;

    setLabel(data?.label || "");
    setStage(data?.stage || "");
    setActionType(data?.actionType || "");
    setStatus(data?.status || "");
  }, [selectedNode]);
  return (
    <div>
      <h3 style={textStyle}>Update Stage</h3>

      <div style={textStyle}>
        <TextField
          required
          id="stage"
          label="Stage"
          value={stage}
          onChange={(e) => handleNodeValueChange(e.target.value, "stage")}
        />
      </div>
      <div style={textStyle}>
        <TextField
          required
          id="label"
          label="label"
          value={label}
          onChange={(e) => handleNodeValueChange(e.target.value, "label")}
        />
      </div>
      <div style={textStyle}>
        <TextField
          required
          id="action-type"
          label="Action Type"
          value={actionType}
          onChange={(e) => handleNodeValueChange(e.target.value, "actionType")}
        />
      </div>
      <div style={textStyle}>
        <TextField
          required
          id="status"
          label="Status"
          value={status}
          onChange={(e) => handleNodeValueChange(e.target.value, "status")}
        />
      </div>
    </div>
  );
};
